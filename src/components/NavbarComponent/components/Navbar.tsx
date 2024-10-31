import React, { useState,useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import tiff3 from '../../../assets/tiff3.png';
import { loginUser, logoutUser,getToken } from '../../../services/LoginService/loginUser';
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAuthToggle = () => {
    if (getToken()) {
      logoutUser();
      navigate("/login"); // Redirect to login after logout
    } else {
      navigate("/login");
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ width: 'auto', padding: 2 }}>
      <List>
        {getToken() && (
          <>
            <ListItem component={Link} to="/dashboard">
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem component={Link} to="/approve">
              <ListItemText primary="Approve" sx={{ color: 'inherit' }} />
            </ListItem>
          </>
        )}
        <ListItem component={Link} to={getToken() ? "#" : "/login"} onClick={getToken() ? handleAuthToggle : undefined}>
          <ListItemText primary={getToken() ? "Logout" : "Login"} />
        </ListItem>
        {!getToken() && (
          <ListItem component={Link} to="/register">
            <ListItemText primary="Admin Register" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img src={tiff3} alt="Logo" style={{ height: '45px', width: '30px', borderRadius: '45%', marginRight: '10px' }} />
            <Typography variant="h5" sx={{
              fontWeight: 'bold', color: '#caf010', letterSpacing: '0.1em',
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)'
            }}>Neo-Tiffins</Typography>
          </Box>

          {/*for Desktop */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, marginLeft: 'auto', gap: 2 }}>
            {getToken() && <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>}
            {getToken() && <Button color="inherit" component={Link} to="/approve">Approve</Button>}
            <Button color="inherit" component={Link} to={getToken() ? "#" : "/login"} onClick={getToken() ? handleAuthToggle : undefined}>
              {getToken() ? "Logout" : "Login"}
            </Button>
            {!getToken() && <Button color="inherit" component={Link} to="/register">Admin Register</Button>}
          </Box>

          {/* Menu Icon */}
          <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer Mobile View */}
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { width: 'auto' } }}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
