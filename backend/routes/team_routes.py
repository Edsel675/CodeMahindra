from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List
from sqlalchemy.orm import Session

from database import get_db
from controllers.team_controller import (
    get_all_teams,
    get_team_by_id,
    create_team,
    update_team,
    delete_team,
    create_team_with_user,
    join_team_with_code
)
from schemas.team import TeamCreate, TeamUpdate, TeamOut
from models.employee import Employee
from dependencies import get_current_employee
from uuid import UUID
from models.team import Team
from schemas.team import TeamJoin

router = APIRouter(prefix="/teams", tags=["Teams"])

# Obtener todos los equipos
@router.get("/", response_model=List[TeamOut])
def list_teams(db: Session = Depends(get_db)):
    return get_all_teams(db)

# Obtener un equipo por ID
@router.get("/{team_id}", response_model=TeamOut)
def retrieve_team(team_id: int, db: Session = Depends(get_db)):
    return get_team_by_id(team_id, db)

# Crear un equipo (sin asignación de usuario)
@router.post("/", response_model=TeamOut, status_code=201)
def create_new_team(team: TeamCreate, db: Session = Depends(get_db)):
    return create_team(team, db)

# Actualizar equipo
@router.put("/{team_id}", response_model=TeamOut)
def update_existing_team(team_id: int, team: TeamUpdate, db: Session = Depends(get_db)):
    return update_team(team_id, team, db)

# Eliminar equipo
@router.delete("/{team_id}", status_code=204)
def delete_existing_team(team_id: int, db: Session = Depends(get_db)):
    delete_team(team_id, db)

# Obtener equipo con lista de miembros
@router.get("/{team_id}/details")
def get_team_with_members(team_id: int, db: Session = Depends(get_db)):
    team = get_team_by_id(team_id, db)
    members = db.query(Employee).filter(Employee.team_id == team_id).all()
    return {
        "team": {
            "id": team.id,
            "name": team.name,
            "level": team.level,
            "experience": team.experience,
            "creationDate": team.creationDate,
        },
        "members": [
            {
                "id": str(member.id),
                "firstName": member.firstName,
                "lastName": member.lastName,
                "profilePicture": member.profilePicture,
                "level": member.level,
                "coins": member.coins,
                "nationality": member.nationality
            }
            for member in members
        ]
    }

# Crear un equipo y asociar al usuario actual
@router.post("/create-and-assign", response_model=TeamOut)
def create_team_for_user(
    team_data: TeamCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_employee),
):
    return create_team_with_user(current_user.id, team_data, db)

# Unirse a un equipo mediante código
@router.post("/join")
def join_team_by_code(
    team_data: TeamJoin,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_employee),
):
    return join_team_with_code(current_user.id, team_data.team_code, db)

@router.post("/{team_id}/leave", status_code=200)
def leave_team(
    team_id: int,
    db: Session = Depends(get_db),
    current_user: Employee = Depends(get_current_employee)
):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    if current_user.team_id != team_id:
        raise HTTPException(status_code=400, detail="You are not a member of this team")

    current_user.team_id = None  # Elimina la relación
    db.commit()

    return {"message": "You have left the team"}