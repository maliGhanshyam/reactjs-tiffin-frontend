import axios from "axios";
import { Organization, OrganizationsResponse } from "./Organization.types";

const API_URL = process.env.REACT_APP_API_URL! || "http://localhost:5000";

// Fetch all organizations
export const getOrganizations = async (): Promise<Organization[]> => {
  try {
    const response = await axios.get<OrganizationsResponse>(
      `${API_URL}/api/superadmin/organizations/getallorganization`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};