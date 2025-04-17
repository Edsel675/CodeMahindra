from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.product import Product
from models.employee import Employee
from schemas.product import ProductCreate, ProductUpdate, ProductPurchase
from typing import List

def get_all_products(db: Session) -> List[Product]:
    return db.query(Product).all()

def get_product_by_id(product_id: int, db: Session) -> Product:
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

def create_product(data: ProductCreate, db: Session) -> Product:
    new_product = Product(**data.dict())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

def update_product(product_id: int, data: ProductUpdate, db: Session) -> Product:
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    for key, value in data.dict(exclude_unset=True).items():
        setattr(product, key, value)
    db.commit()
    db.refresh(product)
    return product

def delete_product(product_id: int, db: Session):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()

def add_stock(product_id: int, quantity_to_add: int, db: Session) -> Product:
    # Lock the row for update
    product = db.query(Product).filter(Product.id == product_id).with_for_update().first()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product.quantity += quantity_to_add
    db.commit()
    db.refresh(product)
    return product

def buy_items(employee_id: int, products_to_buy: List[ProductPurchase], db: Session) -> List[Product]:
    # Validate the products_to_buy list
    if not products_to_buy:
        raise HTTPException(status_code=400, detail="No products provided for purchase")

    # Extract product IDs and quantities from the input
    product_ids = [item.product_id for item in products_to_buy]
    quantities_to_buy = [item.quantity_to_buy for item in products_to_buy]

    # Lock the rows for the given product IDs
    products = (
        db.query(Product)
        .filter(Product.id.in_(product_ids))
        .with_for_update()
        .all()
    )

    # Map product.id -> product for quick lookup
    product_map = {product.id: product for product in products}

    # Validate all products exist
    if len(product_map) != len(product_ids):
        raise HTTPException(status_code=404, detail="One or more products not found")

    # Store new quantities temporarily
    new_quantities = {}

    # Calculate total cost
    total_cost = 0
    for pid, qty in zip(product_ids, quantities_to_buy):
        product = product_map[pid]
        new_quantity = product.quantity - qty
        if new_quantity < 0:
            raise HTTPException(status_code=400, detail=f"Insufficient stock for product ID {pid}")
        new_quantities[pid] = new_quantity
        total_cost += product.price * qty  # Calculate total cost

    # Lock the employee's row for update to check coins balance
    employee = db.query(Employee).filter(Employee.id == employee_id).with_for_update().first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    if employee.coins < total_cost:
        raise HTTPException(status_code=400, detail="Insufficient coins to complete the purchase")

    # Deduct coins from the employee's account
    employee.coins -= total_cost

    # All checks passed, now update product quantities
    for pid, new_qty in new_quantities.items():
        product_map[pid].quantity = new_qty

    db.commit()

    return list(products)
