from fastapi import Depends
from sqlalchemy.orm import Session
from database import get_db
from models import purchase as models
from schemas import purchase as schemas


# Purchase CRUD
def create_purchase(db: Session, purchase: schemas.PurchaseCreate):
    db_purchase = models.Purchase(**purchase.dict())
    db.add(db_purchase)
    db.commit()
    db.refresh(db_purchase)
    return db_purchase

def get_all_purchases(db: Session):
    return db.query(models.Purchase).all()

def get_purchase(db: Session, purchase_id: int):
    return db.query(models.Purchase).filter(models.Purchase.id == purchase_id).first()

def delete_purchase(db: Session, purchase_id: int):
    db_purchase = get_purchase(db, purchase_id)
    if db_purchase:
        db.delete(db_purchase)
        db.commit()
    return db_purchase


# PurchaseProduct CRUD
def create_purchase_product(db: Session, item: schemas.PurchaseProductCreate):
    db_item = models.PurchaseProduct(**item.dict())
    db.add(db_item)
    db.commit()
    return db_item

def get_purchase_products(db: Session):
    return db.query(models.PurchaseProduct).all()

def delete_purchase_product(db: Session, purchase_id: int, employee_id, product_id: int):
    item = db.query(models.PurchaseProduct).filter_by(
        purchase_id=purchase_id,
        employee_id=employee_id,
        product_id=product_id
    ).first()
    if item:
        db.delete(item)
        db.commit()
    return item

def get_purchase_details(db: Session = Depends(get_db)):
    purchases = db.query(models.Purchase).all()
    result = []

    for purchase in purchases:
        # Get all purchase_products for this purchase
        purchase_products = purchase.products

        # Skip if no products or if all are delivered
        if not purchase_products or all(pp.delivered for pp in purchase_products):
            continue

        # Get employee from first product's relationship
        first_product = purchase_products[0]
        employee = first_product.employee if hasattr(first_product, "employee") else None

        if not employee:
            continue  # Skip if we can't get the employee info

        # Build the list of product summaries
        products = [
            schemas.ProductInPurchase(
                product_id=pp.product.id,
                name=pp.product.name,
                image=pp.product.image,
                quantity = pp.count,
                delivered = pp.delivered
            )
            for pp in purchase_products
        ]

        purchase_data = schemas.PurchaseDetail(
            purchase_date=purchase.date,
            purchase_id=purchase.id,
            employee_id=employee.id,
            profileEpic=employee.profileEpic,
            firstName=employee.firstName,
            lastName=employee.lastName,
            products=products
        )

        result.append(purchase_data)

    return result

def mark_product_as_delivered(db: Session, purchase_id: int, employee_id: str, product_id: int):
    product = db.query(models.PurchaseProduct).filter_by(
        purchase_id=purchase_id,
        employee_id=employee_id,
        product_id=product_id
    ).first()

    if product:
        product.delivered = True
        db.commit()
        db.refresh(product)
        return product

    return None

