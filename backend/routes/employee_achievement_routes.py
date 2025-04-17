from fastapi import APIRouter, Depends
from typing import List
from uuid import UUID
from sqlalchemy.orm import Session
from database import get_db
from controllers.employee_achievement_controller import (
    get_all_employee_achievements,
    get_employee_achievement,
    create_employee_achievement,
    delete_employee_achievement
)
from schemas.employee_achievement import EmployeeAchievementCreate, EmployeeAchievementOut

router = APIRouter(prefix="/employee-achievements", tags=["Employee-Achievements"])

@router.get("/", response_model=List[EmployeeAchievementOut])
def list_employee_achievements(db: Session = Depends(get_db)):
    return get_all_employee_achievements(db)

@router.get("/{employee_id}/{achievement_id}", response_model=EmployeeAchievementOut)
def retrieve_employee_achievement(employee_id: UUID, achievement_id: int, db: Session = Depends(get_db)):
    return get_employee_achievement(employee_id, achievement_id, db)

@router.post("/", response_model=EmployeeAchievementOut, status_code=201)
def create_employee_achievement_link(data: EmployeeAchievementCreate, db: Session = Depends(get_db)):
    return create_employee_achievement(data, db)

@router.delete("/{employee_id}/{achievement_id}", status_code=204)
def delete_employee_achievement_link(employee_id: UUID, achievement_id: int, db: Session = Depends(get_db)):
    delete_employee_achievement(employee_id, achievement_id, db)
