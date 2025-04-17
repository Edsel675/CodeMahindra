from sqlalchemy import Column, Integer, Text, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from database import Base

class Suggestion(Base):
    __tablename__ = "Suggestion"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(Text)
    comment = Column(Text)
    path = Column(String(255))
    suggestionDate = Column(DateTime, server_default=func.now())
    employee_id = Column(UUID(as_uuid=True), ForeignKey("Employee.id"))
