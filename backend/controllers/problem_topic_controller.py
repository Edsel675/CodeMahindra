from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.problem_topic import ProblemTopic
from schemas.problem_topic import ProblemTopicCreate
from typing import List

def get_all_problem_topics(db: Session) -> List[ProblemTopic]:
    return db.query(ProblemTopic).all()

def get_problem_topic(topic_id: int, problem_id: int, db: Session) -> ProblemTopic:
    relation = db.query(ProblemTopic).filter(
        ProblemTopic.topic_id == topic_id,
        ProblemTopic.problem_id == problem_id
    ).first()
    if not relation:
        raise HTTPException(status_code=404, detail="Problem-Topic relation not found")
    return relation

def create_problem_topic(data: ProblemTopicCreate, db: Session) -> ProblemTopic:
    existing = db.query(ProblemTopic).filter(
        ProblemTopic.topic_id == data.topic_id,
        ProblemTopic.problem_id == data.problem_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Relation already exists")
    relation = ProblemTopic(**data.dict())
    db.add(relation)
    db.commit()
    db.refresh(relation)
    return relation

def delete_problem_topic(topic_id: int, problem_id: int, db: Session):
    relation = db.query(ProblemTopic).filter(
        ProblemTopic.topic_id == topic_id,
        ProblemTopic.problem_id == problem_id
    ).first()
    if not relation:
        raise HTTPException(status_code=404, detail="Problem-Topic relation not found")
    db.delete(relation)
    db.commit()
