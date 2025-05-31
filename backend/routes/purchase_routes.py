from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas import purchase as schemas
from controllers import purchase_controller as crud
from database import get_db

router = APIRouter(prefix="/purchases", tags=["Purchases"])

# Purchase endpoints
@router.post("/", response_model=schemas.PurchaseOut)
def create_purchase(purchase: schemas.PurchaseCreate, db: Session = Depends(get_db)):
    return crud.create_purchase(db, purchase)

@router.get("/", response_model=list[schemas.PurchaseOut])
def read_purchases(db: Session = Depends(get_db)):
    return crud.get_all_purchases(db)

@router.delete("/{purchase_id}", response_model=schemas.PurchaseOut)
def delete_purchase(purchase_id: int, db: Session = Depends(get_db)):
    purchase = crud.delete_purchase(db, purchase_id)
    if not purchase:
        raise HTTPException(status_code=404, detail="Purchase not found")
    return purchase


# PurchaseProduct endpoints
@router.post("/items/", response_model=schemas.PurchaseProductOut)
def create_purchase_product(item: schemas.PurchaseProductCreate, db: Session = Depends(get_db)):
    return crud.create_purchase_product(db, item)

@router.get("/items/", response_model=list[schemas.PurchaseProductOut])
def read_purchase_products(db: Session = Depends(get_db)):
    return crud.get_purchase_products(db)

@router.delete("/items/")
def delete_purchase_product(
    purchase_id: int, employee_id: str, product_id: int, db: Session = Depends(get_db)
):
    item = crud.delete_purchase_product(db, purchase_id, employee_id, product_id)
    if not item:
        raise HTTPException(status_code=404, detail="PurchaseProduct not found")
    return {"message": "Deleted successfully"}

@router.get("/details/", response_model=list[schemas.PurchaseDetail])
def read_purchase_details(db: Session = Depends(get_db)):
    return crud.get_purchase_details(db)

@router.put("/items/")
def update_delivery_status(data: schemas.UpdateDeliveryStatus, db: Session = Depends(get_db)):
    product = crud.mark_product_as_delivered(db, data.purchase_id, data.employee_id, data.product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Delivery status updated", "product_id": data.product_id}