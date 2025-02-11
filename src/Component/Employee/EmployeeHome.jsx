import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Avatar, Box, Typography } from "@mui/material";
import Bar from "../Bar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getTaskById } from "../../Services/employee";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const EmployeeHome = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const token = sessionStorage.getItem("token");
        const decoded = jwtDecode(token);
        const id = decoded.user_id;

        const result = await getTaskById(id);
        if (result.status !== "error") {
            setTasks(result); 
        } else {
           // console.error(result.message);
        }
    };

    return (
        <div style={{
            display: "flex",
            height: "100%",
            width: "100%",
            backgroundColor: "#DAD2FF",
            padding: "20px",
        }}>
            <Box
                sx={{
                    width: "20%",
                    backgroundColor: "#7E60BF",
                    padding: 3,
                    borderRadius: 2,
                    marginRight: 2,
                    marginTop: 8,
                    paddingTop: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: "white",
                }}
            >
                <Avatar
                    alt="Profile"
                    src=""
                    sx={{
                        width: 80,
                        height: 80,
                        mb: 2,
                        border: "2px solid white",
                    }}
                />
                <Typography variant="h6" sx={{ mb: 2 }}>
                    John Doe
                </Typography>

                <Button
                    variant="contained"
                    sx={{
                        borderRadius: "44px",
                        mb: 2,
                        backgroundColor: "#B2A5FF",
                        color: "white",
                        textTransform: "none",
                        padding: "10px 20px",
                    }}
                >
                    <Link to='/employeeProfile' style={{ textDecoration: 'none', color: 'white' }}>
                        Edit Profile
                    </Link>
                </Button>
            </Box>

            {/* Main Content */}
            <div style={{ width: "80%", padding: "20px", backgroundColor: "#E8F9FF", borderRadius: "10px", marginTop: "60px" }}>
                <Bar />
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Assigned Tasks</h2>

                <TableContainer
                    component={Paper}
                    sx={{
                        maxHeight: "500px",
                        overflowY: "auto",
                        backgroundColor: "#E5D9F2",
                        borderRadius: "10px",
                    }}
                >
                    <Table stickyHeader aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Due Date</StyledTableCell>
                                <StyledTableCell align="center">Status</StyledTableCell>
                                <StyledTableCell align="center">Manager</StyledTableCell>
                                <StyledTableCell align="center">Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks.map((task) => (
                                <StyledTableRow key={task.id}>
                                    <StyledTableCell component="th" scope="row">{task.id}</StyledTableCell>
                                    <StyledTableCell align="center">{task.name}</StyledTableCell>
                                    <StyledTableCell align="center">{task.dueDate}</StyledTableCell>
                                    <StyledTableCell align="center">{task.status}</StyledTableCell>
                                    <StyledTableCell align="center">{task.managerName}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Link
                                            to={`/taskSubmit/${task.id}`}
                                            state={{
                                                taskId: task.id,
                                                taskName: task.name,
                                                dueDate: task.dueDate,
                                                status: task.status,
                                                managerId: task.managerId,
                                                managerName: task.managerName,
                                            }}
                                            style={{ textDecoration: "none" }}
                                        >
                                            <Button variant="contained" color="success">
                                                Edit Task
                                            </Button>
                                        </Link>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default EmployeeHome;
