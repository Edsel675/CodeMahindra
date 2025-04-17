from sqlalchemy import Column, String, Integer, Date, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid
from database import Base

class Employee(Base):
    __tablename__ = "employees"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    profileEpic = Column(String(255))
    nationality = Column(String(255))
    experience = Column(Integer)
    level = Column(Integer)
    firstName = Column(String(255))
    lastName = Column(String(255))
    birthDate = Column(Date)
    profilePicture = Column(String(255))
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    isAdmin = Column(Boolean, default=False)
    coins = Column(Integer, default=0)
    phoneNumber = Column(String(20))
    position_id = Column(Integer, ForeignKey("Position.id"))  # Coincide con __tablename__ en Position
    team_id = Column(Integer, ForeignKey("teams.id"))         # Coincide con __tablename__ en Team
