from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.employee import Employee
from schemas.employee import EmployeeCreate, EmployeeUpdate
from typing import List
from uuid import UUID
from passlib.context import CryptContext

# Contexto para hashear contraseñas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_all_employees(db: Session) -> List[Employee]:
    return db.query(Employee).all()

def get_employee_by_id(employee_id: UUID, db: Session) -> Employee:
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee

def create_employee(employee_data: EmployeeCreate, db: Session) -> Employee:
    # Hashear la contraseña antes de guardar
    hashed_password = pwd_context.hash(employee_data.password)
    
    # Crear el objeto de Employee manualmente
    new_employee = Employee(
        email=employee_data.email,
        password=hashed_password,
        firstName=employee_data.firstName,
        nationality=employee_data.nationality,
        phoneNumber=employee_data.phoneNumber,
        profileEpic=employee_data.profileEpic,
        experience=employee_data.experience,
        level=employee_data.level,
        lastName=employee_data.lastName,
        birthDate=employee_data.birthDate,
        profilePicture=employee_data.profilePicture,
        isAdmin=employee_data.isAdmin,
        coins=employee_data.coins,
        position_id=employee_data.position_id,
        team_id=employee_data.team_id,
    )

    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)
    return new_employee

def update_employee(employee_id: UUID, employee_data: EmployeeUpdate, db: Session) -> Employee:
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    for key, value in employee_data.dict(exclude_unset=True).items():
        setattr(employee, key, value)
    db.commit()
    db.refresh(employee)
    return employee

def delete_employee(employee_id: UUID, db: Session):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    db.delete(employee)
    db.commit()
