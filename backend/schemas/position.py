from pydantic import BaseModel

class PositionBase(BaseModel):
    positionName: str

class PositionCreate(PositionBase):
    pass

class PositionUpdate(PositionBase):
    pass

class PositionOut(PositionBase):
    id: int

    class Config:
        from_attributes = True
