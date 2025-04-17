from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.employee_badge import EmployeeBadge
from schemas.employee_badge import EmployeeBadgeCreate
from typing import List
from uuid import UUID

def get_all_employee_badges(db: Session) -> List[EmployeeBadge]:
    return db.query(EmployeeBadge).all()

def get_employee_badge(employee_id: UUID, badge_id: int, db: Session) -> EmployeeBadge:
    link = db.query(EmployeeBadge).filter(
        EmployeeBadge.employee_id == employee_id,
        EmployeeBadge.badge_id == badge_id
    ).first()
    if not link:
        raise HTTPException(status_code=404, detail="Employee-Badge not found")
    return link

def create_employee_badge(data: EmployeeBadgeCreate, db: Session) -> EmployeeBadge:
    existing = db.query(EmployeeBadge).filter(
        EmployeeBadge.employee_id == data.employee_id,
        EmployeeBadge.badge_id == data.badge_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Already assigned")
    link = EmployeeBadge(**data.dict())
    db.add(link)
    db.commit()
    db.refresh(link)
    return link

def delete_employee_badge(employee_id: UUID, badge_id: int, db: Session):
    link = db.query(EmployeeBadge).filter(
        EmployeeBadge.employee_id == employee_id,
        EmployeeBadge.badge_id == badge_id
    ).first()
    if not link:
        raise HTTPException(status_code=404, detail="Employee-Badge not found")
    db.delete(link)
    db.commit()
