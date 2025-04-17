from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.comment import Comment
from schemas.comment import CommentCreate, CommentUpdate
from typing import List

def get_all_comments(db: Session) -> List[Comment]:
    return db.query(Comment).all()

def get_comment_by_id(comment_id: int, db: Session) -> Comment:
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    return comment

def create_comment(data: CommentCreate, db: Session) -> Comment:
    new_comment = Comment(**data.dict())
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    print("this was the comment", new_comment)
    return new_comment

def update_comment(comment_id: int, data: CommentUpdate, db: Session) -> Comment:
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    for key, value in data.dict(exclude_unset=True).items():
        setattr(comment, key, value)
    db.commit()
    db.refresh(comment)
    return comment

def delete_comment(comment_id: int, db: Session):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    db.delete(comment)
    db.commit()
