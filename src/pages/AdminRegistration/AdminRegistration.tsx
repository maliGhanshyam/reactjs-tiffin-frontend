import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid2,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Organization, RegisterResponse } from "./AdminRegistration.types";
import { MenuProps, styles } from "./AdminRegistration.style";
import { ADMIN_ROLE_ID } from "../../constants/ROLES";
import { registerAdmin } from "../../services/Auth";
import { getOrganizations } from "../../services/Organization";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import login from "../../assets/LoginScreen.svg";
import { useSnackbar } from "../../hook";

const AdminRegistration = () => {
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [organization, setOrganization] = useState<Organization[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await getOrganizations();
        setOrganization(response);
      } catch (error) {
        showSnackbar("Error fetching organizations", "error");
      }
    };
    fetchOrganization();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      contact_number: "",
      address: "",
      password: "",
      confirmPassword: "",
      organization_id: "",
      role_id: ADMIN_ROLE_ID,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .matches(
          /^[a-zA-Z0-9.\-_$@*!]{3,20}$/,
          "Must be a valid username number"
        )
        .required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required")
        .matches(
          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
          "Invalid email format"
        ),
      contact_number: Yup.string()
        .matches(/^[0-9]+$/, "Must be a valid contact number")
        .length(10, "Contact Number must be of 10 digits")
        .required("Contact Number is required"),
      address: Yup.string()
        .required("Address is required")
        .min(5, "At least 5 characters be there")
        .max(50, "Upto 50 characters long"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .max(20, "Password must be at most 20 characters long")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
      organization_id: Yup.string().required("Organization is required"),
    }),
    onSubmit: async (values, actions) => {
      try {
        const res: RegisterResponse = await registerAdmin(values);
        if (res.statuscode === 201) {
          showSnackbar("Admin registered successfully.", "success");
          navigate("/login");
        }
        actions.resetForm();
        setSelectedOrganization("");
      } catch (error) {
        showSnackbar("Email already exists", "error");
      }
    },
  });

  return (
    <Container component="main">
      <Grid2 container size={12}>
        <Grid2 size={7} sx={styles.svgGrid}>
          <Box sx={styles.svgBox}>
            <img
              src={login}
              alt="Registration logo"
              style={{
                width: 600,
                height: 600,
                objectFit: "contain",
              }}
            />
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <Box sx={styles.container}>
            <Typography
              component="h1"
              variant="h5"
              align="center"
              sx={styles.heading}
            >
              Admin Registration
            </Typography>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              noValidate
              sx={{ mt: 2 }}
            >
              <Grid2 container spacing={2}>
                <Grid2 size={12}>
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    id="username"
                    autoComplete="off"
                    size="small"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                  />
                </Grid2>
                <Grid2 size={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    size="small"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid2>
                <Grid2 size={12}>
                  <TextField
                    fullWidth
                    label="Contact Number"
                    name="contact_number"
                    id="contact_number"
                    autoComplete="off"
                    size="small"
                    value={formik.values.contact_number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.contact_number &&
                      Boolean(formik.errors.contact_number)
                    }
                    helperText={
                      formik.touched.contact_number &&
                      formik.errors.contact_number
                    }
                  />
                </Grid2>
                <Grid2 size={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    id="address"
                    autoComplete="off"
                    size="small"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                    helperText={formik.touched.address && formik.errors.address}
                  />
                </Grid2>
                <Grid2 size={12}>
                  <Box sx={{ width: "100%" }}>
                    <Select
                      sx={{ textAlign: "left" }}
                      fullWidth
                      size="small"
                      labelId="organization"
                      id="organisationName"
                      value={selectedOrganization}
                      MenuProps={MenuProps}
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        setSelectedOrganization(selectedId);
                        formik.setFieldValue("organization_id", selectedId);
                      }}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.organization_id &&
                        Boolean(formik.errors.organization_id)
                      }
                      displayEmpty
                      renderValue={(value) => {
                        if (value) {
                          return organization.find((org) => org._id === value)
                            ?.org_name;
                        }
                        return (
                          <Typography
                            sx={
                              formik.touched.organization_id &&
                              formik.errors.organization_id
                                ? styles.organizationError
                                : styles.organizationPlaceholder
                            }
                          >
                            Organization Name
                          </Typography>
                        );
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select an organization
                      </MenuItem>
                      {organization.map((org: Organization) => (
                        <MenuItem
                          key={org._id}
                          value={org._id}
                          sx={{ overflowY: "auto" }}
                        >
                          {org.org_name}
                        </MenuItem>
                      ))}
                    </Select>

                    {formik.touched.organization_id &&
                      formik.errors.organization_id && (
                        <Typography
                          color="error"
                          variant="caption"
                          sx={styles.errorText}
                        >
                          {formik.errors.organization_id}
                        </Typography>
                      )}
                  </Box>
                </Grid2>
                <Grid2 size={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="off"
                    size="small"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid2>
                <Grid2 size={12}>
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="off"
                    size="small"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid2>
              </Grid2>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={styles.button}
              >
                Sign Up
              </Button>
            </Box>
            <Typography variant="body2" align="center">
              Already have an account?&nbsp;
              <Link to={"/login"}>click here to login</Link>
            </Typography>
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default AdminRegistration;
