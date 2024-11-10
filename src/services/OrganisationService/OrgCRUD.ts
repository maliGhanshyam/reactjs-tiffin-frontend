import axios from "axios";
import {
  AddOrganization1,
  OrganizationsResponse1,
} from "./Organization1.types";
const API_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");

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

export const getOrganizations = async (): Promise<Organization[]> => {
  try {
    console.log(`${API_URL}/api/organizations/getall`);
    const response = await axios.get<OrganizationsResponse>(
      `${API_URL}/api/superadmin/organizations/getallorganization`
    );
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch organizations:", error);
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

    const response = await axios.post<OrganizationsResponse1>(
      `${API_URL}/api/superadmin/organizations/addOrganization`,
      filteredOrganization,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Failed to add organization:", error);
    throw error;
  }
};
