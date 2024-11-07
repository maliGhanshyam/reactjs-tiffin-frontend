import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL!|| "http://localhost:5000";

function getToken(){
  return localStorage.getItem('token');
}

export const getPendingRetailers = async () => {
  try {
    const token=getToken();
    const response = await axios.get(`${API_URL}/api/admin/pendingRetailers`,{
      headers: { Authorization: `Bearer ${token}` },
  });
    // console.log(response.data.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getApprovedRetailer = async () => {
    try {
      const token=getToken();
      const response = await axios.get(`${API_URL}/api/admin/getapprovedRetailers`,{
        headers: { Authorization: `Bearer ${token}` },
    });
      // console.log(response.data.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  export const getRejectedRetailer = async () => {
    try {
      const token=getToken();
      const response = await axios.get(`${API_URL}/api/admin/getrejectedRetailers`,{
        headers: { Authorization: `Bearer ${token}` },
    });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const approveRetailer = async (retailerId: string) => {
  return await axios.put(`${API_URL}/api/admin/approveRetailer/${retailerId}`, {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const rejectRetailer = async (retailerId: string) => {
  return await axios.put(`${API_URL}/api/admin/rejectRetailer/${retailerId}`, {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

