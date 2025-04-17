from sqlalchemy import Column, ForeignKey, DateTime, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from database import Base

class EmployeeProduct(Base):
    __tablename__ = "Employee_Product"

    employee_id = Column(UUID(as_uuid=True), ForeignKey("Employee.id"), primary_key=True)
    product_id = Column(Integer, ForeignKey("Product.id"), primary_key=True)
    purchaseDate = Column(DateTime, server_default=func.now())
