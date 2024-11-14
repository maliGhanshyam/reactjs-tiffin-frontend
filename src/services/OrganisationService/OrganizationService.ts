import axios from "axios";
import { Organization, UserData } from "../../Types";
import {
  AddOrganization1,
  OrganizationsResponse1,
} from "./Organization1.types";
import axiosInstance from "../Organization/axiosInstance";

const API_URL = process.env.REACT_APP_API_URL;
const token = getToken();

interface OrganizationsResponse {
  statuscode: number;
  data: Organization[];
}
interface getByOrganizationsResponse {
  statuscode: number;
  data: Organization;
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

export const getOrganizationById = async (organizationId: string) => {
  try {
    const response = await axiosInstance.get<getByOrganizationsResponse>(
      `${API_URL}/api/superadmin/organizations/getorganization/${organizationId}`
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
  organization: AddOrganization1
): Promise<AddOrganization1[]> => {
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

    const response = await axiosInstance.post<OrganizationsResponse1>(
      `${API_URL}/api/superadmin/organizations/addOrganization`,
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
  organization: AddOrganization1
): Promise<AddOrganization1[]> => {
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

    const response = await axiosInstance.put<AddOrganization1[]>(
      `${API_URL}/api/superadmin/organizations/updateorganization/${_id}`,
      filteredOrganization
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update organization:", error);
    throw error;
  }
};
