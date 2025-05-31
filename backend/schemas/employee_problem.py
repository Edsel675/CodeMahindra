from pydantic import BaseModel
from uuid import UUID

class EmployeeProblemBase(BaseModel):
    employee_id: UUID
    problem_id: int

class EmployeeProblemCreate(EmployeeProblemBase):
    pass

class EmployeeProblemRead(EmployeeProblemBase):
    class Config:
        orm_mode = True