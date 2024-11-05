import axios from "axios";

const API_URL = "http://localhost:5000";

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
// Fetch all organizations
export const getOrganizations = async (): Promise<Organization[]> => {
  const response = await axios.get<OrganizationsResponse>(
    `${API_URL}/api/superadmin/organizations/getallorganization`
  );
  console.log("org crud", response.data);
  return response.data.data;
};
