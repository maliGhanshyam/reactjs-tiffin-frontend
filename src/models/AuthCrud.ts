//const API_URL = "http://localhost:5000"; //TODO:
const API_URL = process.env.REACT_APP_API_URL;
console.log("API URL:", API_URL);
export const loginUser = async (username: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const data = await response.json();
      if (data.token) {
          console.log(data.token);
      localStorage.setItem("token", data.token); // Store the token in session storage
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