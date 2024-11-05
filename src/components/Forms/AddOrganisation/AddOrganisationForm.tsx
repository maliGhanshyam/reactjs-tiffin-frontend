import React from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import { createOrganization } from "../../../services/OrganisationService/OrgCRUD";

// Define validation schema
const validationSchema = Yup.object().shape({
  org_name: Yup.string().required("Organization name is required"),
  org_location: Yup.array().of(
    Yup.object().shape({
      loc: Yup.string().required("Location name is required"),
      address: Yup.string().required("Address is required"),
      loc_contact: Yup.string()
        .matches(/^[0-9]{10}$/, "Contact number must be 10 digits")
        .required("Contact number is required"),
      loc_email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      admin_id: Yup.string().required("Admin ID is required"),
    })
  ),
  isActive: Yup.boolean().required("Status is required"),
});

const AddOrganisationForm = () => {
  // Function to handle form submission and call createOrganization
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: any) => {
    try {
      const response = await createOrganization(values);
      console.log("Organization created successfully:", response);
      alert("Organization created successfully!");
    } catch (error) {
      console.error("Error creating organization:", error);
      alert("Failed to create organization.");
    }
  };

  return (
    <Formik
      initialValues={{
        org_name: "",
        org_location: [
          {
            loc: "",
            address: "",
            loc_contact: "",
            loc_email: "",
            admin_id: "",
          },
        ],
        isActive: true,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit} // Use the handleSubmit function here
    >
      {({ values }) => (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Form style={{ width: "100%", maxWidth: "500px" }}>
            <div>
              <Field
                as={TextField}
                fullWidth
                name="org_name"
                label="Organization Name"
                margin="normal"
                variant="outlined"
                helperText={<ErrorMessage name="org_name" />}
              />
            </div>

            <FieldArray name="org_location">
              {({ insert, remove, push }) => (
                <div>
                  {values.org_location.map((_, index) => (
                    <Box
                      key={index}
                      mt={2}
                      mb={2}
                      p={2}
                      border={1}
                      borderRadius={1}
                      borderColor="grey.300"
                    >
                      <h4>Location {index + 1}</h4>
                      <Field
                        as={TextField}
                        fullWidth
                        name={`org_location.${index}.loc`}
                        label="Location Name"
                        margin="normal"
                        variant="outlined"
                        helperText={
                          <ErrorMessage name={`org_location.${index}.loc`} />
                        }
                      />
                      <Field
                        as={TextField}
                        fullWidth
                        name={`org_location.${index}.address`}
                        label="Address"
                        margin="normal"
                        variant="outlined"
                        helperText={
                          <ErrorMessage
                            name={`org_location.${index}.address`}
                          />
                        }
                      />
                      <Field
                        as={TextField}
                        fullWidth
                        name={`org_location.${index}.loc_contact`}
                        label="Contact Number"
                        margin="normal"
                        variant="outlined"
                        helperText={
                          <ErrorMessage
                            name={`org_location.${index}.loc_contact`}
                          />
                        }
                      />
                      <Field
                        as={TextField}
                        fullWidth
                        name={`org_location.${index}.loc_email`}
                        label="Email"
                        margin="normal"
                        variant="outlined"
                        helperText={
                          <ErrorMessage
                            name={`org_location.${index}.loc_email`}
                          />
                        }
                      />
                      <Field
                        as={TextField}
                        fullWidth
                        name={`org_location.${index}.admin_id`}
                        label="Admin ID"
                        margin="normal"
                        variant="outlined"
                        helperText={
                          <ErrorMessage
                            name={`org_location.${index}.admin_id`}
                          />
                        }
                      />
                      <Button
                        type="button"
                        variant="outlined"
                        color="secondary"
                        onClick={() => remove(index)}
                        disabled={values.org_location.length === 1}
                        style={{ marginTop: "10px" }}
                      >
                        Remove Location
                      </Button>
                    </Box>
                  ))}
                  <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    onClick={() =>
                      push({
                        loc: "",
                        address: "",
                        loc_contact: "",
                        loc_email: "",
                        admin_id: "",
                      })
                    }
                  >
                    Add Location
                  </Button>
                </div>
              )}
            </FieldArray>

            <FormControlLabel
              control={<Field as={Checkbox} name="isActive" color="primary" />}
              label="Is Active"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              Submit
            </Button>
          </Form>
        </Box>
      )}
    </Formik>
  );
};

export default AddOrganisationForm;
