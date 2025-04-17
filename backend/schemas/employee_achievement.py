from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class EmployeeAchievementBase(BaseModel):
    pass  # Por ahora solo tiene la fecha automática

class EmployeeAchievementCreate(EmployeeAchievementBase):
    employee_id: UUID
    achievement_id: int

class EmployeeAchievementOut(EmployeeAchievementBase):
    employee_id: UUID
    achievement_id: int
    obtainedDate: datetime

    class Config:
        from_attributes = True
