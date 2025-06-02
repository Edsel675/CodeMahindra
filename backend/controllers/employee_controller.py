from sqlalchemy import func
from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.employee import Employee
from schemas.employee import EmployeeCreate, EmployeeUpdate
from typing import List
from uuid import UUID
from passlib.context import CryptContext
from models.problem import Problem
from models.employee_problem import EmployeeProblem

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
        github_username=employee_data.github_username
        
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

def set_admin_status(employee_id: UUID, is_admin: bool, db: Session) -> Employee:
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    employee.isAdmin = is_admin
    db.commit()
    db.refresh(employee)
    return employee


def get_difficulty_counts_by_employee(employee_id: UUID, db: Session):
    results = (
        db.query(Problem.difficulty, func.count().label("count"))
        .join(EmployeeProblem, EmployeeProblem.problem_id == Problem.id)
        .filter(EmployeeProblem.employee_id == employee_id)
        .group_by(Problem.difficulty)
        .all()
    )

    # Convert to a dict with default values
    difficulty_counts = {"Easy": 0, "Medium": 0, "Hard": 0}
    for difficulty, count in results:
        if difficulty in difficulty_counts:
            difficulty_counts[difficulty] = count
    return difficulty_counts

def get_employees_by_team_id(team_id: int, db: Session) -> List[Employee]:
    return db.query(Employee).filter(Employee.team_id == team_id).all()
