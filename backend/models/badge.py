from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from database import Base

class Badge(Base):
    __tablename__ = "Badge"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    image = Column(String(255))
    creationDate = Column(DateTime, server_default=func.now())
