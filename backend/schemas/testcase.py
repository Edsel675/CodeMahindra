from pydantic import BaseModel
from typing import Optional

class TestCaseBase(BaseModel):
    input: Optional[str] = None
    output: Optional[str] = None
    problem_id: int

class TestCaseCreate(TestCaseBase):
    pass

class TestCaseUpdate(BaseModel):
    input: Optional[str] = None
    output: Optional[str] = None

class TestCaseOut(TestCaseBase):
    id: int

    class Config:
        from_attributes = True
