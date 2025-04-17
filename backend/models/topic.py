from sqlalchemy import Column, Integer, String
from database import Base

class Topic(Base):
    __tablename__ = "Topic"

    id = Column(Integer, primary_key=True, index=True)
    topicName = Column(String(255), nullable=False)
