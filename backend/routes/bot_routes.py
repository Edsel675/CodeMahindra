from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from database import get_db
from controllers.bot_controller import (
    get_all_bots,
    get_bot_by_id,
    create_bot,
    update_bot,
    delete_bot
)
from schemas.bot import BotCreate, BotUpdate, BotOut

router = APIRouter(prefix="/bots", tags=["Bots"])

@router.get("/", response_model=List[BotOut])
def list_bots(db: Session = Depends(get_db)):
    return get_all_bots(db)

@router.get("/{bot_id}", response_model=BotOut)
def retrieve_bot(bot_id: int, db: Session = Depends(get_db)):
    return get_bot_by_id(bot_id, db)

@router.post("/", response_model=BotOut, status_code=201)
def create_new_bot(bot: BotCreate, db: Session = Depends(get_db)):
    return create_bot(bot, db)

@router.put("/{bot_id}", response_model=BotOut)
def update_existing_bot(bot_id: int, bot: BotUpdate, db: Session = Depends(get_db)):
    return update_bot(bot_id, bot, db)

@router.delete("/{bot_id}", status_code=204)
def delete_existing_bot(bot_id: int, db: Session = Depends(get_db)):
    delete_bot(bot_id, db)
