import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import Bar from '../Bar';
import AdminSidebar from './AdminSidebar';
import { acceptWorker, deleteWorker } from '../../Services/admin'; // Ensure deleteWorker is correctly defined.

const columns = [
  { width: 150, label: 'Name', dataKey: 'Name' },
  { width: 200, label: 'Email', dataKey: 'Email' },
  { width: 150, label: 'Department', dataKey: 'Department' },
  { width: 150, label: 'DOB', dataKey: 'DOB' },
  { width: 100, label: 'Delete', dataKey: 'Delete' }, // Delete column
];

const AdminViewManager = () => {
  const [rows, setRows] = useState([]);

  // Fetch data from API when component mounts
  useEffect(() => {
    fetchRequests();
  }, []);

  // Delete the worker by id
  const handleDelete = async (index) => {
    const userId = rows[index].id;
    try {
   
      const result = await deleteWorker(userId);
      console.log("Deleted User ID:", rows[index].id);

      // After successful deletion, remove the user from the rows array
      const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index); // This will filter out the deleted row
      setRows(updatedRows);  // Update the rows state
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  // Fetch the list of workers from the backend
  const fetchRequests = async () => {
    try {
      const result = await acceptWorker(); 
      console.log(result);

      if (result && Array.isArray(result)) {
        const transformedData = result.map((user) => ({
          Name: `${user.firstName} ${user.lastName}`,
          Email: user.email,
          Department: user.department,
          DOB: user.dob,
          id: user.id,
        }));
        setRows(transformedData);  // Set the data in state
      } else {
        console.error("Unexpected API Response:", result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Bar />
      <AdminSidebar />
      <div
        style={{
          marginTop: '60px',
          background: "#D3C5E5",
          marginLeft: '240px',
          height: "100vh",
          width: `calc(100% - 240px)`,
        }}
      >
        <h2 style={{ textAlign: 'center', marginBlock: '6px', paddingBlock: "20px" }}>
          Accepted Employee
        </h2>

        <TableContainer component={Paper} style={{ maxHeight: 280, overflow: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.dataKey}
                    style={{
                      width: column.width,
                      backgroundColor: '#735DA5',
                      fontWeight: 'bold',
                      color: 'white',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody style={{ background: "#C4DAD2" }}>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.dataKey}>
                      {column.dataKey === 'Delete' ? (
                        <Button variant="contained" color="error" onClick={() => handleDelete(index)}>
                          Delete
                        </Button>
                      ) : (
                        row[column.dataKey] || "-"
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default AdminViewManager;
