import axios from "axios";
import { Organization, UserData } from "../../Types";
import axiosInstance from "./axiosInstance";

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
    console.log(`${API_URL}/superadmin/pendingAdminApproval`);
    const response = await axiosInstance.get<ApiResponse>("/superadmin/pendingAdminApproval");
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
    console.log(`${API_URL}/superadmin/approvedAdminApproval`);
    const response = await axiosInstance.get<ApiResponse>("/superadmin/approvedAdminApproval");
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
    console.log(`${API_URL}/superadmin/rejectedAdminApproval`);
    const response = await axiosInstance.get<ApiResponse>("/superadmin/rejectedAdminApproval");
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
    console.log(`${API_URL}/superadmin/organizations/getallorganization`);
    const response = await axiosInstance.get<OrganizationsResponse>("/superadmin/organizations/getallorganization");
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
    const url = `${API_URL}/superadmin/approveadmin/${admin_id}`;
    console.log("Approving admin with URL:", url);
    await axiosInstance.put(url, {}); // Empty body for PUT request
    console.log(`Admin with ID ${admin_id} approved successfully`);
  } catch (error) {
    console.error("Failed to approve admin:", error);
    throw error;
  }
};

// Reject an admin
export const rejectAdmin = async (admin_id: string): Promise<void> => {
  try {
    const url = `${API_URL}/superadmin/rejectadmin/${admin_id}`;
    console.log("Rejected admin with URL:", url);
    await axiosInstance.put(url, {}); // Empty body for PUT request
    console.log(`Admin with ID ${admin_id} rejected successfully`);
  } catch (error) {
    console.error("Failed to reject admin:", error);
    throw error;
  }
};

// Delete an organization
export const deleteOrganization = async (id: string): Promise<void> => {
  try {
    const url = `${API_URL}/superadmin/organizations/deleteorganization/${id}`;
    console.log("Deleted Organization with URL:", url);
    await axiosInstance.delete(url);
    console.log(`Organization with ID ${id} deleted successfully`);
  } catch (error) {
    console.error("Failed to reject organization:", error);
    throw error;
  }
};
