import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import Bar from "../Bar";
import AdminSidebar from "./AdminSidebar";
import { getRequests, rejectRequest, acceptRequest } from "../../Services/admin"; 

const columns = [
  { width: 150, label: "Name", dataKey: "Name" },
  { width: 200, label: "Email", dataKey: "Email" },
  { width: 150, label: "Department", dataKey: "Department" },
  { width: 150, label: "DOB", dataKey: "DOB" },
  { width: 100, label: "Accept", dataKey: "Accept" },
  { width: 100, label: "Reject", dataKey: "Reject" },
];

const AdminViewReq = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const result = await getRequests();
      console.log("API Response:", result);

      // Ensure that the result is an array before calling map
      if (Array.isArray(result)) {
        const transformedData = result.map((user) => ({
          Name: `${user.firstName} ${user.lastName}`,
          Email: user.email,
          Department: user.department,
          DOB: user.dob,
          status: user.status, 
          id: user.id, 
        }));

        setRows(transformedData);
      } else {
        console.error("Expected result to be an array, but got:", result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAccept = async (index) => {
    const userId = rows[index].id;
    try {
      const result = await acceptRequest(userId);
      console.log(`Accepted: ${rows[index].userId}`);

      const updatedRows = [...rows];
      updatedRows[index].status = "ACCEPTED"; 
      setRows(updatedRows); 
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleReject = async (index) => {
    const userId = rows[index].id;
    try {
      const result = await rejectRequest(userId);
      console.log(`Rejected: ${rows[index].userId}`);

      const updatedRows = [...rows];
      updatedRows[index].status = "REJECTED"; 
      setRows(updatedRows); 
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <>
      <Bar />
      <AdminSidebar />
      <div
        style={{
          marginTop: "60px",
          background: "#D3C5E5",
          marginLeft: "240px",
          height: "100vh",
          width: `calc(100% - 240px)`,
        }}
      >
        <h2 style={{ textAlign: "center", marginBlock: "6px", paddingBlock: "20px" }}>
          View Employee
        </h2>

        <TableContainer component={Paper} style={{ maxHeight: 280, overflow: "auto" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.dataKey}
                    style={{
                      width: column.width,
                      backgroundColor: "#735DA5",
                      fontWeight: "bold",
                      color: "white",
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
                  {columns.map((column) =>
                    column.dataKey === "Accept" ? (
                      <TableCell key={column.dataKey}>
                        {row.status === "ACCEPTED" ? (
                          <span>Accepted</span> 
                        ) : (
                          <Button variant="contained" color="primary" onClick={() => handleAccept(index)}>
                            Accept
                          </Button> 
                        )}
                      </TableCell>
                    ) : column.dataKey === "Reject" ? (
                      <TableCell key={column.dataKey}>
                        {row.status === "REJECTED" ? (
                          <span>Rejected</span> 
                        ) : (
                          <Button variant="contained" color="secondary" onClick={() => handleReject(index)}>
                            Reject
                          </Button> 
                        )}
                      </TableCell>
                    ) : (
                      <TableCell key={column.dataKey}>
                        {row[column.dataKey]}
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default AdminViewReq;
