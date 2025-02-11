import React, { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box,
  Toolbar, Dialog, DialogTitle, DialogContent, DialogActions, Typography
} from "@mui/material";
import Bar from "../Bar";
import ManagerSidebar from "./ManagerSidebar";
import { getPendingTask, approveRequests, rejectRequest } from '../../Services/manager';
import { jwtDecode } from "jwt-decode";
import FileDisplay from "../File";  

const columns = [
  { width: 100, label: "Title", dataKey: "Title" },
  { width: 150, label: "Description", dataKey: "Description" },
  { width: 100, label: "Priority", dataKey: "Priority" },
  { width: 150, label: "Assigned to", dataKey: "Assignedto" },
  { width: 130, label: "End Date", dataKey: "Enddate" },
];

export default function ManagerTaskApproval() {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskRows, setTaskRows] = useState([]);
  const [showFile, setShowFile] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleOpen = (task) => {
    setSelectedTask(task);
    setOpen(true);
    setShowFile(false); // Reset file view state
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTask(null);
    setShowFile(false);
  };

  const rejectHandler = async () => {
    if (!selectedTask) return;
    try {
      await rejectRequest(selectedTask.Taskid);
     // console.log("Task Rejected:", selectedTask.Taskid);
      handleClose();
      fetchTasks();
    } catch (error) {
      console.error("Error rejecting task:", error);
    }
  };

  const acceptHandler = async () => {
    if (!selectedTask) return;
    try {
      await approveRequests(selectedTask.Taskid);
     // console.log("Task Approved:", selectedTask.Taskid);
      handleClose();
      fetchTasks();
    } catch (error) {
      console.error("Error approving task:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const decoded = jwtDecode(token);
      const managerId = decoded?.user_id;
      if (!managerId) {
        console.error("No Manager ID found in token");
        return;
      }
      const result = await getPendingTask(managerId);
      //console.log("Fetched Tasks:", result);

      if (!Array.isArray(result)) {
        console.error("Invalid task response:", result);
        return;
      }

      const formattedTasks = result.map((task) => ({
        Taskid: task.id,
        Title: task.name,
        Description: task.description || "No description",
        Priority: task.priority,
        Assignedto: `EmployeeId-${task.empId}`,
        Enddate: task.dueDate,
      }));

      setTaskRows(formattedTasks);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <Bar />

      <Box sx={{ display: "flex" }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: "240px",
            flexShrink: 0,
            backgroundColor: "#673ab7",
            color: "white",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
          }}
        >
          <ManagerSidebar />
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: "#D3C5E5",
            minHeight: "100vh",
            marginLeft: "240px",
            paddingTop: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Toolbar />
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Task Approval</h2>

          {/* Task Table */}
          <TableContainer component={Paper} style={{ maxWidth: "80%", maxHeight: "360px", overflow: "auto" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.dataKey}
                      style={{ width: column.width, backgroundColor: "#B39DDB", fontWeight: "bold" }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell style={{ backgroundColor: "#B39DDB", fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {taskRows.map((row, index) => (
                  <TableRow key={index}>
                    {columns.map((column) => (
                      <TableCell key={column.dataKey}>{row[column.dataKey]}</TableCell>
                    ))}
                    <TableCell>
                      <Button variant="contained" color="success" onClick={() => handleOpen(row)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* View Document Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Document Details</DialogTitle>
        <DialogContent>
          {selectedTask ? (
            <Box>
              <Typography><strong>Title:</strong> {selectedTask.Title}</Typography>
              <Typography><strong>Description:</strong> {selectedTask.Description}</Typography>
              <Typography><strong>Priority:</strong> {selectedTask.Priority}</Typography>
              <Typography><strong>Assigned To:</strong> {selectedTask.Assignedto}</Typography>
              <Typography><strong>End Date:</strong> {selectedTask.Enddate}</Typography>
            </Box>
          ) : (
            <Typography>No data available</Typography>
          )}

          {/* File Display Component */}
          {showFile && selectedTask && <FileDisplay taskId={selectedTask.Taskid} />}
        </DialogContent>
        <DialogActions>
          <Box sx={{ width: "80%", marginLeft: "4px" }}>
            <Button variant="contained" color="error" onClick={rejectHandler} style={{ marginRight: "2px" }}>
              Reject
            </Button>
            <Button variant="contained" color="success" onClick={acceptHandler} style={{ marginRight: "2px" }}>
              Approve
            </Button>
            <Button variant="contained" color="primary" onClick={() => setShowFile(true)}>
              View Docs
            </Button>
          </Box>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
