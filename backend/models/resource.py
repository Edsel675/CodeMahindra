from sqlalchemy import Column, Integer, String, Text
from database import Base

class Resource(Base):
    __tablename__ = "Resource"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    url = Column(String(255))
    resourceType = Column(String(255))
