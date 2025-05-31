from uuid import UUID
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ProblemBase(BaseModel):
    reward: Optional[int] = None
    name: Optional[str]
    description: Optional[str] = None
    input_format: Optional[str]
    output_format: Optional[str]
    sample_input: Optional[str]
    sample_output: Optional[str]
    difficulty: Optional[str] = None
    acceptance: Optional[float] = None
    expirationDate: Optional[datetime] = None
    solution: Optional[str] = None
    language: Optional[str]
    was_graded: Optional[bool] = False
    successful_submissions: Optional[int] = 0
    total_submissions: Optional[int] = 0

class ProblemCreate(BaseModel):
    reward: int
    name: str
    description: str
    input_format: str
    output_format: str
    sample_input: str
    sample_output: str
    difficulty: Optional[str] = None
    acceptance: Optional[float] = None
    expirationDate: Optional[datetime] = None
    solution: Optional[str] = None
    language: str
    was_graded: Optional[bool] = False

class ProblemUpdate(BaseModel):
    reward: Optional[int] = None
    name: Optional[str] = None
    description: Optional[str] = None
    input_format: Optional[str] = None
    output_format: Optional[str] = None
    sample_input: Optional[str] = None
    sample_output: Optional[str] = None
    difficulty: Optional[str] = None
    acceptance: Optional[float] = None
    expirationDate: Optional[datetime] = None
    solution: Optional[str] = None
    language: Optional[str] = None
    was_graded: Optional[bool] = None


class ProblemOut(ProblemBase):
    id: int
    creationDate: datetime

class ProblemGradingResult(BaseModel):
    message: str
    first_place: Optional[UUID] = None
    second_place: Optional[UUID] = None
    third_place: Optional[UUID] = None
    first_reward: Optional[int] = None
    second_reward: Optional[int] = None
    third_reward: Optional[int] = None
    class Config:
        from_attributes = True
