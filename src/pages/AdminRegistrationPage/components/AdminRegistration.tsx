import React, { useState } from 'react'
import { Box, Button, Container, Grid2, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { registerAdmin } from '../../../services/Registration';

const AdminRegistration = () => {
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const organizationNames = [
    { id: 1, name: 'Neosoft-Rabale' },
    { id: 2, name: 'Neosoft-Parel' },
    { id: 3, name: 'Web Werks-Rabale' },
  ];

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      contactNumber: "",
      address: "",
      password: "",
      confirmPassword: "",
      organizationName: "",
      role: "admin"
    },
    validationSchema: Yup.object({
      username: Yup.string().min(3, 'Username must be at least 3 characters long').max(20, 'Username must be at most 20 characters long').required("Username is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      contactNumber: Yup.string()
        .matches(/^[0-9]+$/, "Must be a valid contact number")
        .length(10, 'Contact Number must be of 10 digits')
        .required("Contact Number is required"),
      address: Yup.string().required("Address is required").max(50,'Upto 50 charatcters long'),
      password: Yup.string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password can be at most 20 characters long")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
      organizationName: Yup.string().required("Organization Name is required"),
    }),
    onSubmit: (values, actions) => {
      console.log(values);
      try {
        registerAdmin(values);
        actions.resetForm();
        setSelectedOrganization('');
      } catch (error) {
        alert('Registration failed');
        console.log('Registration failed', error);
      }
    }
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 5, marginBottom: 8, display: "flex", flexDirection: "column", alignItems: "center", padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 3 }}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 2 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={12}>
              <TextField fullWidth label="Username" name='username' id='username' autoComplete='off' size="small"
                value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username} />
            </Grid2>
            <Grid2 size={12}>
              <TextField fullWidth label="Email" name='email' id='email' autoComplete='off' size="small"
                value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email} />
            </Grid2>
            <Grid2 size={12}>
              <TextField fullWidth label="Contact Number" name='contactNumber' id='contactNumber' autoComplete='off' size="small"
                value={formik.values.contactNumber} onChange={formik.handleChange} onBlur={formik.handleBlur}
                error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
                helperText={formik.touched.contactNumber && formik.errors.contactNumber} />
            </Grid2>
            <Grid2 size={12}>
              <TextField fullWidth label="Addresss" name='address' id='address' autoComplete='off' size="small"
                value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address} />
            </Grid2>
            <Grid2 size={12}>
              <Box sx={{ width: '100%' }}>
                <Select sx={{ textAlign: 'left' }} fullWidth size="small" labelId='organization' id="organisationName"
                  value={selectedOrganization}
                  onChange={(e) => {
                    setSelectedOrganization(e.target.value);
                    formik.setFieldValue('organizationName', e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.organizationName && Boolean(formik.errors.organizationName)}
                  displayEmpty
                  renderValue={(value) => {
                    if (!value) {
                      return <span style={{ color: formik.touched.organizationName && formik.errors.organizationName ? '#d32f2f' : '#616161' }}>
                        Organization Name</span>;
                    }
                    return value;
                  }}>
                  <MenuItem value="" disabled>Select an organization</MenuItem>
                  {organizationNames.map((org) => (
                    <MenuItem key={org.id} value={org.name}>{org.name}</MenuItem>
                  ))}
                </Select>

                {formik.touched.organizationName && formik.errors.organizationName && (
                  <Typography color="error" variant="caption" sx={{ display: 'block', textAlign: 'left', mt: 0.5, ml: 2 }}>
                    {formik.errors.organizationName}
                  </Typography>
                )}
              </Box>
            </Grid2>
            <Grid2 size={12}>
              <TextField fullWidth label="Password" name='password' id='password' autoComplete='off' size="small"
                value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password} />
            </Grid2>
            <Grid2 size={12}>
              <TextField fullWidth label="Confirm Password" name='confirmPassword' id='confirmPassword' autoComplete='off' size="small"
                value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword} />
            </Grid2>
          </Grid2>
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>Sign Up</Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AdminRegistration
