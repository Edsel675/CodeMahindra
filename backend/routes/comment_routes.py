from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from database import get_db
from controllers.comment_controller import (
    get_all_comments,
    get_comment_by_id,
    create_comment,
    update_comment,
    delete_comment
)
from schemas.comment import CommentCreate, CommentUpdate, CommentOut

router = APIRouter(prefix="/comments", tags=["Comments"])

@router.get("/", response_model=List[CommentOut])
def list_comments(db: Session = Depends(get_db)):
    return get_all_comments(db)

@router.get("/{comment_id}", response_model=CommentOut)
def retrieve_comment(comment_id: int, db: Session = Depends(get_db)):
    return get_comment_by_id(comment_id, db)

@router.post("/", response_model=CommentOut, status_code=201)
def create_new_comment(data: CommentCreate, db: Session = Depends(get_db)):
    return create_comment(data, db)

@router.put("/{comment_id}", response_model=CommentOut)
def update_existing_comment(comment_id: int, data: CommentUpdate, db: Session = Depends(get_db)):
    return update_comment(comment_id, data, db)

@router.delete("/{comment_id}", status_code=204)
def delete_existing_comment(comment_id: int, db: Session = Depends(get_db)):
    delete_comment(comment_id, db)
