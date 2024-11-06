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
// Define the expected response structure for adding an organization
interface CreateOrganizationResponse {
  statuscode: number;
  message: string;
  data: Organization;
}
// Fetch all organizations
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

// Add a new organization
export const createOrganization = async (
  organization: Omit<Organization, "_id" | "org_created_at" | "org_updated_at" | "__v">
): Promise<Organization> => {
  const response = await axios.post<CreateOrganizationResponse>(
    `${API_URL}/api/superadmin/organizations/addOrganization`,
    organization
  );
  console.log(response.data);
  return response.data.data;
};