import axios from "axios";
import { registerData } from "./Auth.types";

const API_URL = process.env.REACT_APP_API_URL! || "http://localhost:5000";

export const registerAdmin = async ({
  username,
  email,
  contact_number,
  address,
  password,
  organization_id,
  role_id,
}: registerData) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, {
      username,
      email,
      contact_number,
      address,
      password,
      organization_id,
      role_id,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
