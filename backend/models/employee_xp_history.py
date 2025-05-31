from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class EmployeeXPHistory(Base):
    __tablename__ = "Employee_XP_History"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(UUID(as_uuid=True), ForeignKey("Employee.id", ondelete="CASCADE"), nullable=False)
    experience = Column(Integer, nullable=False)
    date = Column(DateTime, default=datetime.utcnow, nullable=False)

    employee = relationship("Employee", back_populates="xp_history")
