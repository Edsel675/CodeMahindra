from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional

class EmployeeBotBase(BaseModel):
    isEquipped: Optional[bool] = False

class EmployeeBotCreate(EmployeeBotBase):
    employee_id: UUID
    bot_id: int

class EmployeeBotUpdate(EmployeeBotBase):
    pass

class EmployeeBotOut(EmployeeBotBase):
    employee_id: UUID
    bot_id: int
    purchaseDate: datetime

    class Config:
        from_attributes = True
