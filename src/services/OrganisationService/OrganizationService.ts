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

//Get Token
function getToken() {
  return localStorage.getItem("token");
}

// Fetch all pending Admins
export const getPendingAdmins = async (): Promise<UserData[]> => {
  try {
    console.log(`${API_URL}/api/superadmin/pendingAdminApproval`);
    const response = await axios.get<ApiResponse>(
      `${API_URL}/api/superadmin/pendingAdminApproval`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch pending admins:", error);
    throw error;
  }
};

// Fetch all approved Admins
export const getApprovedAdmins = async (): Promise<UserData[]> => {
  try {
    console.log(`${API_URL}/api/superadmin/approvedAdminApproval`);
    const response = await axios.get<ApiResponse>(
      `${API_URL}/api/superadmin/approvedAdminApproval`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch approved admins:", error);
    throw error;
  }
};

// Fetch all rejected Admins
export const getRejectedAdmins = async (): Promise<UserData[]> => {
  try {
    console.log(`${API_URL}/api/superadmin/rejectedAdminApproval`);
    const response = await axios.get<ApiResponse>(
      `${API_URL}/api/superadmin/rejectedAdminApproval`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch rejected admins:", error);
    throw error;
  }
};

// Fetch all organizations
export const getOrganizations = async (): Promise<Organization[]> => {
  try {
    console.log(`${API_URL}/api/organizations/getall`);
    const response = await axios.get<OrganizationsResponse>(
      `${API_URL}/api/superadmin/organizations/getallorganization`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch organizations:", error);
    throw error;
  }
};
// Approve an admin
export const approveAdmin = async (admin_id: string): Promise<void> => {
  try {
    const url = `${API_URL}/api/superadmin/approveadmin/${admin_id}`;
    console.log("Approving admin with URL:", url);
    await axios.put(
      url,
      {}, // Empty body for the PUT request
      {
        headers: {
          Authorization: `Bearer ${getToken()}`, // Add the token here
        },
      }
    );
    console.log(`Admin with ID ${admin_id} approved successfully`);
  } catch (error) {
    console.error("Failed to approve admin:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
};

// Reject an admin
export const rejectAdmin = async (admin_id: string): Promise<void> => {
  try {
    const url = `${API_URL}/api/superadmin/rejectadmin/${admin_id}`;
    console.log("Rejected admin with URL:", url);
    await axios.put(
      url,
      {}, // Empty body for the PUT request
      {
        headers: {
          Authorization: `Bearer ${getToken()}`, // Add the token here
        },
      }
    );
    console.log(`Admin with ID ${admin_id} rejected successfully`);
  } catch (error) {
    console.error("Failed to reject admin:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
};
// Reject an admin
export const deleteOrganization = async (id: string): Promise<void> => {
  try {
    const url = `${API_URL}/api/superadmin/organizations/deleteorganization/${id}`;
    console.log("Deleted Organization with URL:", url);
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Add the token here
      },
    });
    console.log(`Organization with ID ${id} deleted successfully`);
  } catch (error) {
    console.error("Failed to reject organization:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
};
