from sqlalchemy import Column, Integer, ForeignKey
from database import Base

class ProblemTopic(Base):
    __tablename__ = "Problem_Topic"

    topic_id = Column(Integer, ForeignKey("Topic.id"), primary_key=True)
    problem_id = Column(Integer, ForeignKey("Problem.id"), primary_key=True)
