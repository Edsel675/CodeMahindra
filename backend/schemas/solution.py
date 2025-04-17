from pydantic import BaseModel
from uuid import UUID
from typing import Optional
from datetime import datetime

class SolutionBase(BaseModel):
    status: Optional[str] = None
    code: Optional[str] = None
    executionTime: Optional[float] = None
    memory: Optional[float] = None
    inTeam: Optional[bool] = None
    language: Optional[str] = None

class SolutionCreate(SolutionBase):
    employee_id: UUID
    problem_id: int

class SolutionUpdate(SolutionBase):
    pass

class SolutionOut(SolutionBase):
    employee_id: UUID
    problem_id: int
    submissionDate: datetime

    class Config:
        from_attributes = True
