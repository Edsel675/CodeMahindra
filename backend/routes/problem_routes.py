from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session
from database import get_db
from controllers.problem_controller import (
    get_all_problems,
    get_problem_by_id,
    create_problem,
    update_problem,
    delete_problem
)
from schemas.problem import ProblemCreate, ProblemUpdate, ProblemOut
from controllers.problem_controller import create_problem_with_testcases
from schemas.problem_with_testcases import ProblemCreateWithTestCases, ProblemOutWithTestCases


router = APIRouter(prefix="/problems", tags=["Problems"])

@router.get("/", response_model=List[ProblemOut])
def list_problems(db: Session = Depends(get_db)):
    return get_all_problems(db)

@router.get("/{problem_id}", response_model=ProblemOut)
def retrieve_problem(problem_id: int, db: Session = Depends(get_db)):
    return get_problem_by_id(problem_id, db)

@router.post("/", response_model=ProblemOut, status_code=201)
def create_new_problem(data: ProblemCreate, db: Session = Depends(get_db)):
    return create_problem(data, db)

@router.put("/{problem_id}", response_model=ProblemOut)
def update_existing_problem(problem_id: int, data: ProblemUpdate, db: Session = Depends(get_db)):
    return update_problem(problem_id, data, db)

@router.delete("/{problem_id}", status_code=204)
def delete_existing_problem(problem_id: int, db: Session = Depends(get_db)):
    delete_problem(problem_id, db)

@router.post("/with_testcases", response_model=ProblemOutWithTestCases, status_code=201)
def create_problem_with_testcases_endpoint(
    data: ProblemCreateWithTestCases, db: Session = Depends(get_db)
):
    try:
        return create_problem_with_testcases(data, db)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))