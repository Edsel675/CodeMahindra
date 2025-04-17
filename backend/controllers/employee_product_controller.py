from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.employee_product import EmployeeProduct
from schemas.employee_product import EmployeeProductCreate
from typing import List

def get_all_employee_products(db: Session) -> List[EmployeeProduct]:
    return db.query(EmployeeProduct).all()

def get_employee_product(employee_id, product_id, db: Session) -> EmployeeProduct:
    record = db.query(EmployeeProduct).filter(
        EmployeeProduct.employee_id == employee_id,
        EmployeeProduct.product_id == product_id
    ).first()
    if not record:
        raise HTTPException(status_code=404, detail="Purchase not found")
    return record

def create_employee_product(data: EmployeeProductCreate, db: Session) -> EmployeeProduct:
    existing = db.query(EmployeeProduct).filter(
        EmployeeProduct.employee_id == data.employee_id,
        EmployeeProduct.product_id == data.product_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Product already purchased")
    record = EmployeeProduct(**data.dict())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record

def delete_employee_product(employee_id, product_id, db: Session):
    record = db.query(EmployeeProduct).filter(
        EmployeeProduct.employee_id == employee_id,
        EmployeeProduct.product_id == product_id
    ).first()
    if not record:
        raise HTTPException(status_code=404, detail="Purchase not found")
    db.delete(record)
    db.commit()
