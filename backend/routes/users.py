from fastapi import APIRouter, HTTPException
from models import UserCreate
from database import create_user  # función que guarda en la base de datos

router = APIRouter()

@router.post("/register")
async def register_user(user: UserCreate):
    try:
        user_id = create_user(user)
        return {"message": "Usuario registrado", "id": user_id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
