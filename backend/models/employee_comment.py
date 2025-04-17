from sqlalchemy import Column, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from database import Base

class EmployeeComment(Base):
    __tablename__ = "Employee_Comment"

    employee_id = Column(UUID(as_uuid=True), ForeignKey("Employee.id"), primary_key=True)
    comment_id = Column(Integer, ForeignKey("Comment.id"), primary_key=True)
