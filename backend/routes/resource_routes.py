from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from database import get_db
from controllers.resource_controller import (
    get_all_resources,
    get_resource_by_id,
    create_resource,
    update_resource,
    delete_resource
)
from schemas.resource import ResourceCreate, ResourceUpdate, ResourceOut

router = APIRouter(prefix="/resources", tags=["Resources"])

@router.get("/", response_model=List[ResourceOut])
def list_resources(db: Session = Depends(get_db)):
    return get_all_resources(db)

@router.get("/{resource_id}", response_model=ResourceOut)
def retrieve_resource(resource_id: int, db: Session = Depends(get_db)):
    return get_resource_by_id(resource_id, db)

@router.post("/", response_model=ResourceOut, status_code=201)
def create_new_resource(data: ResourceCreate, db: Session = Depends(get_db)):
    return create_resource(data, db)

@router.put("/{resource_id}", response_model=ResourceOut)
def update_existing_resource(resource_id: int, data: ResourceUpdate, db: Session = Depends(get_db)):
    return update_resource(resource_id, data, db)

@router.delete("/{resource_id}", status_code=204)
def delete_existing_resource(resource_id: int, db: Session = Depends(get_db)):
    delete_resource(resource_id, db)
