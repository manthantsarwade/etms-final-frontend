import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Grid, Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";

const EmployeeProfile = () => {
    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        department: "",
    });

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#e0f7fa" }}> 
            <Card sx={{ maxWidth: 450, padding: 4, boxShadow: 5, borderRadius: 3, backgroundColor: "#ffffff" }}> 
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#1976D2" }}>
                        Employee Profile 
                    </Typography>

                    <Grid container spacing={2} mt={2}>
                        <Grid item xs={12}>
                            <TextField label="First Name" name="firstName" fullWidth variant="outlined" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Last Name" name="lastName" fullWidth variant="outlined" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Email" name="email" type="email" fullWidth variant="outlined" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Date of Birth" name="dob" type="date" fullWidth variant="outlined" onChange={handleChange} InputLabelProps={{ shrink: true }} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Department</InputLabel>
                                <Select name="department" value={employee.department} onChange={handleChange} label="Department">
                                    <MenuItem value="IT">IT</MenuItem>
                                    <MenuItem value="Finance">Finance</MenuItem>
                                    <MenuItem value="HR">HR</MenuItem>
                                    <MenuItem value="Marketing">Marketing</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                fullWidth 
                                sx={{ borderRadius: 2, padding: 1.5, fontSize: "16px", textTransform: "none", fontWeight: "bold" }}
                            >
                                Save Profile
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default EmployeeProfile;
