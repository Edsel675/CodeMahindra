from sqlalchemy.orm import Session
from passlib.context import CryptContext
from sqlalchemy.orm.exc import NoResultFound
from models.employee import Employee
from schemas.login import LoginRequest
from schemas.employee import EmployeeCreate, EmployeeOut
from fastapi import APIRouter, Depends, HTTPException
from database import get_db
from pydantic import BaseModel
from schemas.create_access_token import create_access_token 
import os
from fastapi.responses import JSONResponse
from google.oauth2 import id_token
from google.auth.transport import requests
import requests as external_requests
from fastapi.responses import RedirectResponse
import urllib.parse 


router = APIRouter()

class GoogleToken(BaseModel):
    credential: str

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_email(db: Session, email: str):
    try:
        return db.query(Employee).filter(Employee.email == email).one()
    except NoResultFound:
        return None

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_employee(db: Session, employee_create: EmployeeCreate):
    hashed_password = pwd_context.hash(employee_create.password)

    db_employee = Employee(
        email=employee_create.email,
        password=hashed_password,  # Aquí se guarda la contraseña hasheada
        firstName=employee_create.firstName,
        lastName=employee_create.lastName,
        nationality=employee_create.nationality,
        phoneNumber=employee_create.phoneNumber,
        profilePicture=employee_create.profilePicture,
        github_username=employee_create.github_username,
    )

    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)

    return EmployeeOut.model_validate(db_employee)



def verify_google_token(token: str):
    try:
        VITE_GOOGLE_CLIENT_ID = os.getenv('VITE_GOOGLE_CLIENT_ID')
        if not VITE_GOOGLE_CLIENT_ID:
            raise HTTPException(status_code=500, detail="Google Client ID not configured")

        idinfo = id_token.verify_oauth2_token(token, requests.Request(), VITE_GOOGLE_CLIENT_ID)

        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise HTTPException(status_code=400, detail="Token de Google inválido (issuer)")

        return {
            "email": idinfo["email"],
            "name": idinfo.get("name"),
            "picture": idinfo.get("picture"),
            "sub": idinfo["sub"],
            "profile_picture": idinfo.get("picture"),
        }
    
    except ValueError:
        raise HTTPException(status_code=400, detail="Token de Google inválido")
    
@router.post("/register", response_model=EmployeeOut)
async def register_employee(employee: EmployeeCreate):
    try:

        user = create_employee(get_db(), employee)
        return user
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login")
async def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    email = login_data.email
    password = login_data.password

    print(f"[DEBUG] Intentando iniciar sesión con email: {email}")
    user = get_user_by_email(db, email)
    if user is None or not verify_password(password, user.password):
        raise HTTPException(status_code=400, detail="Credenciales incorrectas")

    # Aquí generamos el token
    print(user.email)
    access_token = create_access_token(data={
        "sub": str(user.id),
        "firstName": user.firstName,
        "lastName": user.lastName,
        "email": user.email,
        "isAdmin": user.isAdmin,
        "coins": user.coins,
        "profilePicture": user.profilePicture,  # Si tienes una imagen de perfil
        "position_id": user.position_id,
        "nationality": user.nationality,
        "phoneNumber": user.phoneNumber,
        "team_id": user.team_id
    })
    print(f"[DEBUG] Token generado: {access_token}")
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.get("/test-token")
def test_token():
    token = create_access_token(data={"sub": "test@example.com"})
    return {"token": token}
   
@router.post("/google")
def google_auth(data: GoogleToken, db: Session = Depends(get_db)):
    google_data = verify_google_token(data.credential)

    user = get_user_by_email(db, google_data["email"])
    if not user:
        
        full_name = google_data.get("name", "Google User")
        parts = full_name.strip().split()
        if len(parts) >= 3:
            first_name = " ".join(parts[:-2])  
            last_name = " ".join(parts[-2:])   
        elif len(parts) == 2:
            first_name = parts[0]
            last_name = parts[1]
        else:
            first_name = full_name
            last_name = "No especificado"
        
        new_user = EmployeeCreate(
            email=google_data["email"],
            password="google",
            firstName=first_name,
            lastName=last_name,
            nationality="No especificado",
            phoneNumber="0000000000",
            profilePicture=google_data.get("profile_picture"),
        )
        user = create_employee(db, new_user)


    token = create_access_token(data={
        "sub": str(user.id),
        "email": user.email,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "phoneNumber": user.phoneNumber,
        "isAdmin": user.isAdmin,
        "coins": user.coins,
        "profilePicture": google_data.get("picture") or user.profilePicture,
        "position_id": user.position_id,
        "team_id": user.team_id
})
    return JSONResponse(
        content={
            "access_token": token,
            "user": {
                "sub": str(user.id),
                "email": user.email,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "phoneNumber": user.phoneNumber,
                "isAdmin": user.isAdmin,
                "coins": user.coins,
                "profilePicture": google_data.get("picture") or user.profilePicture,
                "position_id": user.position_id,
                "team_id": user.team_id
            }
        }
    )

@router.get("/github")
def login_with_github():
    github_client_id = os.getenv("GITHUB_CLIENT_ID")
    redirect_uri = "https://code-mahindra-backend.vercel.app/auth/github/callback"
    github_auth_url = (
        f"https://github.com/login/oauth/authorize"
        f"?client_id={github_client_id}&redirect_uri={redirect_uri}&scope=user:email"
    )
    return RedirectResponse(url=github_auth_url)

@router.get("/github/callback")
def github_callback(code: str, db: Session = Depends(get_db)):
    client_id = os.getenv("GITHUB_CLIENT_ID")
    client_secret = os.getenv("GITHUB_CLIENT_SECRET")

    # Obtener el token de acceso
    token_response = external_requests.post(
        "https://github.com/login/oauth/access_token",
        headers={"Accept": "application/json"},
        data={
            "client_id": client_id,
            "client_secret": client_secret,
            "code": code,
        },
    )
    token_json = token_response.json()
    access_token = token_json.get("access_token")

    if not access_token:
        raise HTTPException(status_code=400, detail="No se pudo obtener el access_token")

    # Obtener información básica del usuario
    user_response = external_requests.get(
        "https://api.github.com/user",
        headers={"Authorization": f"token {access_token}"}
    )
    user_data = user_response.json()
    github_username = user_data.get("login")

    # Obtener correos del usuario
    emails_response = external_requests.get(
        "https://api.github.com/user/emails",
        headers={"Authorization": f"token {access_token}"}
    )
    emails_data = emails_response.json()

    # Buscar el email primario y verificado
    primary_email = next(
        (email["email"] for email in emails_data if email["primary"] and email["verified"]),
        None
    )
    
    # Si no hay email primario, utilizamos un email falso
    email = primary_email or f"{user_data['id']}@github.fake"

    # Nombre completo
    full_name = user_data.get("name") or user_data.get("login")
    parts = full_name.strip().split()
    if len(parts) >= 2:
        first_name = " ".join(parts[:-1])
        last_name = parts[-1]
    else:
        first_name = full_name
        last_name = "GitHub"

    # Verifica que github_username no sea None o vacío
    print("[DEBUG] github_username obtenido de GitHub:", github_username)

    # Buscar o crear usuario en la base de datos
    user = get_user_by_email(db, email)
    if not user:
        new_user = EmployeeCreate(
            email=email,
            password="github",  # Aquí se puede usar una contraseña temporal o en blanco
            firstName=first_name,
            lastName=last_name,
            nationality="No especificado",
            phoneNumber="0000000000",
            profilePicture=user_data.get("avatar_url"),
            github_username=github_username,
        )
        user = create_employee(db, new_user)

    # Generar JWT con los datos del usuario
    token = create_access_token(data={
        "sub": str(user.id), 
        "email": user.email,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "phoneNumber": user.phoneNumber,
        "isAdmin": user.isAdmin,
        "coins": user.coins,
        "profilePicture": user.profilePicture,
        "position_id": user.position_id,
        "team_id": user.team_id,
        "github_username": github_username
    })
    
    # Redirigir al frontend con el token
    return RedirectResponse(
        url="http://code-mahindra-w4lk.vercel.app/login?" + urllib.parse.urlencode({
            "token": token
        })
    )



