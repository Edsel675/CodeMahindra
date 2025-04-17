from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from database import get_db
from controllers.testcase_controller import (
    get_all_testcases,
    get_testcase_by_id,
    create_testcase,
    update_testcase,
    delete_testcase
)
from schemas.testcase import TestCaseCreate, TestCaseUpdate, TestCaseOut

router = APIRouter(prefix="/testcases", tags=["TestCases"])

@router.get("/", response_model=List[TestCaseOut])
def list_testcases(db: Session = Depends(get_db)):
    return get_all_testcases(db)

@router.get("/{testcase_id}", response_model=TestCaseOut)
def retrieve_testcase(testcase_id: int, db: Session = Depends(get_db)):
    return get_testcase_by_id(testcase_id, db)

@router.post("/", response_model=TestCaseOut, status_code=201)
def create_new_testcase(data: TestCaseCreate, db: Session = Depends(get_db)):
    return create_testcase(data, db)

@router.put("/{testcase_id}", response_model=TestCaseOut)
def update_existing_testcase(testcase_id: int, data: TestCaseUpdate, db: Session = Depends(get_db)):
    return update_testcase(testcase_id, data, db)

@router.delete("/{testcase_id}", status_code=204)
def delete_existing_testcase(testcase_id: int, db: Session = Depends(get_db)):
    delete_testcase(testcase_id, db)
