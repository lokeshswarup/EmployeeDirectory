from pydantic import BaseModel
from datetime import date

class EmployeeBase(BaseModel):
    name: str
    age: int
    dob: date
    gender: str
    department: str

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeUpdate(EmployeeBase):
    pass

class Employee(EmployeeBase):
    id: int

    class Config:
        orm_mode = True
