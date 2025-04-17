from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from controllers.employee_product_controller import (
    get_all_employee_products,
    get_employee_product,
    create_employee_product,
    delete_employee_product
)
from schemas.employee_product import EmployeeProductCreate, EmployeeProductOut
from database import get_db

router = APIRouter(prefix="/employee-products", tags=["Employee-Products"])

@router.get("/", response_model=List[EmployeeProductOut])
def list_employee_products(db: Session = Depends(get_db)):
    return get_all_employee_products(db)

@router.get("/{employee_id}/{product_id}", response_model=EmployeeProductOut)
def retrieve_employee_product(employee_id: UUID, product_id: int, db: Session = Depends(get_db)):
    return get_employee_product(employee_id, product_id, db)

@router.post("/", response_model=EmployeeProductOut, status_code=201)
def create_employee_product_link(data: EmployeeProductCreate, db: Session = Depends(get_db)):
    return create_employee_product(data, db)

@router.delete("/{employee_id}/{product_id}", status_code=204)
def delete_employee_product_link(employee_id: UUID, product_id: int, db: Session = Depends(get_db)):
    delete_employee_product(employee_id, product_id, db)
