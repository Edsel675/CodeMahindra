from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.employee_bot import EmployeeBot
from schemas.employee_bot import EmployeeBotCreate, EmployeeBotUpdate
from typing import List
from uuid import UUID

def get_all_employee_bots(db: Session) -> List[EmployeeBot]:
    return db.query(EmployeeBot).all()

def get_employee_bot(employee_id: UUID, bot_id: int, db: Session) -> EmployeeBot:
    eb = db.query(EmployeeBot).filter(
        EmployeeBot.employee_id == employee_id,
        EmployeeBot.bot_id == bot_id
    ).first()
    if not eb:
        raise HTTPException(status_code=404, detail="Employee-Bot not found")
    return eb

def create_employee_bot(data: EmployeeBotCreate, db: Session) -> EmployeeBot:
    existing = db.query(EmployeeBot).filter(
        EmployeeBot.employee_id == data.employee_id,
        EmployeeBot.bot_id == data.bot_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Already purchased")
    eb = EmployeeBot(**data.dict())
    db.add(eb)
    db.commit()
    db.refresh(eb)
    return eb

def update_employee_bot(employee_id: UUID, bot_id: int, data: EmployeeBotUpdate, db: Session) -> EmployeeBot:
    eb = db.query(EmployeeBot).filter(
        EmployeeBot.employee_id == employee_id,
        EmployeeBot.bot_id == bot_id
    ).first()
    if not eb:
        raise HTTPException(status_code=404, detail="Employee-Bot not found")
    for key, value in data.dict(exclude_unset=True).items():
        setattr(eb, key, value)
    db.commit()
    db.refresh(eb)
    return eb

def delete_employee_bot(employee_id: UUID, bot_id: int, db: Session):
    eb = db.query(EmployeeBot).filter(
        EmployeeBot.employee_id == employee_id,
        EmployeeBot.bot_id == bot_id
    ).first()
    if not eb:
        raise HTTPException(status_code=404, detail="Employee-Bot not found")
    db.delete(eb)
    db.commit()
