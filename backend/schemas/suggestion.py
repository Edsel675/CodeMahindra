from pydantic import BaseModel
from uuid import UUID
from typing import Optional
from datetime import datetime

class SuggestionBase(BaseModel):
    code: Optional[str] = None
    comment: Optional[str] = None
    path: Optional[str] = None
    employee_id: UUID

class SuggestionCreate(SuggestionBase):
    pass

class SuggestionUpdate(BaseModel):
    code: Optional[str] = None
    comment: Optional[str] = None
    path: Optional[str] = None

class SuggestionOut(SuggestionBase):
    id: int
    suggestionDate: datetime

    class Config:
        from_attributes = True
