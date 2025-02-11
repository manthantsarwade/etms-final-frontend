import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadFile } from "../../Services/employee"; 
import { useNavigate } from "react-router-dom";

const EmployeeTaskSubmit = () => {
  const location = useLocation();
  const { taskId, taskName, dueDate, status, managerId } = location.state || {};
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    id: taskId || "",
    name: taskName || "",
    dueDate: dueDate || "",
    status: status || "",
    managerId: managerId || "",
    file: null,
  });

  useEffect(() => {
    if (location.state) {
      setFormData({
        id: taskId || "",
        name: taskName || "",
        dueDate: dueDate || "",
        status: status || "",
        managerId: managerId || "",
        file: null,
      });
    }
  }, [location.state, taskId, taskName, dueDate, status, managerId]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    //console.log("Selected file:", selectedFile);
    setFormData({
      ...formData,
      file: selectedFile,
    });
  };

  const handleSubmit = async () => {
    if (!formData.file) {
      toast.error("Please upload a file before submitting.");
      return;
    }

    try {
      
      const result = await uploadFile(formData.id, formData.file);

        toast.success("Task submitted successfully!");
        navigate("/managerHome");
   
      
    } catch (error) {
      toast.error("An error occurred while submitting the task.");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Submit Task
      </Typography>

      <Paper sx={{ padding: 4, borderRadius: 2 }}>
        <Grid container spacing={2}>
          {/* Task ID */}
          <Grid item xs={12} sm={6}>
            <TextField label="Task ID" name="id" fullWidth variant="outlined" value={formData.id} disabled />
          </Grid>

          {/* Task Name */}
          <Grid item xs={12} sm={6}>
            <TextField label="Task Name" name="name" fullWidth variant="outlined" value={formData.name} disabled />
          </Grid>

          {/* Due Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Due Date"
              name="dueDate"
              type="date"
              fullWidth
              variant="outlined"
              value={formData.dueDate}
              InputLabelProps={{ shrink: true }}
              disabled
            />
          </Grid>

          {/* Status */}
          <Grid item xs={12} sm={6}>
            <TextField label="Status" name="status" fullWidth variant="outlined" value={formData.status} disabled />
          </Grid>

          {/* Manager ID */}
          <Grid item xs={12} sm={6}>
            <TextField label="Manager ID" name="managerId" fullWidth variant="outlined" value={formData.managerId} disabled />
          </Grid>

          {/* File Upload */}
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" component="label" sx={{ width: "200px" }}>
                Upload File
                <input
                  type="file"
                  hidden
                  accept="application/pdf, image/*, .docx"
                  onChange={handleFileChange}
                />
              </Button>
              {formData.file && <Typography variant="body2">{formData.file.name}</Typography>}
            </Stack>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              sx={{ padding: 1.5, fontSize: "16px", textTransform: "none", fontWeight: "bold" }}
            >
              Submit Task
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default EmployeeTaskSubmit;
