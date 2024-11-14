import { ApiResponse, Retailer, RetailersResponse } from "./Retailer.types";
import axiosInstance from "./axiosInstance"; //interceptor

const API_URL = process.env.REACT_APP_API_URL!;

// Fetch pending , approved, rejected retailers with pagination
// Reusable function to fetch retailers with pagination
export const fetchRetailersWithPagination = async (
  endpoint: string,
  page: number,
  limit: number
): Promise<{ data: Retailer[]; totalPages: number }> => {
  try {
    const response = await axiosInstance.get<
      RetailersResponse & { pagination: { totalPages: number } }
    >(`${API_URL}${endpoint}?page=${page}&limit=${limit}`);

    return {
      data: response.data.data,
      totalPages: response.data.pagination.totalPages,
    };
  } catch (error) {
    throw error;
  }
};

export const getPendingRetailers = async (
  page: number,
  limit: number
): Promise<{ data: Retailer[]; totalPages: number }> => {
  return fetchRetailersWithPagination('/api/admin/pendingRetailers', page, limit);
};

export const getApprovedRetailers = async (
  page: number,
  limit: number
): Promise<{ data: Retailer[]; totalPages: number }> => {
  return fetchRetailersWithPagination('/api/admin/getapprovedRetailers', page, limit);
};

export const getRejectedRetailers = async (
  page: number,
  limit: number
): Promise<{ data: Retailer[]; totalPages: number }> => {
  return fetchRetailersWithPagination('/api/admin/getrejectedRetailers', page, limit);
};

// Approve the retailer
export const approveRetailer = async (
  retailerId: string
): Promise<ApiResponse> => {
  try {
    await axiosInstance.put(
      `${API_URL}/api/admin/approveRetailer/${retailerId}`,
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
      `${API_URL}/api/admin/rejectRetailer/${retailerId}`,
      {}
    );
    return { acknowledged: true };
  } catch (error) {
    throw error;
  }
};
export const makeTrendy = async (retailerId: string): Promise<ApiResponse> => {
  try {
    await axiosInstance.put(
      `${API_URL}/api/admin/makeretailertrendy/${retailerId}`,
      {}
    );
    return { acknowledged: true };
  } catch (error) {
    throw error;
  }
};

// Fetch all pending , approved, rejected retailers
export const getPending = async (): Promise<Retailer[]> => {
  try {
    const response = await axiosInstance.get<RetailersResponse>(
      `${API_URL}/api/admin/pendingRetailers`
    );
    console.log(response);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getApproved = async (): Promise<Retailer[]> => {
  try {
    const response = await axiosInstance.get<RetailersResponse>(
      `${API_URL}/api/admin/getapprovedRetailers`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getRejected = async (): Promise<Retailer[]> => {
  try {
    const response = await axiosInstance.get<RetailersResponse>(
      `${API_URL}/api/admin/getrejectedRetailers`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

//Search Retailer
export const searchRetailers = async (query: string): Promise<Retailer[]> => {
  try {
    const response = await axiosInstance.get<RetailersResponse>(
      `${API_URL}/api/admin/searchRetailer?query=${query}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
