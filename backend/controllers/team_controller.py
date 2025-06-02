from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.team import Team
from models.employee import Employee
from schemas.team import TeamCreate, TeamUpdate, TeamJoin
from typing import List
import uuid
import random
import string
from uuid import UUID

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

def create_team_with_user(user_id: int, team_data: TeamCreate, db: Session) -> Team:
    code = str(uuid.uuid4())[:8]  # Genera un código único corto
    new_team = Team(
        name=team_data.name,
        level=1,
        experience=0,
        code=code
    )
    db.add(new_team)
    db.commit()
    db.refresh(new_team)

    employee = db.query(Employee).filter(Employee.id == user_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Empleado no encontrado")
    employee.team_id = new_team.id
    db.commit()

    return new_team

def join_team_with_code(user_id: int, team_code: str, db: Session) -> Team:
    team = db.query(Team).filter(Team.code == team_code).first()
    if not team:
        raise HTTPException(status_code=404, detail="Equipo no encontrado")

    employee = db.query(Employee).filter(Employee.id == user_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Empleado no encontrado")

    employee.team_id = team.id
    db.commit()

    return team
def generate_team_code(length=6):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

def create_team_with_user(user_id: UUID, team_data: TeamCreate, db: Session):
    from models.employee import Employee  # por si no estaba importado

    code = generate_team_code()

    new_team = Team(
        name=team_data.name,
        creationDate=team_data.creationDate,
        terminationDate=team_data.terminationDate,
        experience=team_data.experience,
        level=team_data.level,
        code=code,  # ✅ aquí se asigna el código generado
    )

    db.add(new_team)
    db.commit()
    db.refresh(new_team)

    # asignar equipo al usuario
    employee = db.query(Employee).filter(Employee.id == user_id).first()
    if employee:
        employee.team_id = new_team.id
        db.commit()

    return new_team