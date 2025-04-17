from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os
import sys

# Load environment variables from .env file
load_dotenv()

# Get the DATABASE_URL from environment
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    print("❌ DATABASE_URL is not set in .env file.")
    sys.exit(1)

# Create engine
engine = create_engine(
    DATABASE_URL,
    pool_size=20,             # Pool size
    max_overflow=20,          # Max overflow connections
    pool_timeout=30,          # Timeout after 30 seconds
    pool_recycle=3600,        # Recycle connections every hour
    pool_pre_ping=True        # Enable connection pre-ping to avoid stale connections
)


# Create session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# Database connection test
try:
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))
        print("✅ Database connection successful!")
except Exception as e:
    print("❌ Database connection failed:")
    print(e)
    sys.exit(1)

# Dependency for FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
