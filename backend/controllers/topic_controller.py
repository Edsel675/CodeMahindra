from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.topic import Topic
from schemas.topic import TopicCreate, TopicUpdate
from typing import List

def get_all_topics(db: Session) -> List[Topic]:
    return db.query(Topic).all()

def get_topic_by_id(topic_id: int, db: Session) -> Topic:
    topic = db.query(Topic).filter(Topic.id == topic_id).first()
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    return topic

def create_topic(data: TopicCreate, db: Session) -> Topic:
    new_topic = Topic(**data.dict())
    db.add(new_topic)
    db.commit()
    db.refresh(new_topic)
    return new_topic

def update_topic(topic_id: int, data: TopicUpdate, db: Session) -> Topic:
    topic = db.query(Topic).filter(Topic.id == topic_id).first()
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    for key, value in data.dict(exclude_unset=True).items():
        setattr(topic, key, value)
    db.commit()
    db.refresh(topic)
    return topic

def delete_topic(topic_id: int, db: Session):
    topic = db.query(Topic).filter(Topic.id == topic_id).first()
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    db.delete(topic)
    db.commit()
