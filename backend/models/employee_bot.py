from sqlalchemy import Column, ForeignKey, Boolean, DateTime, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from database import Base

class EmployeeBot(Base):
    __tablename__ = "Employee_Bot"

    employee_id = Column(UUID(as_uuid=True), ForeignKey("Employee.id"), primary_key=True)
    bot_id = Column(Integer, ForeignKey("Bot.id"), primary_key=True)
    isEquipped = Column(Boolean, default=False)
    purchaseDate = Column(DateTime, server_default=func.now())
