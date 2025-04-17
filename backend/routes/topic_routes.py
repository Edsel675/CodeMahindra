from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from database import get_db
from controllers.topic_controller import (
    get_all_topics,
    get_topic_by_id,
    create_topic,
    update_topic,
    delete_topic
)
from schemas.topic import TopicCreate, TopicUpdate, TopicOut

router = APIRouter(prefix="/topics", tags=["Topics"])

@router.get("/", response_model=List[TopicOut])
def list_topics(db: Session = Depends(get_db)):
    return get_all_topics(db)

@router.get("/{topic_id}", response_model=TopicOut)
def retrieve_topic(topic_id: int, db: Session = Depends(get_db)):
    return get_topic_by_id(topic_id, db)

@router.post("/", response_model=TopicOut, status_code=201)
def create_new_topic(data: TopicCreate, db: Session = Depends(get_db)):
    return create_topic(data, db)

@router.put("/{topic_id}", response_model=TopicOut)
def update_existing_topic(topic_id: int, data: TopicUpdate, db: Session = Depends(get_db)):
    return update_topic(topic_id, data, db)

@router.delete("/{topic_id}", status_code=204)
def delete_existing_topic(topic_id: int, db: Session = Depends(get_db)):
    delete_topic(topic_id, db)
