from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session
from uuid import UUID
from database import get_db


from controllers.employee_controller import (
    get_all_employees,
    get_employee_by_id,
    create_employee,
    set_admin_status,
    update_employee,
    delete_employee,
    get_difficulty_counts_by_employee,
    get_employees_by_team_id
)
from schemas.employee import AdminStatusUpdate, EmployeeCreate, EmployeeUpdate, EmployeeOut
from dependencies import get_current_employee
from models.employee import Employee
from pydantic import BaseModel

router = APIRouter(prefix="/employees", tags=["Employees"])

# --- CRUD Endpoints ---

@router.get("/", response_model=List[EmployeeOut])
def list_employees(db: Session = Depends(get_db)):
    return get_all_employees(db)

@router.get("/{employee_id}", response_model=EmployeeOut)
def retrieve_employee(employee_id: UUID, db: Session = Depends(get_db)):
    return get_employee_by_id(employee_id, db)

@router.post("/", response_model=EmployeeOut, status_code=201)
def create_new_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    return create_employee(employee, db)

@router.put("/{employee_id}", response_model=EmployeeOut)
def update_existing_employee(employee_id: UUID, employee: EmployeeUpdate, db: Session = Depends(get_db)):
    return update_employee(employee_id, employee, db)

@router.delete("/{employee_id}", status_code=204)
def delete_existing_employee(employee_id: UUID, db: Session = Depends(get_db)):
    delete_employee(employee_id, db)
    return {"detail": "Employee deleted successfully"}

# New PATCH route to update admin status
@router.patch("/{employee_id}/admin-status", response_model=EmployeeOut)
def update_admin_status(employee_id: UUID, status_update: AdminStatusUpdate, db: Session = Depends(get_db)):
    return set_admin_status(employee_id, status_update.is_admin, db)

# --- Jira Credentials Storage ---

class JiraCredentials(BaseModel):
    jira_email: str
    jira_api_token: str

@router.put("/jira-auth", summary="Store Jira API credentials")
def update_jira_credentials(
    creds: JiraCredentials,
    db: Session = Depends(get_db),
    current_user: Employee = Depends(get_current_employee),
):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")

    current_user.jira_email = creds.jira_email
    current_user.jira_api_token = creds.jira_api_token
    db.commit()
    db.refresh(current_user)
    return {"message": "Jira credentials saved"}

@router.get("/solved-difficulty/{employee_id}")
def get_solved_difficulty(employee_id: UUID, db: Session = Depends(get_db)):
    return get_difficulty_counts_by_employee(employee_id, db)

@router.get("/by-team/{team_id}", response_model=List[EmployeeOut])
def get_employees_by_team(team_id: int, db: Session = Depends(get_db)):
    employees = get_employees_by_team_id(team_id, db)
    if not employees:
        raise HTTPException(status_code=404, detail="No employees found for this team")
    return employees

