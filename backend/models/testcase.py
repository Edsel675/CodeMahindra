from sqlalchemy import Column, Integer, Text, ForeignKey
from database import Base

class TestCase(Base):
    __tablename__ = "TestCase"

    id = Column(Integer, primary_key=True, index=True)
    input = Column(Text)
    output = Column(Text)
    problem_id = Column(Integer, ForeignKey("Problem.id"))
