from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class EmployeeXPHistoryBase(BaseModel):
    employee_id: UUID
    experience: int

class EmployeeXPHistoryCreate(EmployeeXPHistoryBase):
    pass

class EmployeeXPHistoryUpdate(BaseModel):
    experience: int

class EmployeeXPHistoryOut(EmployeeXPHistoryBase):
    id: int
    date: datetime

    class Config:
        orm_mode = True
