from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from database import get_db
from controllers.badge_controller import (
    get_all_badges,
    get_badge_by_id,
    create_badge,
    update_badge,
    delete_badge
)
from schemas.badge import BadgeCreate, BadgeUpdate, BadgeOut

router = APIRouter(prefix="/badges", tags=["Badges"])

@router.get("/", response_model=List[BadgeOut])
def list_badges(db: Session = Depends(get_db)):
    return get_all_badges(db)

@router.get("/{badge_id}", response_model=BadgeOut)
def retrieve_badge(badge_id: int, db: Session = Depends(get_db)):
    return get_badge_by_id(badge_id, db)

@router.post("/", response_model=BadgeOut, status_code=201)
def create_new_badge(data: BadgeCreate, db: Session = Depends(get_db)):
    return create_badge(data, db)

@router.put("/{badge_id}", response_model=BadgeOut)
def update_existing_badge(badge_id: int, data: BadgeUpdate, db: Session = Depends(get_db)):
    return update_badge(badge_id, data, db)

@router.delete("/{badge_id}", status_code=204)
def delete_existing_badge(badge_id: int, db: Session = Depends(get_db)):
    delete_badge(badge_id, db)
