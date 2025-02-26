import React from 'react';
import { Container, Typography } from '@mui/material';
import EmployeeTable from './components/EmployeeTable';

function App() {
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Employee Directory
      </Typography>
      <EmployeeTable />
    </Container>
  );
}

export default App;
