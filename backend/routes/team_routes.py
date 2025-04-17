from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from database import get_db
from controllers.team_controller import (
    get_all_teams,
    get_team_by_id,
    create_team,
    update_team,
    delete_team
)
from schemas.team import TeamCreate, TeamUpdate, TeamOut

router = APIRouter(prefix="/teams", tags=["Teams"])

@router.get("/", response_model=List[TeamOut])
def list_teams(db: Session = Depends(get_db)):
    return get_all_teams(db)

@router.get("/{team_id}", response_model=TeamOut)
def retrieve_team(team_id: int, db: Session = Depends(get_db)):
    return get_team_by_id(team_id, db)

@router.post("/", response_model=TeamOut, status_code=201)
def create_new_team(team: TeamCreate, db: Session = Depends(get_db)):
    return create_team(team, db)

@router.put("/{team_id}", response_model=TeamOut)
def update_existing_team(team_id: int, team: TeamUpdate, db: Session = Depends(get_db)):
    return update_team(team_id, team, db)

@router.delete("/{team_id}", status_code=204)
def delete_existing_team(team_id: int, db: Session = Depends(get_db)):
    delete_team(team_id, db)
