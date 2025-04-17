from sqlalchemy import Column, Integer, ForeignKey
from database import Base

class SuggestionResource(Base):
    __tablename__ = "Suggestion_Resource"

    suggestion_id = Column(Integer, ForeignKey("Suggestion.id"), primary_key=True)
    resource_id = Column(Integer, ForeignKey("Resource.id"), primary_key=True)
