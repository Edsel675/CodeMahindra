from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.suggestion_resource import SuggestionResource
from schemas.suggestion_resource import SuggestionResourceCreate
from typing import List

def get_all_suggestion_resources(db: Session) -> List[SuggestionResource]:
    return db.query(SuggestionResource).all()

def get_suggestion_resource(suggestion_id: int, resource_id: int, db: Session) -> SuggestionResource:
    rel = db.query(SuggestionResource).filter(
        SuggestionResource.suggestion_id == suggestion_id,
        SuggestionResource.resource_id == resource_id
    ).first()
    if not rel:
        raise HTTPException(status_code=404, detail="Relation not found")
    return rel

def create_suggestion_resource(data: SuggestionResourceCreate, db: Session) -> SuggestionResource:
    existing = db.query(SuggestionResource).filter(
        SuggestionResource.suggestion_id == data.suggestion_id,
        SuggestionResource.resource_id == data.resource_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Relation already exists")
    rel = SuggestionResource(**data.dict())
    db.add(rel)
    db.commit()
    db.refresh(rel)
    return rel

def delete_suggestion_resource(suggestion_id: int, resource_id: int, db: Session):
    rel = db.query(SuggestionResource).filter(
        SuggestionResource.suggestion_id == suggestion_id,
        SuggestionResource.resource_id == resource_id
    ).first()
    if not rel:
        raise HTTPException(status_code=404, detail="Relation not found")
    db.delete(rel)
    db.commit()
