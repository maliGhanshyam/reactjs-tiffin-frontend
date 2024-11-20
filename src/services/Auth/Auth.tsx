import axios from "axios";
import { RegisterData, RegisterResponse } from "./Auth.types";

const API_URL = process.env.REACT_APP_API_URL;

export const registerAdmin = async ({
  username,
  email,
  contact_number,
  address,
  password,
  organization_id,
  role_id,
}: RegisterData): Promise<RegisterResponse> => {
  try {
    const role_specific_details = {
      organization_id: organization_id,
      approval_status: "pending",
    };

    const response = await axios.post(`${API_URL}/auth/register`, {
      username,
      email,
      contact_number,
      address,
      password,
      role_specific_details,
      role_id,
    });

    // Extract the data from the response
    const { data } = response;
    const { statuscode, message, token } = data;

    return {
      statuscode,
      message,
      token,
    };
  } catch (error) {
    throw error;
  }
};
