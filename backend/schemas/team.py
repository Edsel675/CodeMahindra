from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TeamBase(BaseModel):
    creationDate: Optional[datetime] = None
    terminationDate: Optional[datetime] = None
    experience: Optional[int] = None
    level: Optional[int] = None
    name: Optional[str] = None

class TeamCreate(TeamBase):
    pass

class TeamUpdate(TeamBase):
    pass

class TeamOut(TeamBase):
    id: int

    class Config:
        from_attributes = True
