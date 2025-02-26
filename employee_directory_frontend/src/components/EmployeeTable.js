import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const columns = (editEmployee, deleteEmployee) => [
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'age', headerName: 'Age', width: 100 },
  { field: 'dob', headerName: 'DOB', width: 150 },
  { field: 'gender', headerName: 'Gender', width: 120 },
  { field: 'department', headerName: 'Department', width: 150 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => (
      <>
        <IconButton onClick={() => editEmployee(params.row)}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => deleteEmployee(params.row.id)}>
          <Delete />
        </IconButton>
      </>
    ),
  },
];

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState({ name: '', age: '', dob: '', gender: '', department: '' });
  const [editMode, setEditMode] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await axios.get('https://employeedirectory-931t.onrender.com/employees');
    setEmployees(response.data.map(employee => ({
      ...employee,
      id: employee._id, // Use MongoDB _id as the row id
      dob: new Date(employee.dob).toISOString().split('T')[0] // Format date for display
    })));
  };

  const handleAdd = () => {
    setEditMode(false);
    setEmployeeData({ name: '', age: '', dob: '', gender: '', department: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await axios.put(`https://employeedirectory-931t.onrender.com/employees/${selectedEmployeeId}`, employeeData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } else {
        await axios.post('https://employeedirectory-931t.onrender.com/employees', employeeData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      setOpen(false);
      fetchEmployees();
    } catch (error) {
      console.error("Error submitting employee data:", error);
    }
  };

  const editEmployee = (employee) => {
    setEditMode(true);
    setSelectedEmployeeId(employee.id);
    setEmployeeData(employee);
    setOpen(true);
  };

  const deleteEmployee = async (id) => {
    await axios.delete(`https://employeedirectory-931t.onrender.com/employees/${id}`);
    fetchEmployees();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleAdd}>
        Add Employee
      </Button>
      <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
        <DataGrid rows={employees} columns={columns(editEmployee, deleteEmployee)} pageSize={5} getRowId={(row) => row.id} />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={employeeData.name}
            onChange={(e) => setEmployeeData({ ...employeeData, name: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Age"
            type="number"
            value={employeeData.age}
            onChange={(e) => setEmployeeData({ ...employeeData, age: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="DOB"
            type="date"
            value={employeeData.dob}
            onChange={(e) => setEmployeeData({ ...employeeData, dob: e.target.value })}
            fullWidth
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Gender"
            value={employeeData.gender}
            onChange={(e) => setEmployeeData({ ...employeeData, gender: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Department"
            value={employeeData.department}
            onChange={(e) => setEmployeeData({ ...employeeData, department: e.target.value })}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeTable;
