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
from fastapi import HTTPException


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
        profilePicture=employee_create.profilePicture 
    )

    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)

    return EmployeeOut.model_validate(db_employee)



def verify_google_token(token: str):
    try:
        VITE_GOOGLE_CLIENT_ID = os.getenv("VITE_GOOGLE_CLIENT_ID")
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
        "sub": user.email,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "email": user.email,
        "isAdmin": user.isAdmin,
        "coins": user.coins,
        "profilePicture": user.profilePicture,  # Si tienes una imagen de perfil
        "position_id": user.position_id,
        "team_id": user.team_id
    })

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

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
        "sub": user.email,
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
                "sub": user.email,
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