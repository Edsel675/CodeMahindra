from pydantic import BaseModel
from typing import Optional
from uuid import UUID

class TaskBase(BaseModel):
    title: str
    taskType: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None
    estimatedTime: Optional[int] = None
    affectedModule: Optional[str] = None
    tag: Optional[str] = None
    reward: Optional[int] = None
    employee_id: Optional[UUID] = None

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    taskType: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None
    estimatedTime: Optional[int] = None
    affectedModule: Optional[str] = None
    tag: Optional[str] = None
    reward: Optional[int] = None
    employee_id: Optional[UUID] = None

class TaskOut(TaskBase):
    id: int

    class Config:
        from_attributes = True  # ✅ Reemplaza orm_mode en Pydantic v2
