from pydantic import BaseModel, EmailStr, Field
from datetime import date

class UserCreate(BaseModel):
    name: str
    email: EmailStr  # Ensures the email is valid
    password: str  # No length constraint on the password

    class Config:
        from_attributes = True  # Updated for Pydantic v2
        
class ProjectCreate(BaseModel):
    project_name: str = Field(..., min_length=1, max_length=255)  # Project name with length constraints
    project_admin_id: int = Field(..., gt=0)  # Ensure project admin ID is a positive integer
    start_date: date  # Ensure start_date is a valid date
    end_date: date | None = None  # Optional end_date, can be None

    class Config:
        from_attributes = True  # Updated for Pydantic v2
