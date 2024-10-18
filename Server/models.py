# models.py
from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship
from base import Base

# User model
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    email = Column(String(255), unique=True, index=True)
    password = Column(String(60))

    # Projects related to the user
    projects = relationship("Projects", back_populates="admin")  # Use string 'Projects'

# Project model
class Projects(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    project_name = Column(String(255), nullable=False)
    project_admin_id = Column(Integer, ForeignKey("users.id"), nullable=False)  # ForeignKey from users table
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=True)  # Optional

    # Relationship to the User (admin)
    admin = relationship("User", back_populates="projects")  # Use string 'User'
