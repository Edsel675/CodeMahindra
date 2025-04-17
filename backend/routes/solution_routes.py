from fastapi import APIRouter, Depends
from typing import List
from uuid import UUID
from sqlalchemy.orm import Session
from database import get_db
from controllers.solution_controller import (
    get_all_solutions,
    get_solution,
    create_solution,
    update_solution,
    delete_solution
)
from schemas.solution import SolutionCreate, SolutionUpdate, SolutionOut

router = APIRouter(prefix="/solutions", tags=["Solutions"])

@router.get("/", response_model=List[SolutionOut])
def list_solutions(db: Session = Depends(get_db)):
    return get_all_solutions(db)

@router.get("/{employee_id}/{problem_id}", response_model=SolutionOut)
def retrieve_solution(employee_id: UUID, problem_id: int, db: Session = Depends(get_db)):
    return get_solution(employee_id, problem_id, db)

@router.post("/", response_model=SolutionOut, status_code=201)
def create_new_solution(data: SolutionCreate, db: Session = Depends(get_db)):
    return create_solution(data, db)

@router.put("/{employee_id}/{problem_id}", response_model=SolutionOut)
def update_existing_solution(employee_id: UUID, problem_id: int, data: SolutionUpdate, db: Session = Depends(get_db)):
    return update_solution(employee_id, problem_id, data, db)

@router.delete("/{employee_id}/{problem_id}", status_code=204)
def delete_existing_solution(employee_id: UUID, problem_id: int, db: Session = Depends(get_db)):
    delete_solution(employee_id, problem_id, db)
