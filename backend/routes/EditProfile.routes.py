from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from models import User  # Suponiendo que tienes un modelo User
from schemas import UserUpdate  # Suponiendo que tienes un esquema UserUpdate
from database import get_db  # Tu función para obtener la sesión de la base de datos
import jwt  # Import the jwt module
import os

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter()
SECRET_KEY = os.getenv("SECRET_KEY", "secret")

@router.put("/update-profile")
async def update_user_profile(user_update: UserUpdate, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    # Decodificar el token y obtener el usuario
    decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    user_id = decoded_token.get("sub")  # Aquí usas el "sub" del token

    # Obtener el usuario de la base de datos
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # Actualizar los datos
    user.first_name = user_update.first_name
    user.last_name = user_update.last_name
    user.phone_number = user_update.phone_number
    user.nationality = user_update.nationality
    user.profile_picture = user_update.profile_picture
    # Actualiza los demás campos necesarios...

    db.commit()
    return {"msg": "Perfil actualizado con éxito"}
