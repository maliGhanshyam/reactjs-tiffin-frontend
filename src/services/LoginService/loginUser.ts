import axios from "axios";
const API_URL = "http://localhost:5000";
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/auth/login`,
      { email, password },
      { headers: { 
        "Content-Type": "application/json"
       } }
    );
    console.log("response",response);
    
    const data = response.data;
    if (data.token) {
      localStorage.setItem("token", data.token); 
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};


export const logoutUser = () => {
  localStorage.removeItem("token"); 
};

export const getToken = () => {
  return localStorage.getItem("token"); 
};