
# Employee Directory System

This is a simple Employee Directory System built using FastAPI for the backend and React for the frontend. The application allows you to perform CRUD (Create, Read, Update, Delete) operations on employee data stored in a MongoDB database.

## Project link:

- Backend: https://employeedirectory-931t.onrender.com
- Frontend: https://employee-directory-sage.vercel.app/

## Features

- Add a new employee
- View a list of employees
- Edit an existing employee
- Delete an employee

## Technologies Used

### Backend

- FastAPI
- MongoDB
- Motor (async MongoDB driver)
- Pydantic
- CORS Middleware

### Frontend

- React
- Material-UI
- Axios

## Getting Started

### Prerequisites

- Python 3.7+
- Node.js & npm
- MongoDB

### Backend Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/lokeshswarup/EmployeeDirectory
   cd employee_directory_backend
   ```

2. Create a virtual environment and activate it:

   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required Python packages:

   ```sh
   pip install -r requirements.txt
   ```

4. Update the `DATABASE_URL` in `main.py` with your MongoDB connection string.

5. Run the FastAPI server:

   ```sh
   uvicorn main:app --reload
   ```

   The backend server should now be running at `http://127.0.0.1:8000`.

### Frontend Setup

1. Navigate to the frontend directory:

   ```sh
   cd ../employee_directory_frontend
   ```

2. Install the required npm packages:

   ```sh
   npm install
   ```

3. Start the React development server:

   ```sh
   npm start
   ```

   The frontend server should now be running at `http://localhost:3000`.

## API Endpoints

- `POST /employees/`: Create a new employee
- `GET /employees/`: Retrieve a list of employees
- `PUT /employees/{employee_id}`: Update an existing employee
- `DELETE /employees/{employee_id}`: Delete an employee

## Project Structure

### Backend

```
backend/
├── main.py
├── requirements.txt
└── ...
```

### Frontend

```
frontend/
├── src/
│   ├── components/
│   │   └── EmployeeTable.js
│   ├── App.js
│   └── index.js
├── package.json
└── ...
```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Use the "Add Employee" button to add a new employee.
3. View the list of employees.
4. Use the edit and delete icons to update or remove an employee.

## Troubleshooting

- Ensure that both the backend and frontend servers are running.
- Check the browser console and terminal for any error messages.
- Verify that the MongoDB connection string is correct.

