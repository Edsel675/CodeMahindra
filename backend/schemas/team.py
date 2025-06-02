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

class TeamJoin(BaseModel):
    team_code: str
    
class TeamOut(TeamBase):
    id: int
    name: str
    code: str

    class Config:
        from_attributes = True
