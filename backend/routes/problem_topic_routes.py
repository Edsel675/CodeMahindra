from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from database import get_db
from controllers.problem_topic_controller import (
    get_all_problem_topics,
    get_problem_topic,
    create_problem_topic,
    delete_problem_topic
)
from schemas.problem_topic import ProblemTopicCreate, ProblemTopicOut

router = APIRouter(prefix="/problem-topics", tags=["Problem-Topics"])

@router.get("/", response_model=List[ProblemTopicOut])
def list_problem_topics(db: Session = Depends(get_db)):
    return get_all_problem_topics(db)

@router.get("/{topic_id}/{problem_id}", response_model=ProblemTopicOut)
def retrieve_problem_topic(topic_id: int, problem_id: int, db: Session = Depends(get_db)):
    return get_problem_topic(topic_id, problem_id, db)

@router.post("/", response_model=ProblemTopicOut, status_code=201)
def create_new_problem_topic_link(data: ProblemTopicCreate, db: Session = Depends(get_db)):
    return create_problem_topic(data, db)

@router.delete("/{topic_id}/{problem_id}", status_code=204)
def delete_problem_topic_link(topic_id: int, problem_id: int, db: Session = Depends(get_db)):
    delete_problem_topic(topic_id, problem_id, db)
