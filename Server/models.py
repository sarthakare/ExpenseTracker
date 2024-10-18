from sqlalchemy import Column, Integer, String, ForeignKey, Date, PrimaryKeyConstraint
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
    projects = relationship("Projects", back_populates="admin")

    # Projects a user is a member of
    member_projects = relationship("Members", back_populates="member")

    # Expenses added by the user
    expenses = relationship("Expenses", back_populates="member")


# Project model
class Projects(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    project_name = Column(String(255), nullable=False)
    project_admin_id = Column(Integer, ForeignKey("users.id"), nullable=False)  # ForeignKey from users table
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=True)  # Optional

    # Relationship to the User (admin)
    admin = relationship("User", back_populates="projects")

    # Members associated with this project
    members = relationship("Members", back_populates="project")

    # Expenses related to this project
    expenses = relationship("Expenses", back_populates="project")


# Members model (Association Table for Projects and Users)
class Members(Base):
    __tablename__ = "members"

    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    member_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # Set both project_id and member_id as primary key (composite primary key)
    __table_args__ = (
        PrimaryKeyConstraint("project_id", "member_id"),
    )

    # Relationship to the Project
    project = relationship("Projects", back_populates="members")

    # Relationship to the User
    member = relationship("User", back_populates="member_projects")


# Expenses model (Tracks expenses added by members to a project)
class Expenses(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)  # Unique identifier for each expense
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    member_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    expense_name = Column(String(255), nullable=False)
    amount = Column(Integer, nullable=False)
    expense_date = Column(Date, nullable=True)  # Ensure this is nullable

    # Relationship to the Project
    project = relationship("Projects", back_populates="expenses")

    # Relationship to the User (Member who added the expense)
    member = relationship("User", back_populates="expenses")

