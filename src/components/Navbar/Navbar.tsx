import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import tiff3 from "../../assets/tiff3.png";
import { getToken, logoutUser } from "../../services/LoginService/loginUser";
import { logoStyle, styles } from "./Navbar.styles";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthData } from "../../store/authSlice";
import { RootState } from "../../store/Store";
import { SUPERADMIN_ROLE_ID } from "../../constants/ROLES";

const Navbar = () => {
  const [Open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDrawerToggle = () => {
    setOpen(!Open);
  };
  const location = useLocation();
  const handleAuthToggle = () => {
    if (getToken()) {
      logoutUser();
      dispatch(clearAuthData());
      navigate("/login");
    } else {
      navigate("/login");
    }
  };
  const userRoleId = useSelector((state: RootState) => state.auth.userRoleId);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={styles.drawerBox}>
      <List>
        {getToken() && (
          <ListItem component={Link} to="/dashboard">
            <ListItemText primary="Home" />
          </ListItem>
        )}
        {location.pathname !== "/login" && (
          <ListItem
            component={Link}
            to={getToken() ? "#" : "/login"}
            onClick={getToken() ? handleAuthToggle : undefined}
          >
            <ListItemText primary={getToken() ? "Logout" : "Login"} />
          </ListItem>
        )}
        {!getToken() && (
          <ListItem component={Link} to="/register">
            <ListItemText primary="Register" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar sx={styles.appBar}>
        <Toolbar sx={styles.toolbar}>
          <Box sx={styles.toolbar}>
            <img src={tiff3} alt="Logo" style={logoStyle} />
            <Typography variant="h5" sx={styles.title}>
              Neo-Tiffins
            </Typography>
            {getToken() && (
              <Button
                color="inherit"
                component={Link}
                to="/dashboard"
                sx={styles.button}
              >
                Home
              </Button>
            )}
            {getToken() && userRoleId === SUPERADMIN_ROLE_ID && (
              <Button
                color="inherit"
                component={Link}
                to="/AddOrganization"
                sx={styles.button}
              >
                Add Organization
              </Button>
            )}
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              marginLeft: "auto",
              gap: 1,
            }}
          >
            {location.pathname !== "/login" && (
              <Button
                color="inherit"
                component={Link}
                to={getToken() ? "#" : "/login"}
                onClick={getToken() ? handleAuthToggle : undefined}
                sx={styles.button2}
              >
                {getToken() ? "Logout" : "Login"}
              </Button>
            )}
            {!getToken() && (
              <Button
                color="inherit"
                component={Link}
                to="/register"
                sx={styles.button2}
              >
                Register
              </Button>
            )}
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={styles.iconButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={Open}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { width: "auto" } }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
