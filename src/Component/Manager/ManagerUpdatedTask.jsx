import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import { InputLabel, FormControl, MenuItem, Select, Button } from "@mui/material";
import Bar from "../Bar";
import ManagerSidebar from "./ManagerSidebar";
import { updateTask } from "../../Services/manager";
import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ManagerUpdatedTask() {
  const { taskId } = useParams(); 
  const location = useLocation();
  const taskData = location.state?.task || {};

  console.log("Task Data:", taskData);

  const [taskDetails, setTaskDetails] = useState({
    id: taskData.id || taskId, 
    status: taskData.status || "",
    priority: taskData.priority || "",
    dueDate: taskData.due_date || "",
    description: taskData.description || "",  // Add description to the state
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if the required fields (priority and dueDate) are filled out
    if (!taskDetails.priority || !taskDetails.dueDate) {
      toast.error("Priority and Due Date must be filled out.");
      return;
    }
  
    // Send all the fields in the update (including name, status, etc.)
    const updatedTaskDetails = {
      id: taskDetails.id,
      name: taskData.name,  
      employee_id: taskData.employee_id,  
      status: taskDetails.status,  
      priority: taskDetails.priority,  
      dueDate: taskDetails.dueDate,  
      description: taskDetails.description,  // Add description to the updated details
    };
  
    try {
      // Send the full updated task details to the API
      const response = await updateTask(updatedTaskDetails, taskDetails.id);
  
      if (response.status === "success") {
        toast.success("Task updated successfully!");
      } else {
        toast.error("Error updating task: " + response.message);
      }
    } catch (error) {
      console.error("Error updating task", error);
    }
  };
  
  

  return (
    <>
      <Bar />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box sx={{ width: 240, flexShrink: 0, backgroundColor: "#673ab7", color: "white" }}>
          <ManagerSidebar />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: "#D3C5E5",
            height: "100%",
          }}
        >
          <Toolbar />
          <div style={{ textDecoration: "underline", display: "flex", justifyContent: "center", marginBlock: "10px" }}>
            <h1>Edit Task</h1>
          </div>

          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: "100%",
              maxWidth: "600px",
              margin: "auto",
            }}
            onSubmit={handleSubmit}
          >
            {/* Read-Only Fields */}
            {/* <TextField label="Task ID" value={taskDetails.id} InputProps={{ readOnly: true }} /> */}
            <TextField label="Task Name" value={taskData.name} InputProps={{ readOnly: true }} />
            <TextField label="Employee ID" value={taskData.employee_id} InputProps={{ readOnly: true }} />
            
            {/* Priority - Editable Field */}
            <FormControl>
              <InputLabel>Priority</InputLabel>
              <Select
                name="priority"
                value={taskDetails.priority}
                onChange={handleInputChange}
              >
                <MenuItem value="HIGH">High</MenuItem>
                <MenuItem value="MEDIUM">Medium</MenuItem>
                <MenuItem value="LOW">Low</MenuItem>
              </Select>
            </FormControl>

            {/* Status - Read-Only */}
            <TextField label="Status" value={taskDetails.status} InputProps={{ readOnly: true }} />

            {/* Editable Due Date */}
            <TextField
              id="dueDate"
              name="dueDate"
              label="Due Date"
              type="date"
              value={taskDetails.dueDate}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />

            {/* Editable Description */}
            <TextField
              label="Description"
              name="description"
              value={taskDetails.description}
              onChange={handleInputChange}
              multiline
              rows={4}
            />

            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button type="submit" variant="contained" color="primary">
                Update Task
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
