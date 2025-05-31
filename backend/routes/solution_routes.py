from fastapi import APIRouter, Depends, HTTPException
from typing import List
from uuid import UUID
from sqlalchemy.orm import Session
from models.solution import Solution
from database import get_db
from schemas.solution import SolutionCreate, SolutionUpdate, SolutionOut, Submission, LeaderboardEntry
from schemas.testcase import TestCaseResult, TestInput
from controllers.solution_controller import (
    get_all_solutions,
    get_solution_by_id,
    get_solutions_by_employee_and_problem,
    create_solution,
    update_solution,
    delete_solution,
    test_code,
    get_test_case_results,
    get_problem_leaderboard_data
)



router = APIRouter(prefix="/solutions", tags=["Solutions"])

@router.get("/", response_model=List[SolutionOut])
def list_solutions(db: Session = Depends(get_db)):
    return get_all_solutions(db)

# New endpoint - get solution by ID
@router.get("/{solution_id}", response_model=SolutionOut)
def retrieve_solution_by_id(solution_id: int, db: Session = Depends(get_db)):
    return get_solution_by_id(solution_id, db)

# Updated endpoint - now returns List[SolutionOut] since multiple solutions may exist
@router.get("/employee/{employee_id}/problem/{problem_id}", response_model=List[SolutionOut])
def retrieve_solutions_for_problem(
    employee_id: UUID, 
    problem_id: int, 
    db: Session = Depends(get_db)
):
    return get_solutions_by_employee_and_problem(employee_id, problem_id, db)

@router.post("/", response_model=SolutionOut, status_code=201)
def create_new_solution(data: SolutionCreate, db: Session = Depends(get_db)):
    return create_solution(data, db)

# Updated to use solution_id instead of composite key
@router.put("/{solution_id}", response_model=SolutionOut)
def update_existing_solution(
    solution_id: int, 
    data: SolutionUpdate, 
    db: Session = Depends(get_db)
):
    return update_solution(solution_id, data, db)

# Updated to use solution_id
@router.delete("/{solution_id}", status_code=204)
def delete_existing_solution(solution_id: int, db: Session = Depends(get_db)):
    delete_solution(solution_id, db)

# Testing endpoints remain unchanged
@router.post("/test", response_model=TestCaseResult)
async def test_solution_code(data: TestInput, db: Session = Depends(get_db)):
    try:
        return await test_code(
            problem_id=data.problem_id,
            source_code=data.source_code,
            input=data.input,
            language=data.language,
            db=db
        )
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error testing code: {str(e)}"
        )

@router.post("/test-results", response_model=List[TestCaseResult])
async def get_submission_test_results(submission: Submission, db: Session = Depends(get_db)):
    try:
        return await get_test_case_results(submission, db)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error getting test results: {str(e)}"
        )

@router.get("/problem/{problem_id}/leaderboard", response_model=List[LeaderboardEntry])
def get_problem_leaderboard(
    problem_id: int, 
    db: Session = Depends(get_db)
):
    return get_problem_leaderboard_data(problem_id, db)


@router.get("/employee/{employee_id}", response_model=List[SolutionOut])
def get_solutions_by_employee(employee_id: UUID, db: Session = Depends(get_db)):
    solutions = db.query(Solution)\
                  .filter(Solution.employee_id == employee_id)\
                  .order_by(Solution.submissionDate)\
                  .all()

    if not solutions:
        raise HTTPException(status_code=404, detail="No solutions found for this employee")

    return solutions