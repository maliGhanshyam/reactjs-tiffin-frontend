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

// Fetch all pending Admins
export const getPendingAdmins = async (): Promise<UserData[]> => {
  try {
    console.log(`${API_URL}/api/superadmin/pendingAdminApproval`);
    const response = await axios.get<ApiResponse>(
      `${API_URL}/api/superadmin/pendingAdminApproval`
    );
    console.log(response.data);
    return response.data.data; // Automatically wrapped in a Promise
  } catch (error) {
    console.error("Failed to fetch pending admins:", error);
    throw error; // Also automatically wrapped in a rejected Promise
  }
};


//Fetch All Approved Admins
export const getApprovedAdmins = async (): Promise<UserData[]> => { 
 try {
   console.log(`${API_URL}/api/superadmin/approvedAdminApproval`);
   const response = await axios.get<ApiResponse>(
     `${API_URL}/api/superadmin/approvedAdminApproval`
   );
   console.log(response.data);
   return response.data.data; // Automatically wrapped in a Promise
 } catch (error) {
   console.error("Failed to fetch Approved admins:", error);
   throw error; // Also automatically wrapped in a rejected Promise
 }

}
//Fetch All Approved Admins
export const getRejectedAdmins = async (): Promise<UserData[]> => { 
 try {
   console.log(`${API_URL}/api/superadmin/rejectedAdminApproval`);
   const response = await axios.get<ApiResponse>(
     `${API_URL}/api/superadmin/rejectedAdminApproval`
   );
   console.log(response.data);
   return response.data.data; // Automatically wrapped in a Promise
 } catch (error) {
   console.error("Failed to fetch Rejected admins:", error);
   throw error; // Also automatically wrapped in a rejected Promise
 }

}

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
