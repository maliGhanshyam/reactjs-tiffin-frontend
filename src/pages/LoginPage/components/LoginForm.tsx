import React from "react";
import {
  Button,
  TextField,
  Grid2,
  Typography,
  Container,
} from "@mui/material";
// import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/LoginService/loginUser";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  interface LoginData {
    email: string;
    password: string;
  }

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
      email: Yup.string()
        .email("Invalid email format")
        .max(50, "Too Long!")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
        .max(20, "Too Long!")
        .required("Password is required"),
    });

  // const navigate = useNavigate();

  const handleSubmit = async (
      loginData: LoginData,
      { setSubmitting, setStatus }: FormikHelpers<LoginData>
    ) => {
      try {
        const response = await loginUser(loginData.email, loginData.password);
        if (response && (response as { token?: string }).token) {
          setStatus({ success: true });
          // navigate("/cards");   //SuperAdminDashboard
        }
      } catch (error) {
        console.error("Login error:", error);
        setStatus({ success: false, message: "Invalid credentials" });
      } finally {
        setSubmitting(false);
      }
    };

  return (
    <>
      {/* <Navbar /> */}
      <Container maxWidth="sm">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            padding: 2,
          }}
        >
          Login
        </Typography>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleChange, handleBlur, values, errors, touched, status }) => (
            <Form>
              <Grid2 container spacing={2} sx={{ marginTop: 2 }}>
                <Grid2 size={12}>
                  <TextField
                    fullWidth
                    label="email"
                    variant="outlined"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    helperText={touched.email && errors.email}
                    error={touched.email && Boolean(errors.email)}
                  />
                </Grid2>
                <Grid2 size={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    helperText={touched.password && errors.password}
                    error={touched.password && Boolean(errors.password)}
                  />
                </Grid2>
                {status?.message && (
                  <Grid2 size={12}>
                    <Typography color="error" align="center">
                      {status.message}
                    </Typography>
                  </Grid2>
                )}
                <Grid2 size={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    Login
                  </Button>
                </Grid2>
              </Grid2>
            </Form>
          )}
        </Formik>
      </Container>
      {/* <Footer /> */}
      </>
    
  );
};

export default LoginForm;