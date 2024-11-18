import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  IconButton,
  Collapse,
  Container,
  Box,
  Typography,
  Alert,
  Snackbar,
  Grid2,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  addOrganization,
  getOrganizationById,
  updateOrganization,
} from "../../services/OrganisationService/OrganizationService";
import { AddOrganization } from "../../services/OrganisationService/AddOrganization.types";
import { useNavigate, useParams } from "react-router-dom";
import { ISnackbar } from "../AdminRegistration/AdminRegistration.types";
import {
  mainContainer,
  titleTypography,
  inputField,
  locationBox,
  fieldContainer,
  addButton,
  buttonGroup,
  saveButton,
  expandableBox,
} from "./AddOrganization.style";
import { useSnackbar } from "../../hook";

const validationSchema = Yup.object({
  org_name: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .required("Organization name is required"),
  org_location: Yup.array()
    .of(
      Yup.object().shape({
        loc: Yup.string().required("Branch name is required"),
        address: Yup.string()
          .min(5, "Minimum 5 characters")
          .max(50, "Maximum 50 characters")
          .required("Address is required"),
        loc_contact: Yup.number()
          .nullable()
          .integer("Contact must be an integer")
          .min(1000000000, "Mobile number should be 10 digits")
          .max(9999999999, "Mobile number should be 10 digits")
          .required("Contact is required"),
        loc_email: Yup.string()
          .email("Invalid email format")
          .required("Email is required"),
      })
    )
    .min(1, "At least one location is required"),
});

export default function AddOrganizationForm() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const { showSnackbar } = useSnackbar();
  const [initialValues, setInitialValues] = useState<AddOrganization | null>(
    null
  );
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    if (_id) {
      const fetchData = async () => {
        const data = await getOrganizationById(_id);
        if (data) {
          setInitialValues(data);
        }
      };
      fetchData();
    } else {
      setInitialValues({
        org_name: "",
        org_location: [{ loc: "", address: "", loc_contact: 0, loc_email: "" }],
      });
    }
  }, [_id]);

  const handleExpandClick = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };
  const handleSubmit = async (values: AddOrganization) => {
    try {
      if (_id) {
        await updateOrganization(_id, values);
        showSnackbar("Organization updated successfully.", "success");
      } else {
        await addOrganization(values);
        showSnackbar("Organization added successfully.", "success");
      }
      setTimeout(() => navigate("/SuperAdminDashboard"), 1000);
    } catch (error) {
      showSnackbar("An error occurred. Please try again..", "error");
    }
  };
  return initialValues ? (
    <Container component="div">
      <Box sx={mainContainer}>
        <Typography sx={titleTypography}>
          {_id ? "Update Organization" : "Add New Organization"}
        </Typography>
        <Formik
          initialValues={
            initialValues || {
              org_name: "",
              org_location: [
                {
                  loc: "",
                  address: "",
                  loc_contact: 0,
                  loc_email: "",
                },
              ],
            }
          }
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, isSubmitting, dirty }) => (
            <Form>
              <Field
                as={TextField}
                name="org_name"
                label="Organization Name"
                variant="outlined"
                error={touched.org_name && Boolean(errors.org_name)}
                helperText={touched.org_name && errors.org_name}
                sx={inputField}
              />
              <FieldArray name="org_location">
                {({ remove, push }) => (
                  <>
                    {values.org_location.map((location, index) => (
                      <Box key={index} sx={locationBox}>
                        <Box
                          sx={expandableBox}
                          onClick={() => handleExpandClick(index)}
                        >
                          <Typography sx={titleTypography}>
                            Branch: {location.loc || `Location ${index + 1}`}
                          </Typography>
                          <Box>
                            <IconButton>
                              <ExpandMoreIcon
                                sx={{
                                  transform:
                                    expanded === index
                                      ? "rotate(180deg)"
                                      : "rotate(0deg)",
                                }}
                              />
                            </IconButton>
                            {values.org_location.length > 1 && (
                              <IconButton
                                color="error"
                                onClick={() => remove(index)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            )}
                          </Box>
                        </Box>
                        <Collapse
                          in={expanded === index}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Grid2 container spacing={1} sx={{ paddingTop: 0 }}>
                            <Grid2 size={4}>
                              <Field
                                as={TextField}
                                name={`org_location[${index}].loc`}
                                label="Branch Name"
                                fullWidth
                                margin="dense"
                                variant="outlined"
                                sx={fieldContainer}
                                InputProps={{
                                  readOnly: Boolean(
                                    _id &&
                                      initialValues?.org_location[index]?.loc
                                  ),
                                }}
                              />
                              <ErrorMessage
                                name={`org_location[${index}].loc`}
                                render={(msg) => (
                                  <Typography
                                    sx={{ color: "red", fontSize: "0.875rem" }}
                                  >
                                    {msg}
                                  </Typography>
                                )}
                              />
                            </Grid2>
                            <Grid2 size={4}>
                              <Field
                                as={TextField}
                                name={`org_location[${index}].loc_contact`}
                                label="Contact"
                                fullWidth
                                margin="dense"
                                variant="outlined"
                                sx={fieldContainer}
                              />
                              <ErrorMessage
                                name={`org_location[${index}].loc_contact`}
                                render={(msg) => (
                                  <Typography
                                    sx={{ color: "red", fontSize: "0.875rem" }}
                                  >
                                    {msg}
                                  </Typography>
                                )}
                              />
                            </Grid2>
                            <Grid2 size={4}>
                              <Field
                                as={TextField}
                                name={`org_location[${index}].loc_email`}
                                label="Email"
                                fullWidth
                                margin="dense"
                                variant="outlined"
                                sx={fieldContainer}
                              />
                              <ErrorMessage
                                name={`org_location[${index}].loc_email`}
                                render={(msg) => (
                                  <Typography
                                    sx={{ color: "red", fontSize: "0.875rem" }}
                                  >
                                    {msg}
                                  </Typography>
                                )}
                              />
                            </Grid2>
                            <Grid2 size={4}>
                              <Field
                                as={TextField}
                                name={`org_location[${index}].address`}
                                label="Address"
                                fullWidth
                                margin="dense"
                                variant="outlined"
                                multiline
                                minRows={3}
                                sx={fieldContainer}
                              />
                              <ErrorMessage
                                name={`org_location[${index}].address`}
                                render={(msg) => (
                                  <Typography
                                    sx={{ color: "red", fontSize: "0.875rem" }}
                                  >
                                    {msg}
                                  </Typography>
                                )}
                              />
                            </Grid2>
                          </Grid2>
                        </Collapse>
                      </Box>
                    ))}
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      sx={addButton}
                      onClick={() =>
                        push({
                          loc: "",
                          address: "",
                          loc_contact: 0,
                          loc_email: "",
                        })
                      }
                    >
                      Add Location
                    </Button>
                  </>
                )}
              </FieldArray>
              <Box sx={buttonGroup}>
                <Button
                  variant="outlined"
                  disabled={isSubmitting}
                  onClick={() => navigate("/SuperAdminDashboard")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting || !dirty}
                  sx={saveButton}
                >
                  Save Organization
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  ) : (
    <Typography>Loading...</Typography>
  );
}
