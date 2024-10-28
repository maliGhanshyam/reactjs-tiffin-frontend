import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    const data = response.data;
    if (data.token) {
      console.log(data.token);
      localStorage.setItem("token", data.token); // Store the token in local storage
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