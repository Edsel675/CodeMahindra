from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.bot import Bot
from schemas.bot import BotCreate, BotUpdate
from typing import List

def get_all_bots(db: Session) -> List[Bot]:
    return db.query(Bot).all()

def get_bot_by_id(bot_id: int, db: Session) -> Bot:
    bot = db.query(Bot).filter(Bot.id == bot_id).first()
    if not bot:
        raise HTTPException(status_code=404, detail="Bot not found")
    return bot

def create_bot(bot_data: BotCreate, db: Session) -> Bot:
    new_bot = Bot(**bot_data.dict())
    db.add(new_bot)
    db.commit()
    db.refresh(new_bot)
    return new_bot

def update_bot(bot_id: int, bot_data: BotUpdate, db: Session) -> Bot:
    bot = db.query(Bot).filter(Bot.id == bot_id).first()
    if not bot:
        raise HTTPException(status_code=404, detail="Bot not found")
    for key, value in bot_data.dict().items():
        setattr(bot, key, value)
    db.commit()
    db.refresh(bot)
    return bot

def delete_bot(bot_id: int, db: Session):
    bot = db.query(Bot).filter(Bot.id == bot_id).first()
    if not bot:
        raise HTTPException(status_code=404, detail="Bot not found")
    db.delete(bot)
    db.commit()
