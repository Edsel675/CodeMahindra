from sqlalchemy import Column, Integer, String, Text, Float, DateTime
from sqlalchemy.sql import func
from database import Base

class Problem(Base):
    __tablename__ = "Problem"

    id = Column(Integer, primary_key=True, index=True)
    reward = Column(Integer)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    input_format = Column(Text, nullable=False)
    output_format = Column(Text, nullable=False)
    sample_input = Column(Text, nullable=False)
    sample_output = Column(Text, nullable=False)
    difficulty = Column(String(50))
    acceptance = Column(Float)
    creationDate = Column(DateTime, server_default=func.now())
    expirationDate = Column(DateTime)
    solution = Column(Text)
