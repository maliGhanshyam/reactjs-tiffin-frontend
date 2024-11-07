import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

// const API_URL = "http://localhost:5000";
// console.log("API URL:", process.env.REACT_APP_API_URL);

export interface OrgLocation {
  loc: string;
  address: string;
  loc_contact: number;
  loc_email: string;
  admin_id: string;
  _id: string;
}

export interface Organization {
  _id: string;
  org_name: string;
  org_location: OrgLocation[];
  org_created_at: string;
  org_updated_at: string;
  isActive: boolean;
  __v: number;
}
// Define the expected response structure
interface OrganizationsResponse {
  statuscode: number;
  data: Organization[];
}
//TODO:

interface RoleSpecificDetails {
  organization_id: string;
  organization_name: string;
  approval_status: string;
}

interface UserData {
  _id: string;
  username: string;
  email: string;
  contact_number: string;
  address: string;
  role_id: string;
  role_specific_details: RoleSpecificDetails;
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
