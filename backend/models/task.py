from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from database import Base

class Task(Base):
    __tablename__ = "task"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    tasktype = Column(String(255))
    priority = Column(String(50))
    status = Column(String(50))
    estimatedtime = Column(Integer)
    affectedmodule = Column(String(255))
    tag = Column(String(255))
    reward = Column(Integer)
    employee_id = Column(UUID(as_uuid=True), ForeignKey("employees.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())