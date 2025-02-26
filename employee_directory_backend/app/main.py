from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from typing import List
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "https://employee-directory-sage.vercel.app",  # Adjust this to match your frontend's URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = "mongodb+srv://harshraghvani697:Harsh8118198@cluster0.hil3c.mongodb.net/"
client = AsyncIOMotorClient(DATABASE_URL)
db = client.employee_database

def object_id_str(value: str) -> ObjectId:
    if not ObjectId.is_valid(value):
        raise ValueError("Invalid ObjectId")
    return ObjectId(value)

class Employee(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    name: str
    age: int
    dob: datetime
    gender: str
    department: str

    class Config:
        allow_population_by_field_name = True
        json_encoders = {ObjectId: str, datetime: lambda v: v.isoformat()}

class EmployeeCreate(BaseModel):
    name: str
    age: int
    dob: datetime
    gender: str
    department: str

class EmployeeUpdate(BaseModel):
    name: str
    age: int
    dob: datetime
    gender: str
    department: str

@app.post("/employees/", response_model=Employee)
async def create_employee(employee: EmployeeCreate):
    print(employee)
    employee_dict = employee.dict()
    employee_dict["_id"] = str(ObjectId())
    result = await db["employees"].insert_one(employee_dict)
    created_employee = await db["employees"].find_one({"_id": result.inserted_id})
    return created_employee

@app.get("/employees/", response_model=List[Employee])
async def read_employees(skip: int = 0, limit: int = 10):
    employees = await db["employees"].find().skip(skip).limit(limit).to_list(length=limit)
    return employees

@app.put("/employees/{employee_id}", response_model=Employee)
async def update_employee(employee_id: str, employee: EmployeeUpdate):
    try:
        update_result = await db["employees"].update_one({"_id": employee_id}, {"$set": employee.dict()})
        if update_result.modified_count == 1:
            updated_employee = await db["employees"].find_one({"_id": employee_id})
            if updated_employee is not None:
                return updated_employee
        existing_employee = await db["employees"].find_one({"_id": employee_id})
        if existing_employee is not None:
            return existing_employee
    except Exception as e:
        print(f"Error updating employee: {e}")
    raise HTTPException(status_code=404, detail="Employee not found")

@app.delete("/employees/{employee_id}")
async def delete_employee(employee_id: str):
    try:
        # employee_id = object_id_str(employee_id)
        delete_result = await db["employees"].delete_one({"_id": employee_id})
        if delete_result.deleted_count == 1:
            return {"message": "Employee deleted successfully"}
    except Exception as e:
        print(f"Error deleting employee: {e}")
    raise HTTPException(status_code=404, detail="Employee not found")
