from fastapi import APIRouter, HTTPException 
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from routes.auth import get_user_by_email
import os
from sqlalchemy.orm import Session
from database import get_db 
from models.employee import Employee
from schemas.employee import EmployeeUpdate
from fastapi import Body

router = APIRouter()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")  # puede que tengas que ajustar la ruta
SECRET_KEY = os.getenv("SECRET_KEY", "secret")  # asegúrate de tener esto configurado
ALGORITHM = "HS256"

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    print(f"🔐 Token recibido: {token}")
    credentials_exception = HTTPException(status_code=401, detail="Token inválido o expirado")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print(jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM]))
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError as e:
        print(f"❌ Error al decodificar el token: {e}")
        raise credentials_exception
        
    user = db.query(Employee).filter(Employee.id == user_id).first()
    if user is None:
        raise credentials_exception
    return user


@router.get("/user/me")
def read_current_user(current_user: Employee = Depends(get_current_user)):
    print(current_user.__dict__) 
    return {
        "email": current_user.email,
        "firstName": current_user.firstName,
        "lastName": current_user.lastName,
        "phoneNumber": current_user.phoneNumber,
        "isAdmin": current_user.isAdmin,
        "coins": current_user.coins,
        "profilePicture": current_user.profilePicture,
        "nationality":current_user.nationality,
        "experience":current_user.experience, 
        "id": current_user.id,
        "team_id": current_user.team_id
        
    }
@router.put("/user/me")
def update_current_user(
    update_data: EmployeeUpdate = Body(...),
    db: Session = Depends(get_db),
    current_user: Employee = Depends(get_current_user)
):
    if update_data.firstName is not None:
        current_user.firstName = update_data.firstName
    if update_data.lastName is not None:
        current_user.lastName = update_data.lastName
    if update_data.phoneNumber is not None:
        current_user.phoneNumber = update_data.phoneNumber
    if update_data.nationality is not None:
        current_user.nationality = update_data.nationality
    if update_data.profilePicture is not None:
        current_user.profilePicture = update_data.profilePicture
    if update_data.experience is not None:
        current_user.experience = update_data.experience
    db.commit()
    db.refresh(current_user)

    return {
        "message": "Usuario actualizado correctamente",
        "user": {
            "email": current_user.email,
            "firstName": current_user.firstName,
            "lastName": current_user.lastName,
            "phoneNumber": current_user.phoneNumber,
            "nationality": current_user.nationality,
            "profilePicture": current_user.profilePicture,
            "nationality":current_user.nationality,
            "experience":current_user.experience
        }
    }

