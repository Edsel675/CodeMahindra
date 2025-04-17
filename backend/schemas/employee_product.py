from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class EmployeeProductBase(BaseModel):
    pass  # purchaseDate is automatically assigned

class EmployeeProductCreate(EmployeeProductBase):
    employee_id: UUID
    product_id: int

class EmployeeProductOut(EmployeeProductBase):
    employee_id: UUID
    product_id: int
    purchaseDate: datetime

    class Config:
        from_attributes = True
