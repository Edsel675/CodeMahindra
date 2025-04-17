from sqlalchemy import Column, Integer, String, DateTime
from database import Base

class Team(Base):
    __tablename__ = "teams"  

    id = Column(Integer, primary_key=True, index=True)
    creationDate = Column(DateTime)
    terminationDate = Column(DateTime)
    experience = Column(Integer)
    level = Column(Integer)
    name = Column(String(255))
