from fastapi import HTTPException
from sqlalchemy.orm import Session
from models.employee_xp_history import EmployeeXPHistory
from schemas.employee_xp_history import EmployeeXPHistoryCreate, EmployeeXPHistoryUpdate
from uuid import UUID

def create_xp_record(db: Session, record: EmployeeXPHistoryCreate):
    db_record = EmployeeXPHistory(**record.dict())
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record

def get_xp_record(db: Session, record_id: int):
    return db.query(EmployeeXPHistory).filter(EmployeeXPHistory.id == record_id).first()

def get_all_xp_records(db: Session):
    return db.query(EmployeeXPHistory).all()

def get_xp_records_by_employee(db: Session, employee_id: UUID):
    return (
        db.query(EmployeeXPHistory)
        .filter(EmployeeXPHistory.employee_id == employee_id)
        .order_by(EmployeeXPHistory.date.asc())
        .all()
    )

def update_xp_record(db: Session, record_id: int, updated: EmployeeXPHistoryUpdate):
    record = db.query(EmployeeXPHistory).filter(EmployeeXPHistory.id == record_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    record.experience = updated.experience
    db.commit()
    db.refresh(record)
    return record

def delete_xp_record(db: Session, record_id: int):
    record = db.query(EmployeeXPHistory).filter(EmployeeXPHistory.id == record_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    db.delete(record)
    db.commit()
    return {"message": "Record deleted"}
