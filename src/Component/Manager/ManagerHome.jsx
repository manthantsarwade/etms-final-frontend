import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Bar from "../Bar";
import ManagerSidebar from "./ManagerSidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { getAllTask } from "../../Services/manager";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const drawerWidth = 250;

const taskColumns = [
  { width: 100, label: "Task ID", dataKey: "id" },
  { width: 150, label: "Name", dataKey: "name" },
  { width: 150, label: "Status", dataKey: "status" },
  { width: 120, label: "Priority", dataKey: "priority" },
  { width: 150, label: "Due Date", dataKey: "due_date" },
  { width: 150, label: "Employee ID", dataKey: "employee_id" },
];

const ManagerHome = () => {
  const [taskRows, setTaskRows] = React.useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      let decoded;
      try {
        decoded = jwtDecode(token);
      } catch (error) {
        console.error("Invalid token", error);
        return;
      }

      const managerId = decoded?.user_id;
      if (!managerId) {
        console.error("No Manager ID found in token");
        return;
      }
      const result = await getAllTask(managerId);
      console.log(result)
      //console.log("Fetched tasks:", result);



      // Map API data to taskRows
      const formattedTasks = result.map((task) => ({
        id: task.taskId,
        name: task.name,
        status: task.status,
        priority: task.priority,
        due_date: task.dueDate,
        employee_id: task.empId,
      }));

      setTaskRows(formattedTasks);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // const handleUpdate = (task) => {
  //   console.log("Updating task:", task);
  //   // Add logic here to update the task (for example, show a modal with task details)
  // };

  // Count task priorities for chart
  const priorityCount = { High: 0, Medium: 0, Low: 0 };
  taskRows.forEach((task) => {
    const priority = task.priority?.toUpperCase();
    if (priority === "HIGH") priorityCount.High++;
    else if (priority === "MEDIUM") priorityCount.Medium++;
    else if (priority === "LOW") priorityCount.Low++;
  });

  const chartData = [priorityCount.High, priorityCount.Medium, priorityCount.Low];
  const totalTasks = taskRows.length;

  return (
    <>
      <Bar />
      <div style={{ display: "flex", height: "100vh", width: "100%" }}>
        {/* Sidebar */}
        <div
          style={{
            width: `${drawerWidth}px`,
            background: "#673ab7",
            color: "white",
            position: "fixed",
            height: "100vh",
          }}
        >
          <ManagerSidebar />
        </div>

        {/* Main Content */}
        <div
          style={{
            marginLeft: `${drawerWidth}px`,
            flexGrow: 1,
            padding: "20px",
            backgroundColor: "#f5f5f5",
            marginTop: "70px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
            {/* Task Count Box */}
            <div
              style={{
                flex: "0 0 48%",
                height: "230px",
                borderRadius: "18px",
                background: "#78B3CE",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h2 style={{ textAlign: "center", color: "#500073", fontSize: "50px" }}>{totalTasks}</h2>
            </div>

            {/* Priority Chart */}
            <div style={{ flex: "0 0 48%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BarChart
                series={[{ data: chartData }]}
                height={230}
                xAxis={[{ data: ["High", "Medium", "Low"], scaleType: "band" }]}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
              />
            </div>
          </div>

          {/* Task Table */}
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Task Table</h2>
          <TableContainer component={Paper} style={{ maxHeight: 180, overflow: "auto" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {taskColumns.map((column) => (
                    <TableCell
                      key={column.dataKey}
                      style={{ width: column.width, backgroundColor: "#735DA5", fontWeight: "bold", color: "white" }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell style={{ backgroundColor: "#735DA5", fontWeight: "bold", color: "white" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ background: "#C4DAD2" }}>
                {taskRows.map((row, index) => (
                  <TableRow key={index}>
                    {taskColumns.map((column) => (
                      <TableCell key={column.dataKey}>{row[column.dataKey]}</TableCell>
                    ))}
                    <TableCell>
                      <Link
                        to={`/managerUpdateTask/${row.id}`}
                        state={{ task: row }} // Correct way to pass state in React Router v6
                      >
                        <Button variant="contained" color="primary" size="small">
                          Update
                        </Button>
                      </Link>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default ManagerHome;
