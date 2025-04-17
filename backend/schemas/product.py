from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from typing import List

class ProductBase(BaseModel):
    image: Optional[str] = None
    name: str
    price: Optional[int] = None
    description: Optional[str] = None
    quantity: Optional[int] = None

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    pass
class ProductAddStockRequest(BaseModel):
    quantity: int
    
class ProductPurchase(BaseModel):
    product_id: int
    quantity_to_buy: int

class BuyItemsRequest(BaseModel):
    employee_id: str
    products_to_buy: List[ProductPurchase]

class ProductOut(ProductBase):
    id: int
    publishDate: datetime

    class Config:
        from_attributes = True

