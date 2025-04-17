from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ProblemBase(BaseModel):
    reward: Optional[int] = None
    name: str
    description: Optional[str] = None
    input_format: str
    output_format: str
    sample_input: str
    sample_output: str
    difficulty: Optional[str] = None
    acceptance: Optional[float] = None
    expirationDate: Optional[datetime] = None
    solution: Optional[str] = None

class ProblemCreate(ProblemBase):
    pass

class ProblemUpdate(ProblemBase):
    pass

class ProblemOut(ProblemBase):
    id: int
    creationDate: datetime

    class Config:
        from_attributes = True
