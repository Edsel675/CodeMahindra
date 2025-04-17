from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from database import get_db
from controllers.notification_controller import (
    get_all_notifications,
    get_notification_by_id,
    create_notification,
    update_notification,
    delete_notification
)
from schemas.notification import NotificationCreate, NotificationUpdate, NotificationOut

router = APIRouter(prefix="/notifications", tags=["Notifications"])

@router.get("/", response_model=List[NotificationOut])
def list_notifications(db: Session = Depends(get_db)):
    return get_all_notifications(db)

@router.get("/{notification_id}", response_model=NotificationOut)
def retrieve_notification(notification_id: int, db: Session = Depends(get_db)):
    return get_notification_by_id(notification_id, db)

@router.post("/", response_model=NotificationOut, status_code=201)
def create_new_notification(data: NotificationCreate, db: Session = Depends(get_db)):
    return create_notification(data, db)

@router.put("/{notification_id}", response_model=NotificationOut)
def update_existing_notification(notification_id: int, data: NotificationUpdate, db: Session = Depends(get_db)):
    return update_notification(notification_id, data, db)

@router.delete("/{notification_id}", status_code=204)
def delete_existing_notification(notification_id: int, db: Session = Depends(get_db)):
    delete_notification(notification_id, db)
