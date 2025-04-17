from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.team import Team
from schemas.team import TeamCreate, TeamUpdate
from typing import List

def get_all_teams(db: Session) -> List[Team]:
    return db.query(Team).all()

def get_team_by_id(team_id: int, db: Session) -> Team:
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    return team

def create_team(team_data: TeamCreate, db: Session) -> Team:
    new_team = Team(**team_data.dict())
    db.add(new_team)
    db.commit()
    db.refresh(new_team)
    return new_team

def update_team(team_id: int, team_data: TeamUpdate, db: Session) -> Team:
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    for key, value in team_data.dict().items():
        setattr(team, key, value)
    db.commit()
    db.refresh(team)
    return team

def delete_team(team_id: int, db: Session):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    db.delete(team)
    db.commit()
