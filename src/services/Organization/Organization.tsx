import axios from "axios";
import { Organization, OrganizationsResponse } from "./Organization.types";

const API_URL = process.env.REACT_APP_API_URL! || "http://localhost:5000";

// Fetch all organizations
export const getOrganizations = async (): Promise<Organization[]> => {
    const response = await axios.get<OrganizationsResponse>(
      `${API_URL}/api/organizations/getall`
    );
  return response.data.data;
};

