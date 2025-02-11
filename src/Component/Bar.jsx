import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import staff from '../assets/staff.png';
import { Link } from 'react-router-dom';

const Bar = () => {
  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#A594F9' }}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Left Side - Logo & Title */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={staff} alt="" style={{ width: "50px", height: "50px" }} />
            <h2 style={{ marginLeft: "15px", color: "white" }}>Employee Task Management</h2>
          </div>

          {/* Right Side - Logout Button */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="error">
              Logout
            </Button>
          </Link>
        </Toolbar>

      </AppBar>
    </>
  );
}

export default Bar;
