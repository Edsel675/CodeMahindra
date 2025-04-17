from sqlalchemy import Column, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from database import Base

class EmployeeBadge(Base):
    __tablename__ = "Employee_Badge"

    employee_id = Column(UUID(as_uuid=True), ForeignKey("Employee.id"), primary_key=True)
    badge_id = Column(ForeignKey("Badge.id"), primary_key=True)
    obtainedDate = Column(DateTime, server_default=func.now())
