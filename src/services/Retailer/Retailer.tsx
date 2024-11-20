import axiosInstance from "../OrganisationService/axiosInstance";
import { ApiResponse, Retailer, RetailersResponse } from "./Retailer.types";

const API_URL = process.env.REACT_APP_API_URL!;

// Fetch pending , approved, rejected retailers with pagination
// Reusable function to fetch retailers with pagination
export const fetchRetailersWithPagination = async (
  endpoint: string,
  page?: number,
  limit?: number
): Promise<{ data: Retailer[]; totalPages: number; totalItems: number }> => {
  try {
    const url =
      page && limit
        ? `${API_URL}/admin/${endpoint}?page=${page}&limit=${limit}`
        : `${API_URL}/admin/${endpoint}`;
    const response = await axiosInstance.get<
      RetailersResponse & {
        pagination: { totalPages: number; totalItems: number };
      }
    >(url);
    return {
      data: response.data.data,
      totalPages: response.data.pagination.totalPages,
      totalItems: response.data.pagination.totalItems,
    };
  } catch (error) {
    throw error;
  }
};

export const getPendingRetailers = async (
  page?: number,
  limit?: number
): Promise<{ data: Retailer[]; totalPages: number; totalItems: number }> => {
  return fetchRetailersWithPagination("pendingRetailers", page, limit);
};
export const getApprovedRetailers = async (
  page?: number,
  limit?: number
): Promise<{ data: Retailer[]; totalPages: number; totalItems: number }> => {
  return fetchRetailersWithPagination("getapprovedRetailers", page, limit);
};
export const getRejectedRetailers = async (
  page: number,
  limit: number
): Promise<{ data: Retailer[]; totalPages: number; totalItems: number }> => {
  return fetchRetailersWithPagination("getrejectedRetailers", page, limit);
};

// Approve the retailer
export const approveRetailer = async (
  retailerId: string
): Promise<ApiResponse> => {
  try {
    await axiosInstance.put(
      `${API_URL}/admin/approveRetailer/${retailerId}`,
      {}
    );
    return { acknowledged: true };
  } catch (error) {
    throw error;
  }
};

// Reject the retailer
export const rejectRetailer = async (
  retailerId: string
): Promise<ApiResponse> => {
  try {
    await axiosInstance.put(
      `${API_URL}/admin/rejectRetailer/${retailerId}`,
      {}
    );
    return { acknowledged: true };
  } catch (error) {
    throw error;
  }
};

//Search Retailer with query and approval_status
export const searchRetailerWithStatus = async (
  query: string,
  approval_status: string
): Promise<Retailer[]> => {
  try {
    const response = await axiosInstance.get<RetailersResponse>(
      `${API_URL}/admin/searchRetailer?query=${encodeURIComponent(
        query
      )}&approval_status=${encodeURIComponent(approval_status)}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
