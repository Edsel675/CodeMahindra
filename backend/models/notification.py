from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from database import Base

class Notification(Base):
    __tablename__ = "Notification"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    employee_id = Column(UUID(as_uuid=True), ForeignKey("Employee.id"))
