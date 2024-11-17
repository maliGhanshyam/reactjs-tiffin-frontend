import React, { useEffect, useState } from "react";
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
  Popover,
  DialogActions,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import tiff3 from "../../assets/tiff3.png";
import { getToken, logoutUser } from "../../services/LoginService/loginUser";
import { logoStyle, styles } from "./Navbar.styles";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthData } from "../../store/authSlice";
import { getUserByToken, uploadUserImage } from "../../services/Auth/Auth";
import { UserResponse } from "../../services/Auth/Auth.types";
import { RootState } from "../../store/Store";
import { SUPERADMIN_ROLE_ID } from "../../constants/ROLES";
import { useSnackbar } from "../../hook";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // For positioning popover
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const userRoleId = useSelector((state: RootState) => state.auth.userRoleId);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const token = getToken();
  const { showSnackbar } = useSnackbar();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleAuthToggle = () => {
    if (token) {
      logoutUser();
      dispatch(clearAuthData());
      setUserData(null);
      navigate("/login");
    } else {
      navigate("/login");
      fetchUserData();
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [image,token]);

  const fetchUserData = async () => {
    const token = getToken();
    try {
      if (token) {
        const response: UserResponse = await getUserByToken();
        setUserData(response.data);
      }
    } catch (error) {
      showSnackbar("Error fetching user image", "error");
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={styles.drawerBox}>
      <List>
        {token && (
          <ListItem component={Link} to="/dashboard" sx={styles.listItemStyle}>
            <ListItemText primary="Home" />
          </ListItem>
        )}
        {location !== "/login" && (
          <ListItem
            component={Link}
            to={token ? "#" : "/login"}
            onClick={token ? handleAuthToggle : undefined}
            sx={styles.listItemStyle}
          >
            <ListItemText primary={token ? "Logout" : "Login"} />
          </ListItem>
        )}
        {location !== "/register" && !token && (
          <ListItem component={Link} to="/register" sx={styles.listItemStyle}>
            <ListItemText primary="Register" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  const handleImageUpload = async () => {
    if (!image) {
      showSnackbar("Please select an image first", "error");
      return;
    }
    try {
      await uploadUserImage(userId!, image!);
      showSnackbar("Image uploaded successfully!", "success");
      await fetchUserData();
      setAnchorEl(null);
    } catch (error) {
      showSnackbar("Failed to upload image.", "error");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // first file selected
    if (file) {
      setImage(file);
    }
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar sx={styles.appBar}>
        <Toolbar sx={styles.toolbar}>
          <Box sx={styles.toolbar}>
            <img src={tiff3} alt="Logo" style={logoStyle} />
            <Typography
              variant="h5"
              sx={{ ...styles.title, fontFamily: "Futura, Avenir, sans-serif" }}
            >
              <span style={{ color: "black", fontWeight: "bold" }}>Neo</span>
              <span style={{ color: "white", fontWeight: "bold" }}>
                Tiffins
              </span>
            </Typography>
            {token && (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to={
                    userRoleId === SUPERADMIN_ROLE_ID
                      ? "/superAdminDashboard"
                      : "/adminDashboard"
                  }
                  sx={styles.button}
                >
                  Home
                </Button>
                {/* {token && userRoleId === SUPERADMIN_ROLE_ID && (
<Button
color="inherit"
component={Link}
to="/AddOrganization"
sx={styles.button}
>
Add Organization
</Button>
)} */}
              </>
            )}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {token ? (
              userData?.user_image ? (
                <img
                  src={userData.user_image}
                  alt="User"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    marginRight: "20px",
                  }}
                  onClick={handlePopoverOpen}
                />
              ) : (
                <img
                  src="https://avatar.iran.liara.run/public/boy?username=Ash"
                  alt="Default User"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    marginRight: "20px",
                  }}
                  onClick={handlePopoverOpen}
                />
              )
            ) : (
              <></>
            )}
            {location !== "/login" && (
              <Button
                color="inherit"
                component={Link}
                to={token ? "#" : "/login"}
                onClick={token ? handleAuthToggle : undefined}
                sx={styles.button2}
                variant="outlined"
              >
                {token ? "Logout" : "Login"}
              </Button>
            )}
            {location !== "/register" && !token && (
              <Button
                color="inherit"
                component={Link}
                to="/register"
                sx={styles.button2}
                variant="outlined"
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
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { width: "auto", backgroundColor: "#f4f6f7" } }}
      >
        {drawer}
      </Drawer>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom", // Position below the image
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          sx: {
            borderRadius: "30px",
            boxShadow: "2",
          },
        }}
      >
        <Box sx={{ padding: "10px" }}>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            style={{ marginTop: "10px", marginLeft: "10px" }}
          />
          <DialogActions>
            <Button
              onClick={handlePopoverClose}
              size="small"
              variant="contained"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleImageUpload}
              size="small"
              variant="contained"
              color="info"
            >
              Upload
            </Button>
          </DialogActions>
        </Box>
      </Popover>
    </>
  );
};

export default Navbar;
