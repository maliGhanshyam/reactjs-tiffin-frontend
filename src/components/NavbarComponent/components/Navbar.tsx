import { AppBar, Box, Button, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tiff3 from '../../../assets/tiff3.png';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login')
    setIsLoggedIn(true);
    setIsAdmin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const handleRegisterClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAdminRegister = () => {
    navigate('/register');
    handleMenuClose();
  };

  return (
    <AppBar position="static" >
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <img src={tiff3} alt="Logo" style={{ height: '50px', width: '30px',borderRadius: '45%', marginRight: '10px' }} />
          <Typography variant="h5" sx={{
            fontWeight: 'bold', color: '#caf010', letterSpacing: '0.1em',
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)'
          }}>Neo-Tiffins</Typography>
          <Button color="inherit"  sx={{ marginLeft: 4 }}> Dashboard</Button>
        </Box>
        <Box>
          {isLoggedIn ? (
            <>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
              {isAdmin && <Typography color="inherit" sx={{ marginLeft: 2 }}>Admin</Typography>}
            </>
          ) : (
            <>
              <Button color="inherit" onClick={handleLogin}>Login</Button>
              <Button color="inherit" onClick={handleRegisterClick}>
                Register
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleAdminRegister}>Admin Register</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
