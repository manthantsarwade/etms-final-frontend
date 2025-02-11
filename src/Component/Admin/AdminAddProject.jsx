import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import { TextareaAutosize, Button, InputLabel, FormControl, MenuItem, Select } from '@mui/material';
import Bar from '../Bar';
import AdminSidebar from './AdminSidebar';
import { useState, useEffect } from 'react';
import { addProjects } from '../../Services/admin';
import {allManager} from '../../Services/admin'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const AdminAddProject = () => {
    const [name, setName] = useState(""); 
    const [description, setDescription] = useState(""); 
    const [dueDate, setDueDate] = useState(""); 
    const [managerId, setManagerId] = useState(""); 
    const [managers, setManagers] = useState([]); 

    const navigate = useNavigate();

    useEffect(() => {
        getManagers();
    }, []);

    const getManagers = async () => {
        try {
            const result = await allManager();
            setManagers(result || []); // Ensure managers array is set
        } catch (error) {
            console.error("Error fetching managers:", error);
        }
    };

    const onAddProject = async () => {
        if (!name || !description || !dueDate || !managerId) {
            toast.error("Please fill all the fields");
            return;
        }

        const projectData = {
            name,
            description,
            dueDate,
            manager_id: parseInt(managerId),
        };

        try {
            await addProjects(projectData);
            navigate('/adminViewProject');
           toast.success("Project added successfully");
        } catch (error) {
            console.error("Error adding project:", error);
        }
    };

    return (
        <>
            <Bar />
            <AdminSidebar />
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />

                <Box component="main" sx={{
                    flexGrow: 1, p: 3, backgroundColor: "#D3C5E5", height: "100%", marginLeft: '240px',
                    width: `calc(100% - 240px)`,
                }}>
                    <Toolbar />
                    <div style={{
                        textDecoration: "underline", display: "flex", justifyContent: "center", marginBlock: "30px"
                    }}>
                        <h1>Add Project</h1>
                    </div>

                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            {/* Project Name */}
                            <TextField
                                required
                                id="name"
                                label="Project Name"
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                            />

                            {/* End Date (Due Date) */}
                            <TextField
                                id="end-date"
                                label="Due Date"
                                type="date"
                                onChange={(e) => setDueDate(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                sx={{ m: 1, width: '25ch' }}
                            />

                            {/* Manager Dropdown */}
                            <FormControl sx={{ m: 1, width: '25ch' }}>
                                <InputLabel id="manager-label">Manager</InputLabel>
                                <Select
                                    labelId="manager-label"
                                    id="manager-id"
                                    value={managerId}
                                    onChange={(e) => setManagerId(e.target.value)}
                                >
                                    {managers.map((manager) => (
                                        <MenuItem key={manager.id} value={manager.id}>
                                            {manager.firstName} {manager.lastName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* Description */}
                            <div style={{ marginLeft: "8px" }}>
                                <TextareaAutosize
                                    id="textArea"
                                    aria-label="Description"
                                    placeholder='Project Description'
                                    onChange={(e) => setDescription(e.target.value)}
                                    minRows={4}
                                    style={{
                                        padding: "24px", borderRadius: "5px", border: "1px solid #e6dede", width: '100%'
                                    }}
                                />
                            </div>

                            {/* Add Project Button */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 50,
                            }}>
                                <Button variant="contained" color="secondary" onClick={onAddProject}>
                                    Add Project
                                </Button>
                            </div>

                        </div>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default AdminAddProject;
