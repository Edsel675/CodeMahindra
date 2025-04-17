from pydantic import BaseModel
from uuid import UUID

class EmployeeCommentBase(BaseModel):
    employee_id: UUID
    comment_id: int

class EmployeeCommentCreate(EmployeeCommentBase):
    pass

class EmployeeCommentOut(EmployeeCommentBase):
    class Config:
        from_attributes = True
