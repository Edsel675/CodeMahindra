from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from database import get_db
from controllers.achievement_controller import (
    get_all_achievements,
    get_achievement_by_id,
    create_achievement,
    update_achievement,
    delete_achievement
)
from schemas.achievement import AchievementCreate, AchievementUpdate, AchievementOut

router = APIRouter(prefix="/achievements", tags=["Achievements"])

@router.get("/", response_model=List[AchievementOut])
def list_achievements(db: Session = Depends(get_db)):
    return get_all_achievements(db)

@router.get("/{achievement_id}", response_model=AchievementOut)
def retrieve_achievement(achievement_id: int, db: Session = Depends(get_db)):
    return get_achievement_by_id(achievement_id, db)

@router.post("/", response_model=AchievementOut, status_code=201)
def create_new_achievement(data: AchievementCreate, db: Session = Depends(get_db)):
    return create_achievement(data, db)

@router.put("/{achievement_id}", response_model=AchievementOut)
def update_existing_achievement(achievement_id: int, data: AchievementUpdate, db: Session = Depends(get_db)):
    return update_achievement(achievement_id, data, db)

@router.delete("/{achievement_id}", status_code=204)
def delete_existing_achievement(achievement_id: int, db: Session = Depends(get_db)):
    delete_achievement(achievement_id, db)
