from sqlalchemy import Column, Integer, TIMESTAMP, ForeignKey, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from database import Base

class Purchase(Base):
    __tablename__ = "Purchase"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(TIMESTAMP, nullable=False)

    products = relationship("PurchaseProduct", back_populates="purchase", cascade="all, delete")


class PurchaseProduct(Base):
    __tablename__ = "Purchase_Product"
    purchase_id = Column(Integer, ForeignKey("Purchase.id", ondelete="CASCADE"), primary_key=True)
    employee_id = Column(UUID(as_uuid=True), ForeignKey("Employee.id", ondelete="CASCADE"), primary_key=True)
    product_id = Column(Integer, ForeignKey("Product.id", ondelete="CASCADE"), primary_key=True)
    count = Column(Integer, nullable=False)
    delivered = Column(Boolean, default=False)

    purchase = relationship("Purchase", back_populates="products")
    employee = relationship("Employee", back_populates="purchase_products")
    product = relationship("Product", back_populates="purchase_products")
