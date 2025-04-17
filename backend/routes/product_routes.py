from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from controllers.product_controller import (
    get_all_products,
    get_product_by_id,
    create_product,
    update_product,
    delete_product,
    add_stock,
    buy_items
)
from schemas.product import ProductAddStockRequest, ProductCreate, ProductUpdate, ProductOut, BuyItemsRequest
from database import get_db

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/", response_model=List[ProductOut])
def list_products(db: Session = Depends(get_db)):
    return get_all_products(db)

@router.get("/{product_id}", response_model=ProductOut)
def retrieve_product(product_id: int, db: Session = Depends(get_db)):
    return get_product_by_id(product_id, db)

@router.post("/", response_model=ProductOut, status_code=201)
def create_new_product(data: ProductCreate, db: Session = Depends(get_db)):
    return create_product(data, db)

@router.put("/{product_id}", response_model=ProductOut)
def update_existing_product(product_id: int, data: ProductUpdate, db: Session = Depends(get_db)):
    return update_product(product_id, data, db)

@router.delete("/{product_id}", status_code=204)
def delete_existing_product(product_id: int, db: Session = Depends(get_db)):
    delete_product(product_id, db)

@router.post("/{product_id}/add_stock", response_model=ProductOut)
def add_product_stock(product_id: int, request: ProductAddStockRequest, db: Session = Depends(get_db)):
    return add_stock(product_id, request.quantity, db)

@router.post("/buy", response_model=List[ProductOut], status_code=200)
def buy_products(request: BuyItemsRequest, db: Session = Depends(get_db)):
    return buy_items(request.employee_id, request.products_to_buy, db)