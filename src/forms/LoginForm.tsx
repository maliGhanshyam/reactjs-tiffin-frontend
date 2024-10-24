import React from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import theme from "../materialUI/theme";
import { loginUser } from "../models/AuthCrud";
// import Navbar from "../Navbar/navbar";
// import Footer from "../Footer/Footer";
import { Formik, Form, FormikHelpers } from "formik";
// import { Formik } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  interface LoginData {
    username: string;
    password: string;
  }

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Username is required"),
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Password is required"),
  });

  const navigate = useNavigate();

  const handleSubmit = async (
    loginData: LoginData,
    { setSubmitting, setStatus }: FormikHelpers<LoginData>
  ) => {
    try {
      const response = await loginUser(loginData.username, loginData.password);
      if (response && (response as { token?: string }).token) {
        console.log("Login successful:", response);
        setStatus({ success: true });
        navigate("/cards");
      }
    } catch (error) {
      setStatus({ success: false, message: "Invalid credentials" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleChange, handleBlur, values, errors, touched, status }) => (
            <Form>
              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    helperText={touched.username && errors.username}
                    error={touched.username && Boolean(errors.username)}
                  />
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
                {status?.message && (
                  <Grid item xs={12}>
                    <Typography color="error" align="center">
                      {status.message}
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Container>
      {/* <Footer /> */}
    </ThemeProvider>
  );
};

export default LoginForm;


