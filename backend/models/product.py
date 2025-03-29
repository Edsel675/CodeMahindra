from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from database import Base

class Product(Base):
    __tablename__ = "Product"

    id = Column(Integer, primary_key=True, index=True)
    image = Column(String(255))
    name = Column(String(255), nullable=False)
    price = Column(Integer)
    publishDate = Column(DateTime, server_default=func.now())
    description = Column(Text)
    quantity = Column(Integer)
