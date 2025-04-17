from sqlalchemy import Column, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from database import Base

class EmployeeAchievement(Base):
    __tablename__ = "Employee_Achievement"

    employee_id = Column(UUID(as_uuid=True), ForeignKey("Employee.id"), primary_key=True)
    achievement_id = Column(ForeignKey("Achievement.id"), primary_key=True)
    obtainedDate = Column(DateTime, server_default=func.now())
