import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid2,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MenuProps, styles } from "./ProfileUpdate.styles";
import { ADMIN_ROLE_ID } from "../../constants/ROLES";
import {
  getUserByToken,
  updateProfile,
  uploadUserImage,
} from "../../services/Auth";
import { getOrganizations } from "../../services/Organization";
import login from "../../assets/LoginScreen.svg";
import { useSnackbar } from "../../hook";
import { Organization } from "../../Types";
import { ProfileResponse, User, UserResponse } from "../../services/Auth/Auth.types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { OrganizationLoc } from "../AdminRegistration/AdminRegistration.types";
import { getOrganizationById } from "../../services/Organization/Organization";

const ProfileUpdate = () => {
  const [selectedOrganization, setSelectedOrganization] = useState<string>("");
  const [organization, setOrganization] = useState<Organization[]>([]);
  const [userData, setUserData] = useState<User>();
  const [image, setImage] = useState<File | null>(null);
  const [image1, setImage1] = useState<string>("");
  const [selectedOrganizationLoc, setSelectedOrganizationLoc] = useState("");
  const [organizationLoc, setOrganizationLoc] = useState<OrganizationLoc[]>([]);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    fetchOrganization();
    fetchUserData();
  }, []);

  useEffect(() => {
    if (selectedOrganization) {
      fetchOrganizationById(selectedOrganization);
    }
  }, [selectedOrganization]);

  const fetchOrganization = async () => {
    try {
      const response = await getOrganizations();
      console.log(response);
      setOrganization(response);
    } catch (error) {
      showSnackbar("Error fetching organizations", "error");
    }
  };
  const fetchOrganizationById = async (organization_id: string) => {
    if (organization_id) {
      try {
        const response = await getOrganizationById(organization_id);
        setOrganizationLoc(response.org_location);
        setSelectedOrganizationLoc(userData?.role_specific_details.org_location || "");
        formik.setFieldValue("org_location", ""); // Clear the form value
      } catch (error) {
        showSnackbar("Error fetching organization location", "error");
      }
    } else {
      setOrganizationLoc([]); // Reset locations if no organization
    }
  };
  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const response: UserResponse = await getUserByToken();
        setUserData(response.data);
      }
    } catch (error) {
      showSnackbar("Error fetching user data", "error");
    }
  };

  // Set selectedOrganization from userData if available
  useEffect(() => {
    if (userData) {
      setSelectedOrganization(
        userData.role_specific_details?.organization_id || ""
      );
      setSelectedOrganizationLoc(
        userData.role_specific_details?.org_location || ""
      );
      setImage1(userData.user_image || "");

      formik.setFieldValue("username", userData.username || "");
      formik.setFieldValue("email", userData.email || "");
      formik.setFieldValue("contact_number", userData.contact_number || "");
      formik.setFieldValue("address", userData.address || "");
      formik.setFieldValue(
        "organization_id",
        userData.role_specific_details?.organization_id || ""
      );
      formik.setFieldValue(
        "org_location",
        userData.role_specific_details?.org_location || ""
      );
      formik.setFieldValue("user_image", userData.user_image || "");
    }
  }, [userData]);

  const formik = useFormik({
    enableReinitialize: true, // Reinitialize Formik when userData changes
    initialValues: {
      user_image: image1 || "",
      username: userData?.username || "",
      email: userData?.email || "",
      contact_number: userData?.contact_number || "",
      address: userData?.address || "",
      organization_id: selectedOrganization || "",
      org_location: selectedOrganizationLoc || "",
      approval_status:userData?.role_specific_details?.approval_status||"",
      role_id: userData?.role_id || ADMIN_ROLE_ID,
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
      organization_id: Yup.string().required("Organization is required"),
    }),
    onSubmit: async (values, actions) => {
      try {
        const res: ProfileResponse = await updateProfile(userId!, values);
        if (res.statusCode === 200) {
          showSnackbar("Profile updated successfully.", "success");
        }
      } catch (error) {
        showSnackbar("Error updating profile", "error");
      }
    },
  });
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // first file selected
    if (file) {
      setImage(file);
    }
  };
  const handleImageUpload = async () => {
    if (!image) {
      showSnackbar("Please select an image first", "error");
      return;
    }
    try {
      const res = await uploadUserImage(image!);
      setImage1(res.image);
      setUserData((prevUserData: any) => ({
        ...prevUserData,
        user_image: res.image, // Update userData directly instead of fetchUserData
      }));
      showSnackbar("Image uploaded successfully!", "success");
    } catch (error) {
      showSnackbar("Failed to upload image.", "error");
    }
  };
  return (
    <Grid2 container size={12}>
      <Grid2 size={7} sx={styles.svgGrid}>
        <Box sx={styles.svgBox}>
          <img
            src={login}
            alt="profile"
            style={{
              width: 600,
              height: 600,
              objectFit: "contain",
            }}
          />
        </Box>
      </Grid2>
      <Grid2
        size={{ xs: 12, sm: 4 }}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box sx={styles.container}>
          <Typography
            component="h1"
            variant="h5"
            align="center"
            sx={styles.heading}
          >
            Profile Update
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 2 }}
          >
            <Grid2 container spacing={2} sx={{ justifyContent: "center" }}>
              <Grid2 size={10}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    style={{ display: "none" }}
                    id="profile-image-upload"
                  />
                  {userData ? (
                    <img
                      src={
                        userData.user_image || "https://via.placeholder.com/150"
                      }
                      alt="profile"
                      onClick={() =>
                        document.getElementById("profile-image-upload")?.click()
                      }
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/150"
                      alt="placeholder"
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  )}

                  <Button
                    onClick={handleImageUpload}
                    size="small"
                    variant="contained"
                    color="info"
                    sx={{ paddingX: "28px" }}
                  >
                    Upload
                  </Button>
                </Box>
              </Grid2>

              <Grid2 size={10}>
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
                    formik.touched.username && typeof formik.errors.username==="string"?formik.errors.username:null
                  }
                />
              </Grid2>
              <Grid2 size={10}>
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
                  helperText={formik.touched.email && typeof formik.errors.email==="string"?formik.errors.email:null}
                />
              </Grid2>
              <Grid2 size={10}>
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
                  helperText={formik.touched.contact_number && typeof formik.errors.contact_number==="string"?formik.errors.contact_number:null}
                />
              </Grid2>
              <Grid2 size={10}>
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
                  helperText={formik.touched.address && typeof formik.errors.address==="string"?formik.errors.address:null}
                />
              </Grid2>
              <Grid2 size={10}>
                <Box sx={{ width: "100%" }}>
                  <Select
                    sx={{ textAlign: "left" }}
                    fullWidth
                    size="small"
                    labelId="organization"
                    id="organizationName"
                    disabled={true}
                    value={
                      formik.values.organization_id || selectedOrganization
                    }
                    MenuProps={MenuProps}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      setSelectedOrganization(selectedId); // Update the local state
                      formik.setFieldValue("organization_id", selectedId); // Update Formik value
                    }}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.organization_id &&
                      Boolean(formik.errors.organization_id)
                    }
                    displayEmpty
                    renderValue={(value) => {
                      if (value) {
                        // Find the organization name based on the selected organization_id
                        const selectedOrg = organization.find(
                          (org) => org._id === value
                        );
                        return selectedOrg ? selectedOrg.org_name : "";
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
                </Box>
              </Grid2>
              <Grid2 size={10}>
                <Box sx={{ width: "100%" }}>
                  <Select
                    sx={{ textAlign: "left" }}
                    fullWidth
                    size="small"
                    labelId="orgnization_location"
                    id="org_location"
                    value={
                      formik.values.org_location || selectedOrganizationLoc
                    }
                    MenuProps={MenuProps}
                    onChange={(e) => {
                      const selectedLocation = e.target.value;
                      setSelectedOrganizationLoc(selectedLocation);
                      formik.setFieldValue("org_location", selectedLocation);
                    }}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.org_location &&
                      Boolean(formik.errors.org_location)
                    }
                    displayEmpty
                    renderValue={(value) => {
                      if (value) {
                        return value;
                      }
                      return (
                        <Typography
                          sx={
                            formik.touched.org_location &&
                            formik.errors.org_location
                              ? styles.organizationError
                              : styles.organizationPlaceholder
                          }
                        >
                          Organization Location
                        </Typography>
                      );
                    }}
                  >
                    <MenuItem value="" disabled>
                      Select a location
                    </MenuItem>
                    {organizationLoc.map((orgLoc: OrganizationLoc) => (
                      <MenuItem
                        key={orgLoc._id}
                        value={orgLoc.loc}
                        sx={{ overflowY: "auto" }}
                      >
                        {orgLoc.loc}
                      </MenuItem>
                    ))}
                  </Select>

                  {formik.touched.org_location &&
                    formik.errors.org_location && (
                      <Typography
                        color="error"
                        variant="caption"
                        sx={styles.errorText}
                      >
                        {formik.errors.org_location}
                      </Typography>
                    )}
                </Box>
              </Grid2>
              <Grid2 size={10}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={styles.button}
                >
                  Save Changes
                </Button>
              </Grid2>
            </Grid2>
          </Box>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default ProfileUpdate;
