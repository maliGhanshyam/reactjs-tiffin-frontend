import axios from "axios";
import {
  Organization,
  UserData,
  Pagination,
  OrganizationsResponse,
  ApiResponse,
} from "../../Types";
// import { Organization, UserData } from "../../Types";
import {
  AddOrganization,
  AddOrganizationsResponses,
} from "./AddOrganization.types";
import axiosInstance from "./axiosInstance";

const API_URL = process.env.REACT_APP_API_URL;
// const token = getToken();

// const API_URL = "http://localhost:5000";
// console.log("API URL:", process.env.REACT_APP_API_URL);

// Define the expected response structure
// interface OrganizationsResponse {
//   statuscode: number;
//   data: Organization[];
// }

// interface ApiResponse {
//   statuscode: number;
//   data: UserData[];
//   pagination: Pagination;
// }
interface AddOrganizationsResponse {
  statuscode: number;
  data: Organization[];
}
interface getByOrganizationsResponse {
  statuscode: number;
  data: Organization;
}
// interface ApiResponse {
//   statuscode: number;
//   data: UserData[];
// }

//Get Token
// function getToken() {
//   return localStorage.getItem("token");
// }

// Fetch all pending Admins
export const getPendingAdmins = async (): Promise<UserData[]> => {
  try {
    console.log(`${API_URL}/superadmin/pendingAdminApproval`);
    const response = await axiosInstance.get<ApiResponse>(
      "/superadmin/pendingAdminApproval"
    );
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch pending admins:", error);
    throw error;
  }
};
// Fetch admins with pagination and status
export const getAdminRequests = async (
  status: string,
  page: number,
  limit: number
): Promise<{ data: UserData[]; pagination: Pagination }> => {
  try {
    const url = `/superadmin/getalladminrequest?status=${status}&page=${page}&limit=${limit}`;
    console.log(`Request URL: ${url}`);

    const response = await axiosInstance.get<ApiResponse>(url);
    console.log("Response Data:", response.data);

    // Return data and pagination
    return {
      data: response.data.data,
      pagination: response.data.pagination,
    };
  } catch (error) {
    console.error("Failed to fetch admin requests:", error);
    throw error;
  }
};


// Fetch all approved Admins
export const getApprovedAdmins = async (): Promise<UserData[]> => {
  try {
    console.log(`${API_URL}/superadmin/approvedAdminApproval`);
    const response = await axiosInstance.get<ApiResponse>(
      "/superadmin/approvedAdminApproval"
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
    console.log(`${API_URL}/superadmin/rejectedAdminApproval`);
    const response = await axiosInstance.get<ApiResponse>(
      "/superadmin/rejectedAdminApproval"
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
    console.log(`${API_URL}/superadmin/organizations/getallorganization`);
    const response = await axiosInstance.get<OrganizationsResponse>(
      "/superadmin/organizations/getallorganization"
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

export const getOrganizationById = async (organizationId: string) => {
  try {
    const response = await axiosInstance.get<getByOrganizationsResponse>(
      `${API_URL}/superadmin/organizations/getorganization/${organizationId}`
    );
    return response.data.data;
  } catch (error) {
    console.error(
      `Failed to fetch organization with ID ${organizationId}:`,
      error
    );
    throw error;
  }
};

export const addOrganization = async (
  organization: AddOrganization
): Promise<AddOrganization[]> => {
  try {
    const filteredOrganization = {
      org_name: organization.org_name,
      org_location: organization.org_location.map(
        ({ loc, address, loc_contact, loc_email }) => ({
          loc,
          address,
          loc_contact,
          loc_email,
        })
      ),
    };

    const response = await axiosInstance.post<AddOrganizationsResponses>(
      `${API_URL}/superadmin/organizations/addOrganization`,
      filteredOrganization
    );
    return response.data.data;
  } catch (error) {
    console.error("Failed to add organization:", error);
    throw error;
  }
};

export const updateOrganization = async (
  _id: string,
  organization: AddOrganization
): Promise<AddOrganization[]> => {
  try {
    const filteredOrganization = {
      org_name: organization.org_name,
      org_image_url: organization.org_image_url,
      org_location: organization.org_location.map(
        ({ loc, address, loc_contact, loc_email }) => ({
          loc,
          address,
          loc_contact,
          loc_email,
        })
      ),
    };

    const response = await axiosInstance.put<AddOrganization[]>(
      `${API_URL}/superadmin/organizations/updateorganization/${_id}`,
      filteredOrganization
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update organization:", error);
    throw error;
  }
};

export const uploadOrganizationImage = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/superadmin/organizations/upload`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to upload image:", error);
    throw error;
  }
};
