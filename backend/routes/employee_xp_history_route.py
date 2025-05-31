from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from schemas.employee_xp_history import *
from controllers import employee_xp_history_controller as controller
from uuid import UUID

router = APIRouter(prefix="/xp-history", tags=["Employee XP History"])

@router.post("/", response_model=EmployeeXPHistoryOut)
def create_record(record: EmployeeXPHistoryCreate, db: Session = Depends(get_db)):
    return controller.create_xp_record(db, record)

@router.get("/{record_id}", response_model=EmployeeXPHistoryOut)
def read_record(record_id: int, db: Session = Depends(get_db)):
    return controller.get_xp_record(db, record_id)

@router.get("/", response_model=list[EmployeeXPHistoryOut])
def read_all_records(db: Session = Depends(get_db)):
    return controller.get_all_xp_records(db)

@router.get("/employee/{employee_id}", response_model=list[EmployeeXPHistoryOut])
def read_records_by_employee(employee_id: UUID, db: Session = Depends(get_db)):
    return controller.get_xp_records_by_employee(db, employee_id)

@router.put("/{record_id}", response_model=EmployeeXPHistoryOut)
def update_record(record_id: int, updated: EmployeeXPHistoryUpdate, db: Session = Depends(get_db)):
    return controller.update_xp_record(db, record_id, updated)

@router.delete("/{record_id}")
def delete_record(record_id: int, db: Session = Depends(get_db)):
    return controller.delete_xp_record(db, record_id)
