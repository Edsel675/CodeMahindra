# backend/crud.py
from sqlalchemy.orm import Session
from models import User  # Asegúrate de tener este modelo
from sqlalchemy.exc import NoResultFound
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_user_by_email(db: Session, email: str):
    try:
        return db.query(User).filter(User.email == email).one()
    except NoResultFound:
        return None
