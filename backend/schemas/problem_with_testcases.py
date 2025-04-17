# schemas/problem_with_testcases.py
from pydantic import BaseModel
from typing import List
from datetime import datetime

class TestCaseCreate(BaseModel):
    input: str
    output: str

    class Config:
        orm_mode = True


class ProblemCreateWithTestCases(BaseModel):
    name: str
    description: str
    input_format: str
    output_format: str
    sample_input: str
    sample_output: str
    difficulty: str = 'Easy'
    creationDate: datetime = datetime.utcnow()
    expirationDate: datetime
    solution: str
    testcases: List[TestCaseCreate]


# Response schema (you can modify as needed)
class ProblemOutWithTestCases(BaseModel):
    id: int
    name: str
    description: str
    input_format: str
    output_format: str
    sample_input: str
    sample_output: str
    difficulty: str
    creationDate: datetime
    expirationDate: datetime
    solution: str
    testcases: List[TestCaseCreate]
