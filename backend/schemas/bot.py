from pydantic import BaseModel
from typing import Optional

class BotBase(BaseModel):
    name: str
    description: Optional[str] = None
    image: Optional[str] = None
    price: Optional[int] = None

class BotCreate(BotBase):
    pass

class BotUpdate(BotBase):
    pass

class BotOut(BotBase):
    id: int

    class Config:
        from_attributes = True
