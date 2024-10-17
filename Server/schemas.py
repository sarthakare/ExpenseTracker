from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    name: str
    email: EmailStr  # Ensures the email is valid
    password: str  # No length constraint on the password

    class Config:
        from_attributes = True  # Updated for Pydantic v2
