from pydantic import BaseModel
from typing import Optional

class ResourceBase(BaseModel):
    title: str
    description: Optional[str] = None
    url: Optional[str] = None
    resourceType: Optional[str] = None

class ResourceCreate(ResourceBase):
    pass

class ResourceUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    url: Optional[str] = None
    resourceType: Optional[str] = None

class ResourceOut(ResourceBase):
    id: int

    class Config:
        from_attributes = True
