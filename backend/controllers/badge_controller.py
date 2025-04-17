from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.badge import Badge
from schemas.badge import BadgeCreate, BadgeUpdate
from typing import List

def get_all_badges(db: Session) -> List[Badge]:
    return db.query(Badge).all()

def get_badge_by_id(badge_id: int, db: Session) -> Badge:
    badge = db.query(Badge).filter(Badge.id == badge_id).first()
    if not badge:
        raise HTTPException(status_code=404, detail="Badge not found")
    return badge

def create_badge(data: BadgeCreate, db: Session) -> Badge:
    new_badge = Badge(**data.dict())
    db.add(new_badge)
    db.commit()
    db.refresh(new_badge)
    return new_badge

def update_badge(badge_id: int, data: BadgeUpdate, db: Session) -> Badge:
    badge = db.query(Badge).filter(Badge.id == badge_id).first()
    if not badge:
        raise HTTPException(status_code=404, detail="Badge not found")
    for key, value in data.dict(exclude_unset=True).items():
        setattr(badge, key, value)
    db.commit()
    db.refresh(badge)
    return badge

def delete_badge(badge_id: int, db: Session):
    badge = db.query(Badge).filter(Badge.id == badge_id).first()
    if not badge:
        raise HTTPException(status_code=404, detail="Badge not found")
    db.delete(badge)
    db.commit()
