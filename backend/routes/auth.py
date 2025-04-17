from sqlalchemy.orm import Session
from passlib.context import CryptContext
from sqlalchemy.orm.exc import NoResultFound
from models.employee import Employee
from schemas.login import LoginRequest
from schemas.employee import EmployeeCreate, EmployeeOut
from fastapi import APIRouter, Depends, HTTPException
from database import get_db  # Asegúrate de importar get_db correctamente

router = APIRouter()

# Contexto de cifrado
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
        password=hashed_password,  # ✅ Aquí se guarda la contraseña hasheada
        firstName=employee_create.firstName,
        nationality=employee_create.nationality,
        phoneNumber=employee_create.phoneNumber,
        # Agrega otros campos si es necesario
    )

    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)

    return EmployeeOut.model_validate(db_employee)

@router.post("/login")
async def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    email = login_data.email
    password = login_data.password

    print(f"[DEBUG] Intentando iniciar sesión con email: {email}")
    user = get_user_by_email(db, email)
    if user is None:
        raise HTTPException(status_code=400, detail="Credenciales incorrectas")

    if not verify_password(password, user.password):
        raise HTTPException(status_code=400, detail="Credenciales incorrectas")
    
    return {"message": "Inicio de sesión exitoso"}
