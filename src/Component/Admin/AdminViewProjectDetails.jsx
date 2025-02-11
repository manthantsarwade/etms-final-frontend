import * as React from "react";
import "/src/App.css";
import { PieChart } from "@mui/x-charts";
import Bar from "../Bar";
import AdminSidebar from "./AdminSidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getProjects } from '../../Services/admin';
import { useState, useEffect } from "react";

const drawerWidth = 250;

const projectColumns = [
  { width: 200, label: "Project Name", dataKey: "ProjectName" },
  { width: 400, label: "Description", dataKey: "Description" },
  { width: 400, label: "Due Date", dataKey: "DueDate" },
  { width: 400, label: "Manager id", dataKey: "ManagerId" },
  { width: 200, label: "Manager Name", dataKey: "ManagerName" },
];

const AdminViewProjectDetails = () => {
  const [projectRowsData, setProjectRowsData] = useState([]);
  
  // Fetch data from the API
  const fetchData = async () => {
    try {
      const result = await getProjects(); 
     // console.log(result); 
     
      const formattedData = result.map(project => ({
        ProjectName: project.name,
        Description: project.description,
        DueDate: project.dueDate,
        ManagerId: project.manager_id,
        ManagerName: project.managerName, 
      }));
      setProjectRowsData(formattedData); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []); 

  const totalProjects = projectRowsData.length;

  // Count projects for each manager
  const managerProjectCount = projectRowsData.reduce((count, project) => {
    count[project.ManagerId] = (count[project.ManagerId] || 0) + 1;
    return count;
  }, {});

  // Prepare data for PieChart
  const pieChartData = Object.entries(managerProjectCount).map(([managerId, count]) => ({
    label: `Manager ${managerId}`,
    value: count,
  }));

  return (
    <>
      <Bar />

      <div style={{ display: "flex", height: "100vh", width: "100%" }}>
        <div
          style={{
            width: `${drawerWidth}px`,
            background: "#673ab7",
            color: "white",
            position: "fixed",
            height: "100vh",
          }}
        >
          <AdminSidebar />
        </div>

        <div
          style={{
            marginLeft: `${drawerWidth}px`,
            flexGrow: 1,
            padding: "20px",
            backgroundColor: "#F5F7F8",
            marginTop: "70px",
          }}
        >
          {/* Top Section: Total Projects & Pie Chart */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
            <div
              style={{
                flex: "0 0 48%",
                height: "130px",
                borderRadius: "18px",
                background: "#78B3CE",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h2 style={{ textAlign: "center", color: "white" }}>{totalProjects}</h2>
            </div>
            <div style={{ flex: "0 0 48%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <PieChart series={[{ data: pieChartData }]} width={400} height={200} />
            </div>
          </div>

          <hr
            style={{
              width: "100%",
              height: "2px",
              background: "black",
              border: "none",
              marginTop: "14px",
            }}
          />

          {/* Assigned Task Section (Project Table) */}
          <div>
            <h2 style={{ textAlign: "center", marginBlock: "8px", color: "Green" }}>Assigned Task</h2>
            <TableContainer component={Paper} style={{ maxHeight: 200, overflow: "auto" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {projectColumns.map((column) => (
                      <TableCell
                        key={column.dataKey}
                        style={{
                          width: column.width,
                          backgroundColor: "#287A6A",
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody style={{ background: "#A1D6C5" }}>
                  {projectRowsData.map((row, index) => (
                    <TableRow key={index}>
                      {projectColumns.map((column) => (
                        <TableCell key={column.dataKey}>{row[column.dataKey]}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminViewProjectDetails;
