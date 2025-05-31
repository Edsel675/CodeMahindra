from sqlalchemy import asc, desc, func
from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.employee_xp_history import EmployeeXPHistory
from models.employee import Employee
from models.solution import Solution
from models.problem import Problem
from schemas.problem import ProblemCreate, ProblemGradingResult, ProblemUpdate
from schemas.problem_with_testcases import ProblemCreateWithTestCases, ProblemOutWithTestCases
from schemas.problem_with_testcases import TestCaseCreate  # Import TestCaseCreate
from datetime import datetime
from models.testcase import TestCase
from typing import List

def get_all_problems(db: Session) -> List[Problem]:
    return db.query(Problem).all()

def get_problem_by_id(problem_id: int, db: Session) -> Problem:
    problem = db.query(Problem).filter(Problem.id == problem_id).first()
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")
    return problem

def create_problem(data: ProblemCreate, db: Session) -> Problem:
    new_problem = Problem(**data.dict())
    db.add(new_problem)
    db.commit()
    db.refresh(new_problem)
    return new_problem

def update_problem(problem_id: int, data: ProblemUpdate, db: Session) -> Problem:
    problem = db.query(Problem).filter(Problem.id == problem_id).first()
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")
    for key, value in data.dict(exclude_unset=True).items():
        setattr(problem, key, value)
    db.commit()
    db.refresh(problem)
    return problem
    
def delete_problem(problem_id: int, db: Session):
    try:
        problem = db.query(Problem).filter(Problem.id == problem_id).first()
        if not problem:
            raise HTTPException(status_code=404, detail="Problem not found")
        
        db.delete(problem)
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to delete problem: {str(e)}")

def create_problem_with_testcases(data: ProblemCreateWithTestCases, db: Session) -> ProblemOutWithTestCases:
    # Create the problem
    new_problem = Problem(
        name=data.name,
        description=data.description,
        input_format=data.input_format,
        output_format=data.output_format,
        sample_input=data.sample_input,
        sample_output=data.sample_output,
        difficulty=data.difficulty,
        creationDate=data.creationDate,
        expirationDate=data.expirationDate,
        solution=data.solution,
        language=data.language
    )
    
    db.add(new_problem)
    db.commit()
    db.refresh(new_problem)

    # Create the test cases and collect them
    testcases = []
    for testcase_data in data.testcases:
        new_testcase = TestCase(
            input=testcase_data.input,
            output=testcase_data.output,
            problem_id=new_problem.id
        )
        db.add(new_testcase)
        # Serialize the TestCase instance into a dictionary that can be validated by Pydantic
        testcases.append(TestCaseCreate(**new_testcase.__dict__))  # Convert the TestCase object to a Pydantic model

    db.commit()  # Commit the changes for test cases
    db.refresh(new_problem)  # Refresh the problem to include the test cases

    # Return the problem along with the testcases
    return ProblemOutWithTestCases(
        id=new_problem.id,
        name=new_problem.name,
        description=new_problem.description,
        input_format=new_problem.input_format,
        output_format=new_problem.output_format,
        sample_input=new_problem.sample_input,
        sample_output=new_problem.sample_output,
        difficulty=new_problem.difficulty,
        creationDate=new_problem.creationDate,
        expirationDate=new_problem.expirationDate,
        solution=new_problem.solution,
        language = new_problem.language,
        testcases=testcases  # Now this is a list of Pydantic model instances, not raw TestCase objects
    )
    
from sqlalchemy.sql import func
from sqlalchemy import desc, asc
from sqlalchemy.orm import Session
from sqlalchemy.sql import over
from fastapi import HTTPException

def grade_problem(problem_id: int, db: Session) -> ProblemGradingResult:
    # Get the problem first to check difficulty
    problem = db.query(Problem).filter(Problem.id == problem_id).first()
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")
    
    # Check if problem was already graded
    '''
    if problem.was_graded:
        raise HTTPException(status_code=400, detail="Problem was already graded")
    '''
    
    # Determine rewards based on difficulty
    if problem.difficulty.lower() == "hard":
        rewards = [1000, 800, 600]
    elif problem.difficulty.lower() == "medium":
        rewards = [800, 600, 400]
    else:  # easy or unspecified defaults to easy
        rewards = [600, 400, 200]
    
    try:
        # Rank each solution per employee using row_number
        ranked_subq = (
            db.query(
                Solution.id.label("solution_id"),
                Solution.employee_id,
                func.row_number().over(
                    partition_by=Solution.employee_id,
                    order_by=(
                        desc(Solution.testCasesPassed),
                        asc(Solution.executionTime),
                        asc(Solution.submissionDate)
                    )
                ).label("rank")
            )
            .filter(
                Solution.problem_id == problem_id,
                Solution.submissionDate >= problem.creationDate # only accepts submissions after the creationDate
                )
            .subquery()
        )

        # Select only the top-ranked (best) solution per employee
        top_solution_ids = (
            db.query(ranked_subq.c.solution_id)
            .filter(ranked_subq.c.rank == 1)
            .subquery()
        )

        # Get the actual Solution records
        top_solutions = (
            db.query(Solution)
            .filter(Solution.id.in_(top_solution_ids))
            .order_by(
                desc(Solution.testCasesPassed),
                asc(Solution.executionTime),
                asc(Solution.submissionDate)
            )
            .limit(3)
            .all()
        )

        result = ProblemGradingResult(
            message=f"Graded {len(top_solutions)} submission(s)"
        )

        for i, solution in enumerate(top_solutions):
            employee = db.query(Employee).filter(Employee.id == solution.employee_id).first()
            if not employee:
                continue

            reward = rewards[i] if i < len(rewards) else 0

            # Update employee stats
            employee.coins += reward
            employee.experience += reward
            
            # Log the experience update in history
            xp_entry = EmployeeXPHistory(
                employee_id=employee.id,
                experience=employee.experience,
                date=datetime.utcnow()
            )
            db.add(xp_entry)

            # Set result fields
            if i == 0:
                result.first_place = employee.id
                result.first_reward = reward
            elif i == 1:
                result.second_place = employee.id
                result.second_reward = reward
            elif i == 2:
                result.third_place = employee.id
                result.third_reward = reward

        # Mark problem as graded
        problem.was_graded = True
        db.commit()

        return result

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to grade problem: {str(e)}"
        )
