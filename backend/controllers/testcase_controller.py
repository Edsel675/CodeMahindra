from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.testcase import TestCase
from schemas.testcase import TestCaseCreate, TestCaseUpdate
from typing import List

def get_all_testcases(db: Session) -> List[TestCase]:
    return db.query(TestCase).all()

def get_testcase_by_id(testcase_id: int, db: Session) -> TestCase:
    tc = db.query(TestCase).filter(TestCase.id == testcase_id).first()
    if not tc:
        raise HTTPException(status_code=404, detail="TestCase not found")
    return tc

def create_testcase(data: TestCaseCreate, db: Session) -> TestCase:
    new_tc = TestCase(**data.dict())
    db.add(new_tc)
    db.commit()
    db.refresh(new_tc)
    return new_tc

def update_testcase(testcase_id: int, data: TestCaseUpdate, db: Session) -> TestCase:
    tc = db.query(TestCase).filter(TestCase.id == testcase_id).first()
    if not tc:
        raise HTTPException(status_code=404, detail="TestCase not found")
    for key, value in data.dict(exclude_unset=True).items():
        setattr(tc, key, value)
    db.commit()
    db.refresh(tc)
    return tc

def delete_testcase(testcase_id: int, db: Session):
    tc = db.query(TestCase).filter(TestCase.id == testcase_id).first()
    if not tc:
        raise HTTPException(status_code=404, detail="TestCase not found")
    db.delete(tc)
    db.commit()
