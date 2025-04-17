from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.employee_comment import EmployeeComment
from schemas.employee_comment import EmployeeCommentCreate
from typing import List
from uuid import UUID

def get_all_employee_comments(db: Session) -> List[EmployeeComment]:
    return db.query(EmployeeComment).all()

def get_employee_comment(employee_id: UUID, comment_id: int, db: Session) -> EmployeeComment:
    relation = db.query(EmployeeComment).filter(
        EmployeeComment.employee_id == employee_id,
        EmployeeComment.comment_id == comment_id
    ).first()
    if not relation:
        raise HTTPException(status_code=404, detail="Employee-Comment relation not found")
    return relation

def create_employee_comment(data: EmployeeCommentCreate, db: Session) -> EmployeeComment:
    existing = db.query(EmployeeComment).filter(
        EmployeeComment.employee_id == data.employee_id,
        EmployeeComment.comment_id == data.comment_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Relation already exists")
    relation = EmployeeComment(**data.dict())
    db.add(relation)
    db.commit()
    db.refresh(relation)
    return relation

def delete_employee_comment(employee_id: UUID, comment_id: int, db: Session):
    relation = db.query(EmployeeComment).filter(
        EmployeeComment.employee_id == employee_id,
        EmployeeComment.comment_id == comment_id
    ).first()
    if not relation:
        raise HTTPException(status_code=404, detail="Employee-Comment relation not found")
    db.delete(relation)
    db.commit()
