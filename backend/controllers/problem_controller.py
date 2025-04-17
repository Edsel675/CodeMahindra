from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.problem import Problem
from schemas.problem import ProblemCreate, ProblemUpdate
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
    problem = db.query(Problem).filter(Problem.id == problem_id).first()
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")
    db.delete(problem)
    db.commit()

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
        solution=data.solution
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
        testcases=testcases  # Now this is a list of Pydantic model instances, not raw TestCase objects
    )