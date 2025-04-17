from fastapi import APIRouter, Depends
from typing import List
from uuid import UUID
from sqlalchemy.orm import Session
from database import get_db
from controllers.employee_badge_controller import (
    get_all_employee_badges,
    get_employee_badge,
    create_employee_badge,
    delete_employee_badge
)
from schemas.employee_badge import EmployeeBadgeCreate, EmployeeBadgeOut

router = APIRouter(prefix="/employee-badges", tags=["Employee-Badges"])

@router.get("/", response_model=List[EmployeeBadgeOut])
def list_employee_badges(db: Session = Depends(get_db)):
    return get_all_employee_badges(db)

@router.get("/{employee_id}/{badge_id}", response_model=EmployeeBadgeOut)
def retrieve_employee_badge(employee_id: UUID, badge_id: int, db: Session = Depends(get_db)):
    return get_employee_badge(employee_id, badge_id, db)

@router.post("/", response_model=EmployeeBadgeOut, status_code=201)
def create_employee_badge_link(data: EmployeeBadgeCreate, db: Session = Depends(get_db)):
    return create_employee_badge(data, db)

@router.delete("/{employee_id}/{badge_id}", status_code=204)
def delete_employee_badge_link(employee_id: UUID, badge_id: int, db: Session = Depends(get_db)):
    delete_employee_badge(employee_id, badge_id, db)
