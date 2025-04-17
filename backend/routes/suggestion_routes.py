from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from database import get_db

from controllers.suggestion_controller import (
    get_all_suggestions,
    get_suggestion_by_id,
    create_suggestion,
    update_suggestion,
    delete_suggestion
)
from schemas.suggestion import SuggestionCreate, SuggestionUpdate, SuggestionOut

router = APIRouter(prefix="/suggestions", tags=["Suggestions"])

@router.get("/", response_model=List[SuggestionOut])
def list_suggestions(db: Session = Depends(get_db)):
    return get_all_suggestions(db)

@router.get("/{suggestion_id}", response_model=SuggestionOut)
def retrieve_suggestion(suggestion_id: int, db: Session = Depends(get_db)):
    return get_suggestion_by_id(suggestion_id, db)

@router.post("/", response_model=SuggestionOut, status_code=201)
def create_new_suggestion(data: SuggestionCreate, db: Session = Depends(get_db)):
    return create_suggestion(data, db)

@router.put("/{suggestion_id}", response_model=SuggestionOut)
def update_existing_suggestion(suggestion_id: int, data: SuggestionUpdate, db: Session = Depends(get_db)):
    return update_suggestion(suggestion_id, data, db)

@router.delete("/{suggestion_id}", status_code=204)
def delete_existing_suggestion(suggestion_id: int, db: Session = Depends(get_db)):
    delete_suggestion(suggestion_id, db)
