from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.resource import Resource
from schemas.resource import ResourceCreate, ResourceUpdate
from typing import List

def get_all_resources(db: Session) -> List[Resource]:
    return db.query(Resource).all()

def get_resource_by_id(resource_id: int, db: Session) -> Resource:
    resource = db.query(Resource).filter(Resource.id == resource_id).first()
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")
    return resource

def create_resource(data: ResourceCreate, db: Session) -> Resource:
    new_resource = Resource(**data.dict())
    db.add(new_resource)
    db.commit()
    db.refresh(new_resource)
    return new_resource

def update_resource(resource_id: int, data: ResourceUpdate, db: Session) -> Resource:
    resource = db.query(Resource).filter(Resource.id == resource_id).first()
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")
    for key, value in data.dict(exclude_unset=True).items():
        setattr(resource, key, value)
    db.commit()
    db.refresh(resource)
    return resource

def delete_resource(resource_id: int, db: Session):
    resource = db.query(Resource).filter(Resource.id == resource_id).first()
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")
    db.delete(resource)
    db.commit()
