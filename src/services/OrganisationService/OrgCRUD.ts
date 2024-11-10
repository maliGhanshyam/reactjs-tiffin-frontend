import axios from "axios";
import { Organization, UserData } from "../../Types";

const API_URL = process.env.REACT_APP_API_URL;

// const API_URL = "http://localhost:5000";
// console.log("API URL:", process.env.REACT_APP_API_URL);

// Define the expected response structure
interface OrganizationsResponse {
  statuscode: number;
  data: Organization[];
}

interface ApiResponse {
  statuscode: number;
  data: UserData[];
}

// Fetch all organizations
export const getAdmins = async (): Promise<UserData[]> => {
  try {
    console.log(`${API_URL}/api/superadmin/pendingAdminApproval`);
    const response = await axios.get<ApiResponse>(
      `${API_URL}/api/superadmin/pendingAdminApproval`
    );
    console.log(response.data);
    return response.data.data; // Automatically wrapped in a Promise
  } catch (error) {
    console.error("Failed to fetch admins:", error);
    throw error; // Also automatically wrapped in a rejected Promise
  }
};

// Fetch all pending Admins
export const getOrganizations = async (): Promise<Organization[]> => {
  try {
    console.log(`${API_URL}/api/organizations/getall`);
    const response = await axios.get<OrganizationsResponse>(
      `${API_URL}/api/superadmin/organizations/getallorganization`
    );
    console.log(response.data);
    return response.data.data; // Automatically wrapped in a Promise
  } catch (error) {
    console.error("Failed to fetch organizations:", error);
    throw error; // Also automatically wrapped in a rejected Promise
  }
};
