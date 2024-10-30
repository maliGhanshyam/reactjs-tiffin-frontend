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

// Fetch all organizations
export const getOrganizations = async (): Promise<Organization[]> => {
  const response = await axios.get<Organization[]>(
    `${API_URL}/api/organizations/getall`
    );
    console.log(response.data);
  return response.data;
};
