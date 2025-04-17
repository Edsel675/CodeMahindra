from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from controllers.suggestion_resource_controller import (
    get_all_suggestion_resources,
    get_suggestion_resource,
    create_suggestion_resource,
    delete_suggestion_resource
)
from schemas.suggestion_resource import SuggestionResourceCreate, SuggestionResourceOut
from database import get_db

router = APIRouter(prefix="/suggestion-resources", tags=["Suggestion-Resources"])

@router.get("/", response_model=List[SuggestionResourceOut])
def list_suggestion_resources(db: Session = Depends(get_db)):
    return get_all_suggestion_resources(db)

@router.get("/{suggestion_id}/{resource_id}", response_model=SuggestionResourceOut)
def retrieve_suggestion_resource(suggestion_id: int, resource_id: int, db: Session = Depends(get_db)):
    return get_suggestion_resource(suggestion_id, resource_id, db)

@router.post("/", response_model=SuggestionResourceOut, status_code=201)
def create_new_suggestion_resource(data: SuggestionResourceCreate, db: Session = Depends(get_db)):
    return create_suggestion_resource(data, db)

@router.delete("/{suggestion_id}/{resource_id}", status_code=204)
def delete_existing_suggestion_resource(suggestion_id: int, resource_id: int, db: Session = Depends(get_db)):
    delete_suggestion_resource(suggestion_id, resource_id, db)
