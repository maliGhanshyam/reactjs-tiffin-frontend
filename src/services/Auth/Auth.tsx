import axios from "axios";
import { RegisterData, RegisterResponse, UserResponse } from "./Auth.types";
import axiosInstance from "../OrganisationService/axiosInstance";

const API_URL = process.env.REACT_APP_API_URL! || "http://localhost:5000/api";

export const registerAdmin = async ({
  username,
  email,
  contact_number,
  address,
  password,
  organization_id,
  role_id,
}: RegisterData): Promise<RegisterResponse> => {
  try {
    const role_specific_details = {
      organization_id: organization_id,
      approval_status: "pending",
    };

    const response = await axios.post(`${API_URL}/auth/register`, {
      username,
      email,
      contact_number,
      address,
      password,
      role_specific_details,
      role_id,
    });

    // Extract the data from the response
    const { data } = response;
    const { statuscode, message, token } = data;

    return {
      statuscode,
      message,
      token,
    };
  } catch (error) {
    throw error;
  }
};

export const uploadUserImage = async (userid: string, imgData: File) => {
  try {
    const formData = new FormData();
    formData.append("recfile", imgData);
    const token = localStorage.getItem("token");
    console.log(token);
    console.log(formData);
    const response = await axios.post(
      `${API_URL}/auth/uploaduserimage/${userid}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error uploading user image:", error);
    throw new Error("Failed to upload image");
  }
};

export const getUserByToken = async (): Promise<UserResponse> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token is missing");
    const response = await axiosInstance.get<UserResponse>(
      `${API_URL}/auth/getuserbytoken`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to get user");
  }
};
