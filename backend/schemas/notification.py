from pydantic import BaseModel
from uuid import UUID
from typing import Optional

class NotificationBase(BaseModel):
    title: str
    description: Optional[str] = None
    employee_id: Optional[UUID] = None

class NotificationCreate(NotificationBase):
    pass

class NotificationUpdate(NotificationBase):
    pass

class NotificationOut(NotificationBase):
    id: int

    class Config:
        from_attributes = True
