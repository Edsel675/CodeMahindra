from pydantic import BaseModel

class SuggestionResourceBase(BaseModel):
    suggestion_id: int
    resource_id: int

class SuggestionResourceCreate(SuggestionResourceBase):
    pass

class SuggestionResourceOut(SuggestionResourceBase):
    class Config:
        from_attributes = True
