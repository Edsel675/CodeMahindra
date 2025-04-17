from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.notification import Notification
from schemas.notification import NotificationCreate, NotificationUpdate
from typing import List

def get_all_notifications(db: Session) -> List[Notification]:
    return db.query(Notification).all()

def get_notification_by_id(notification_id: int, db: Session) -> Notification:
    notification = db.query(Notification).filter(Notification.id == notification_id).first()
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    return notification

def create_notification(data: NotificationCreate, db: Session) -> Notification:
    new_notification = Notification(**data.dict())
    db.add(new_notification)
    db.commit()
    db.refresh(new_notification)
    return new_notification

def update_notification(notification_id: int, data: NotificationUpdate, db: Session) -> Notification:
    notification = db.query(Notification).filter(Notification.id == notification_id).first()
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    for key, value in data.dict(exclude_unset=True).items():
        setattr(notification, key, value)
    db.commit()
    db.refresh(notification)
    return notification

def delete_notification(notification_id: int, db: Session):
    notification = db.query(Notification).filter(Notification.id == notification_id).first()
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    db.delete(notification)
    db.commit()
