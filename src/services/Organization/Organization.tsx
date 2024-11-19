import { Organization, OrganizationResponse, OrganizationsResponse } from "./Organization.types";
import axiosInstance from "../OrganisationService/axiosInstance";

const API_URL = process.env.REACT_APP_API_URL!;

// Fetch all organizations
export const getOrganizations = async (): Promise<Organization[]> => {
  try {
    const response = await axiosInstance.get<OrganizationsResponse>(
      `${API_URL}/superadmin/organizations/getallorganization`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export const getOrganizationById = async (orgId: string): Promise<Organization> => {
  try {
    const response = await axiosInstance.get<OrganizationResponse>(
      `${API_URL}/superadmin/organizations/getOrganization/${orgId}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
