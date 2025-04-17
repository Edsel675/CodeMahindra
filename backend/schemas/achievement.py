from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AchievementBase(BaseModel):
    name: str
    description: Optional[str] = None
    image: Optional[str] = None

class AchievementCreate(AchievementBase):
    pass

class AchievementUpdate(AchievementBase):
    pass

class AchievementOut(AchievementBase):
    id: int
    creationDate: datetime

    class Config:
        from_attributes = True
