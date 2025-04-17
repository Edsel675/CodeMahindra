from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.suggestion import Suggestion
from schemas.suggestion import SuggestionCreate, SuggestionUpdate
from typing import List

def get_all_suggestions(db: Session) -> List[Suggestion]:
    return db.query(Suggestion).all()

def get_suggestion_by_id(suggestion_id: int, db: Session) -> Suggestion:
    suggestion = db.query(Suggestion).filter(Suggestion.id == suggestion_id).first()
    if not suggestion:
        raise HTTPException(status_code=404, detail="Suggestion not found")
    return suggestion

def create_suggestion(data: SuggestionCreate, db: Session) -> Suggestion:
    new_suggestion = Suggestion(**data.dict())
    db.add(new_suggestion)
    db.commit()
    db.refresh(new_suggestion)
    return new_suggestion

def update_suggestion(suggestion_id: int, data: SuggestionUpdate, db: Session) -> Suggestion:
    suggestion = db.query(Suggestion).filter(Suggestion.id == suggestion_id).first()
    if not suggestion:
        raise HTTPException(status_code=404, detail="Suggestion not found")
    for key, value in data.dict(exclude_unset=True).items():
        setattr(suggestion, key, value)
    db.commit()
    db.refresh(suggestion)
    return suggestion

def delete_suggestion(suggestion_id: int, db: Session):
    suggestion = db.query(Suggestion).filter(Suggestion.id == suggestion_id).first()
    if not suggestion:
        raise HTTPException(status_code=404, detail="Suggestion not found")
    db.delete(suggestion)
    db.commit()
