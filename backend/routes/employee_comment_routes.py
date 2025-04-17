from fastapi import APIRouter, Depends
from typing import List
from uuid import UUID
from sqlalchemy.orm import Session
from database import get_db

from controllers.employee_comment_controller import (
    get_all_employee_comments,
    get_employee_comment,
    create_employee_comment,
    delete_employee_comment
)

from schemas.employee_comment import EmployeeCommentCreate, EmployeeCommentOut

router = APIRouter(prefix="/employee-comments", tags=["Employee-Comments"])

@router.get("/", response_model=List[EmployeeCommentOut])
def list_employee_comments(db: Session = Depends(get_db)):
    return get_all_employee_comments(db)

@router.get("/{employee_id}/{comment_id}", response_model=EmployeeCommentOut)
def retrieve_employee_comment(employee_id: UUID, comment_id: int, db: Session = Depends(get_db)):
    return get_employee_comment(employee_id, comment_id, db)

@router.post("/", response_model=EmployeeCommentOut, status_code=201)
def create_employee_comment_link(data: EmployeeCommentCreate, db: Session = Depends(get_db)):
    return create_employee_comment(data, db)

@router.delete("/{employee_id}/{comment_id}", status_code=204)
def delete_employee_comment_link(employee_id: UUID, comment_id: int, db: Session = Depends(get_db)):
    delete_employee_comment(employee_id, comment_id, db)
