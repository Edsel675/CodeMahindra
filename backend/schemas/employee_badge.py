from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class EmployeeBadgeBase(BaseModel):
    pass  # No campos editables por ahora

class EmployeeBadgeCreate(EmployeeBadgeBase):
    employee_id: UUID
    badge_id: int

class EmployeeBadgeOut(EmployeeBadgeBase):
    employee_id: UUID
    badge_id: int
    obtainedDate: datetime

    class Config:
        from_attributes = True
