from sqlalchemy import Column, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from database import Base  # Assuming you have a Base from declarative_base()

class EmployeeProblem(Base):
    __tablename__ = "Employee_Problem"

    employee_id = Column(UUID(as_uuid=True), ForeignKey("Employee.id"), primary_key=True)
    problem_id = Column(Integer, ForeignKey("Problem.id"), primary_key=True)

    # Optional relationships (only if you need to access related objects)
    employee = relationship("Employee", back_populates="problems")
    problem = relationship("Problem", back_populates="employees")
