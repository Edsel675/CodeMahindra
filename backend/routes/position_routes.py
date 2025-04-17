from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from database import get_db
from controllers.position_controller import (
    get_all_positions,
    get_position_by_id,
    create_position,
    update_position,
    delete_position
)
from schemas.position import PositionCreate, PositionUpdate, PositionOut

router = APIRouter(prefix="/positions", tags=["Positions"])

@router.get("/", response_model=List[PositionOut])
def list_positions(db: Session = Depends(get_db)):
    return get_all_positions(db)

@router.get("/{position_id}", response_model=PositionOut)
def retrieve_position(position_id: int, db: Session = Depends(get_db)):
    return get_position_by_id(position_id, db)

@router.post("/", response_model=PositionOut, status_code=201)
def create_new_position(position: PositionCreate, db: Session = Depends(get_db)):
    return create_position(position, db)

@router.put("/{position_id}", response_model=PositionOut)
def update_existing_position(position_id: int, position: PositionUpdate, db: Session = Depends(get_db)):
    return update_position(position_id, position, db)

@router.delete("/{position_id}", status_code=204)
def delete_existing_position(position_id: int, db: Session = Depends(get_db)):
    delete_position(position_id, db)
