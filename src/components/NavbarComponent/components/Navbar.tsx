import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import tiff3 from '../../../assets/tiff3.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [mobile, setmobile] = useState(false); 
  // to check if mobile screen is open
  
  const [loggedIn, setLoggedIn] = useState(true);

  const handleDrawerToggle = () => {
    setmobile(!mobile);
  };

  const handleAuthToggle = () => {
    setLoggedIn(previous => !previous);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ width: 'auto', padding: 2 }}>
      <List>
        {loggedIn && (
          <>
            <ListItem component={Link} to="/dashboard">
              <ListItemText primary="Home" />
            </ListItem>
          </>
        )}
        <ListItem component={Link} to={loggedIn ? "#" : "/login"} onClick={loggedIn ? handleAuthToggle : undefined}>
          <ListItemText primary={loggedIn ? "Logout" : "Login"} />
        </ListItem>
        {!loggedIn && (
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
            {/* flexGrow is used for expanding the height ref to other links */}
            <img src={tiff3} alt="Logo" style={{ height: '45px', width: '30px', borderRadius: '45%', marginRight: '10px' }} />
            <Typography variant="h5" sx={{
              fontWeight: 'bold', color: '#caf010', letterSpacing: '0.1em',
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)'
            }}>Neo-Tiffins</Typography>
            {loggedIn && (
              <Button color="inherit" component={Link} to="/dashboard" sx={{ fontSize: '1.05rem', marginLeft: 4, display: { xs: 'none', sm: 'block' } }}>
                Home
              </Button>
            )}
          </Box>

          {/*for Desktop */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, marginLeft: 'auto', gap: 2 }}>
            {/* {loggedIn && <Button color="inherit" component={Link} to="/dashboard" sx={{ fontSize: '1.05rem' }}>Dashboard</Button>} */}
            <Button color="inherit" component={Link} to={loggedIn ? "#" : "/login"} onClick={loggedIn ? handleAuthToggle : undefined} sx={{ fontSize: '1.05rem' }}>
              {loggedIn ? "Logout" : "Login"}
            </Button>
            {!loggedIn && <Button color="inherit" component={Link} to="/register" sx={{ fontSize: '1.05rem' }}>Admin Register</Button>}
          </Box>

          {/* Menu Icon */}
          <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile*/}
      <Drawer anchor="right" open={mobile} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { width: 'auto' } }}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
