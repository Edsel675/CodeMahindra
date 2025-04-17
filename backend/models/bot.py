from sqlalchemy import Column, Integer, String, Text
from database import Base

class Bot(Base):
    __tablename__ = "Bot"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    image = Column(String(255))
    price = Column(Integer)
