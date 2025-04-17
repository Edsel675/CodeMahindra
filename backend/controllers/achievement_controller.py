from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.achievement import Achievement
from schemas.achievement import AchievementCreate, AchievementUpdate
from typing import List

def get_all_achievements(db: Session) -> List[Achievement]:
    return db.query(Achievement).all()

def get_achievement_by_id(achievement_id: int, db: Session) -> Achievement:
    achievement = db.query(Achievement).filter(Achievement.id == achievement_id).first()
    if not achievement:
        raise HTTPException(status_code=404, detail="Achievement not found")
    return achievement

def create_achievement(data: AchievementCreate, db: Session) -> Achievement:
    new_achievement = Achievement(**data.dict())
    db.add(new_achievement)
    db.commit()
    db.refresh(new_achievement)
    return new_achievement

def update_achievement(achievement_id: int, data: AchievementUpdate, db: Session) -> Achievement:
    achievement = db.query(Achievement).filter(Achievement.id == achievement_id).first()
    if not achievement:
        raise HTTPException(status_code=404, detail="Achievement not found")
    for key, value in data.dict(exclude_unset=True).items():
        setattr(achievement, key, value)
    db.commit()
    db.refresh(achievement)
    return achievement

def delete_achievement(achievement_id: int, db: Session):
    achievement = db.query(Achievement).filter(Achievement.id == achievement_id).first()
    if not achievement:
        raise HTTPException(status_code=404, detail="Achievement not found")
    db.delete(achievement)
    db.commit()
