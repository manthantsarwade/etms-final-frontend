import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import { InputLabel, FormControl, MenuItem, Select, TextareaAutosize, LinearProgress } from "@mui/material";
import Bar from "../Bar";
import { useState, useEffect } from "react";
import ManagerSidebar from "./ManagerSidebar";
import { createtask, getAllEmployee, getAllProjectById } from "../../Services/manager";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ManagerAddTask = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [empId, setEmpId] = useState("");
  const [projId, setProjId] = useState("");
  const [manId, setManId] = useState("");
  const [priority, setPriority] = useState("");
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setManId(decoded?.user_id);
    }
    fetchEmployee();
    fetchProject();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await getAllEmployee();
      setEmployees(response || []);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const fetchProject = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const decoded = jwtDecode(token);
      const response = await getAllProjectById(decoded?.user_id);
      setProjects(response || []);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  const onAddTask = async () => {
    if (!name || !description || !dueDate || !empId || !projId || !manId || !priority) {
      toast.error("Please fill all the fields");
      return;
    }

    const taskData = {
      name,
      description,
      dueDate,
      empId: parseInt(empId),
      projId: parseInt(projId),
      manId: parseInt(manId),
      priority,
    };

    setLoading(true); // Show loading bar

    try {
      const result = await createtask(taskData);
      if (result.status === "error") {
        toast.error(`Error: ${result.message}`);
      } else {
        toast.success("Task created successfully!");
        navigate("/managerHome");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task");
    } finally {
      setLoading(false); // Hide loading bar
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
        <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: "#D3C5E5", height: "100%" }}>
          <Toolbar />
          
          {/* Loading Bar */}
          {loading && <LinearProgress color="secondary" sx={{ mb: 2 }} />}

          <div style={{ textDecoration: "underline", display: "flex", justifyContent: "center", marginBlock: "10px" }}>
            <h1>Add Task</h1>
          </div>
          <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%", maxWidth: "600px", margin: "auto" }} noValidate autoComplete="off">
            <TextField required id="name" label="Task Name" type="text" onChange={(e) => setName(e.target.value)} sx={{ width: "100%" }} />
            
            {/* Employee Dropdown */}
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="employee-label">Employee</InputLabel>
              <Select labelId="employee-label" id="empId" value={empId} onChange={(e) => setEmpId(e.target.value)}>
                {employees.map((emp) => (
                  <MenuItem key={emp.id} value={emp.id}>{`${emp.firstName} ${emp.lastName}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            {/* Project Dropdown */}
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="project-label">Project</InputLabel>
              <Select labelId="project-label" id="projId" value={projId} onChange={(e) => setProjId(e.target.value)}>
                {projects.map((proj) => (
                  <MenuItem key={proj.id} value={proj.id}>{proj.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <TextField required id="manId" label="Manager ID" type="number" onChange={(e) => setManId(e.target.value)} value={manId} sx={{ width: "100%" }} />
            <TextField id="dueDate" label="Due Date" type="date" onChange={(e) => setDueDate(e.target.value)} InputLabelProps={{ shrink: true }} sx={{ width: "100%" }} />
            
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="priority-label">Priority</InputLabel>
              <Select labelId="priority-label" id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                <MenuItem value="HIGH">High</MenuItem>
                <MenuItem value="MEDIUM">Medium</MenuItem>
                <MenuItem value="LOW">Low</MenuItem>
              </Select>
            </FormControl>
            
            <Box>
              <InputLabel id="description" sx={{ mb: 1 }}>Description</InputLabel>
              <TextareaAutosize id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter task description" minRows={4} style={{ padding: "16px", borderRadius: "5px", border: "1px solid #e6dede", width: "100%" }} />
            </Box>
            
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <button onClick={(e) => { e.preventDefault(); onAddTask(); }} style={{ padding: "10px 20px", backgroundColor: "#673ab7", color: "white", border: "none", borderRadius: "5px", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }} disabled={loading}>
                {loading ? "Adding Task..." : "Add Task"}
              </button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ManagerAddTask;
