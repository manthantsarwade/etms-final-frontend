import * as React from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GroupAddIcon from "@mui/icons-material/GroupAdd"; // Icon used for all items
import { Toolbar } from "@mui/material";

const drawerWidth = 240;

const AdminSidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#735DA5", // Sidebar background color
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto", color: "white", }}>
        {/* Add Manager Item */}
      

        {/* Change Manager Item */}
        <ListItem disablePadding>
          <Link to="/adminViewManager" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton style={{ paddingTop: "25px" }}>
              <ListItemIcon>
                <GroupAddIcon />
              </ListItemIcon>
              <ListItemText primary="View Employees" />
            </ListItemButton>
          </Link>
        </ListItem>

        {/* Add Project Item */}
        <ListItem disablePadding>
          <Link to="/adminAddProject" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton style={{ paddingTop: "25px" }}>
              <ListItemIcon>
                <GroupAddIcon />
              </ListItemIcon>
              <ListItemText primary="Add Project" />
            </ListItemButton>
          </Link>
        </ListItem>

        {/* View Project Item */}
        <ListItem disablePadding>
          <Link to="/adminViewProject" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton style={{ paddingTop: "25px" }}>
              <ListItemIcon>
                <GroupAddIcon />
              </ListItemIcon>
              <ListItemText primary="View Project" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link to="/adminViewRequest" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton style={{ paddingTop: "25px" }}>
              <ListItemIcon>
                <GroupAddIcon />
              </ListItemIcon>
              <ListItemText primary="View Requests" />
            </ListItemButton>
          </Link>
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;
