from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class BadgeBase(BaseModel):
    name: str
    description: Optional[str] = None
    image: Optional[str] = None

class BadgeCreate(BadgeBase):
    pass

class BadgeUpdate(BadgeBase):
    pass

class BadgeOut(BadgeBase):
    id: int
    creationDate: datetime

    class Config:
        from_attributes = True
