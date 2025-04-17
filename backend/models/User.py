from sqlalchemy import UUID, Column, Integer, String, Boolean
import uuid
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "Employee"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    firstName = Column(String(255))
    lastName = Column(String(255))
    phoneNumber = Column(String(20))
    nationality = Column(String(255))
    isAdmin = Column(Boolean, default=False)
    name = Column(String)