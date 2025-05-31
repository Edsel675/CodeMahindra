from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import List


class PurchaseBase(BaseModel):
    date: datetime


class PurchaseCreate(PurchaseBase):
    pass


class PurchaseOut(PurchaseBase):
    id: int

    class Config:
        orm_mode = True


class PurchaseProductBase(BaseModel):
    purchase_id: int
    employee_id: UUID
    product_id: int
    count: int
    delivered: bool = False


class PurchaseProductCreate(PurchaseProductBase):
    pass

class ProductInPurchase(BaseModel):
    product_id: int
    name: str
    image: str
    quantity: int
    delivered: bool

class PurchaseDetail(BaseModel):
    purchase_date: datetime
    purchase_id: int
    employee_id: UUID
    profileEpic: str
    firstName: str
    lastName: str
    products: List[ProductInPurchase]

class UpdateDeliveryStatus(BaseModel):
    product_id: int
    delivered: bool
    
class PurchaseProductOut(PurchaseProductBase):
    class Config:
        orm_mode = True


class UpdateDeliveryStatus(BaseModel):
    purchase_id: int
    employee_id: str
    product_id: int