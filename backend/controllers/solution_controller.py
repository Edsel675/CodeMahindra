from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.solution import Solution
from schemas.solution import SolutionCreate, SolutionUpdate
from typing import List

def get_all_solutions(db: Session) -> List[Solution]:
    return db.query(Solution).all()

def get_solution(employee_id, problem_id, db: Session) -> Solution:
    sol = db.query(Solution).filter(
        Solution.employee_id == employee_id,
        Solution.problem_id == problem_id
    ).first()
    if not sol:
        raise HTTPException(status_code=404, detail="Solution not found")
    return sol

def create_solution(data: SolutionCreate, db: Session) -> Solution:
    existing = db.query(Solution).filter(
        Solution.employee_id == data.employee_id,
        Solution.problem_id == data.problem_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Solution already exists")
    sol = Solution(**data.dict())
    db.add(sol)
    db.commit()
    db.refresh(sol)
    return sol

def update_solution(employee_id, problem_id, data: SolutionUpdate, db: Session) -> Solution:
    sol = db.query(Solution).filter(
        Solution.employee_id == employee_id,
        Solution.problem_id == problem_id
    ).first()
    if not sol:
        raise HTTPException(status_code=404, detail="Solution not found")
    for key, value in data.dict(exclude_unset=True).items():
        setattr(sol, key, value)
    db.commit()
    db.refresh(sol)
    return sol

def delete_solution(employee_id, problem_id, db: Session):
    sol = db.query(Solution).filter(
        Solution.employee_id == employee_id,
        Solution.problem_id == problem_id
    ).first()
    if not sol:
        raise HTTPException(status_code=404, detail="Solution not found")
    db.delete(sol)
    db.commit()
