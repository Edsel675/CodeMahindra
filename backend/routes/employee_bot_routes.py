from fastapi import APIRouter, Depends
from typing import List
from uuid import UUID
from sqlalchemy.orm import Session
from database import get_db
from controllers.employee_bot_controller import (
    get_all_employee_bots,
    get_employee_bot,
    create_employee_bot,
    update_employee_bot,
    delete_employee_bot
)
from schemas.employee_bot import EmployeeBotCreate, EmployeeBotUpdate, EmployeeBotOut

router = APIRouter(prefix="/employee-bots", tags=["Employee-Bots"])

@router.get("/", response_model=List[EmployeeBotOut])
def list_all_employee_bots(db: Session = Depends(get_db)):
    return get_all_employee_bots(db)

@router.get("/{employee_id}/{bot_id}", response_model=EmployeeBotOut)
def retrieve_employee_bot(employee_id: UUID, bot_id: int, db: Session = Depends(get_db)):
    return get_employee_bot(employee_id, bot_id, db)

@router.post("/", response_model=EmployeeBotOut, status_code=201)
def create_employee_bot_link(data: EmployeeBotCreate, db: Session = Depends(get_db)):
    return create_employee_bot(data, db)

@router.put("/{employee_id}/{bot_id}", response_model=EmployeeBotOut)
def update_employee_bot_link(employee_id: UUID, bot_id: int, data: EmployeeBotUpdate, db: Session = Depends(get_db)):
    return update_employee_bot(employee_id, bot_id, data, db)

@router.delete("/{employee_id}/{bot_id}", status_code=204)
def delete_employee_bot_link(employee_id: UUID, bot_id: int, db: Session = Depends(get_db)):
    delete_employee_bot(employee_id, bot_id, db)
