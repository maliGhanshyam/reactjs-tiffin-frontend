import axios from "axios";
import { Retailer, RetailersResponse } from "./Retailer.types";

const API_URL = process.env.REACT_APP_API_URL! || "http://localhost:5000";

function getToken() {
  return localStorage.getItem("token");
}

// Fetch pending retailers
export const getPendingRetailers = async (
  page: number,
  limit: number
): Promise<{ data: Retailer[]; totalPages: number }> => {
  try {
    const token = getToken();
    const response = await axios.get<
      RetailersResponse & { pagination: { totalPages: number } }
    >(`${API_URL}/api/admin/pendingRetailers?page=${page}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return {
      data: response.data.data,
      totalPages: response.data.pagination.totalPages,
    };
  } catch (error) {
    throw error;
  }
};

// Fetch approved retailers
export const getApprovedRetailer = async (
  page: number,
  limit: number
): Promise<{ data: Retailer[]; totalPages: number }> => {
  try {
    const token = getToken();
    const response = await axios.get<
      RetailersResponse & { pagination: { totalPages: number } }
    >(`${API_URL}/api/admin/getapprovedRetailers?page=${page}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return {
      data: response.data.data,
      totalPages: response.data.pagination.totalPages,
    };
  } catch (error) {
    throw error;
  }
};

// Fetch rejected retailers
export const getRejectedRetailer = async (
  page: number,
  limit: number
): Promise<{ data: Retailer[]; totalPages: number }> => {
  try {
    const token = getToken();
    const response = await axios.get<
      RetailersResponse & { pagination: { totalPages: number } }
    >(`${API_URL}/api/admin/getrejectedRetailers?page=${page}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return {
      data: response.data.data,
      totalPages: response.data.pagination.totalPages,
    };
  } catch (error) {
    throw error;
  }
};

// Approve a retailer
export const approveRetailer = async (retailerId: string): Promise<void> => {
  try {
    await axios.put(
      `${API_URL}/api/admin/approveRetailer/${retailerId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

// Reject a retailer
export const rejectRetailer = async (retailerId: string): Promise<void> => {
  try {
    await axios.put(
      `${API_URL}/api/admin/rejectRetailer/${retailerId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

// ============Admin==========

export const getPendingRetail = async (): Promise<Retailer[]> => {
  try {
    const token = getToken();
    const response = await axios.get<RetailersResponse>(
      `${API_URL}/api/admin/pendingRetailers`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(response);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getApprovedRetail = async (): Promise<Retailer[]> => {
  try {
    const token = getToken();
    const response = await axios.get<RetailersResponse>(
      `${API_URL}/api/admin/getapprovedRetailers`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getRejectedRetail = async (): Promise<Retailer[]> => {
  try {
    const token = getToken();
    const response = await axios.get<RetailersResponse>(
      `${API_URL}/api/admin/getrejectedRetailers`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
