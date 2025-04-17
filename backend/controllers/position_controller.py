from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.position import Position
from schemas.position import PositionCreate, PositionUpdate
from typing import List

def get_all_positions(db: Session) -> List[Position]:
    return db.query(Position).all()

def get_position_by_id(position_id: int, db: Session) -> Position:
    position = db.query(Position).filter(Position.id == position_id).first()
    if not position:
        raise HTTPException(status_code=404, detail="Position not found")
    return position

def create_position(position_data: PositionCreate, db: Session) -> Position:
    new_position = Position(**position_data.dict())
    db.add(new_position)
    db.commit()
    db.refresh(new_position)
    return new_position

def update_position(position_id: int, position_data: PositionUpdate, db: Session) -> Position:
    position = db.query(Position).filter(Position.id == position_id).first()
    if not position:
        raise HTTPException(status_code=404, detail="Position not found")
    for key, value in position_data.dict().items():
        setattr(position, key, value)
    db.commit()
    db.refresh(position)
    return position

def delete_position(position_id: int, db: Session):
    position = db.query(Position).filter(Position.id == position_id).first()
    if not position:
        raise HTTPException(status_code=404, detail="Position not found")
    db.delete(position)
    db.commit()
