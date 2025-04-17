from sqlalchemy import Column, Integer, String
from database import Base

class Position(Base):
    __tablename__ = "Position"  # Mayúscula inicial para ForeignKey en Employee

    id = Column(Integer, primary_key=True, index=True)
    positionName = Column(String(255), nullable=False)
