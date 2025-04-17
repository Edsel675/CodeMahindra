from sqlalchemy import Column, ForeignKey, String, Text, Float, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from database import Base

class Solution(Base):
    __tablename__ = "Solution"

    employee_id = Column(UUID(as_uuid=True), ForeignKey("Employee.id"), primary_key=True)
    problem_id = Column(ForeignKey("Problem.id"), primary_key=True)
    submissionDate = Column(DateTime, server_default=func.now())
    status = Column(String(50))
    code = Column(Text)
    executionTime = Column(Float)
    memory = Column(Float)
    inTeam = Column(Boolean)
    language = Column(String(50))
