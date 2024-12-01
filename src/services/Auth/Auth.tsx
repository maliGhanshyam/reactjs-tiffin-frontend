import {
  Profile,
  ProfileResponse,
  RegisterData,
  RegisterResponse,
  UserResponse,
} from "./Auth.types";
import axiosInstance from "../OrganisationService/axiosInstance";

const API_URL = process.env.REACT_APP_API_URL!;

export const registerAdmin = async ({
  username,
  email,
  contact_number,
  address,
  password,
  organization_id,
  org_location,
  role_id,
}: RegisterData): Promise<RegisterResponse> => {
  try {
    const role_specific_details = {
      organization_id: organization_id,
      approval_status: "pending",
      org_location: org_location,
    };

    const response = await axiosInstance.post(`${API_URL}/auth/register`, {
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
    const { statusCode, message, token } = data;

    return {
      statusCode,
      message,
      token,
    };
  } catch (error) {
    throw error;
  }
};

export const uploadUserImage = async (imgData: File) => {
  try {
    const formData = new FormData();
    formData.append("recfile", imgData);
    const token = localStorage.getItem("token");
    const response = await axiosInstance.post(
      `${API_URL}/auth/uploaduserimage`,
      formData
    );
    return response.data;
  } catch (error) {
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
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get user");
  }
};
export const updateProfile = async (
  userid: string,
  {
    user_image,
    username,
    email,
    contact_number,
    address,
    organization_id,
    org_location,
    approval_status,
    role_id,
  }: Profile
): Promise<ProfileResponse> => {
  try {
    const role_specific_details = {
      organization_id: organization_id,
      org_location: org_location,
      approval_status: approval_status,
    };

    const response = await axiosInstance.put(
      `${API_URL}/auth/updateprofile/${userid}`,
      {
        user_image,
        username,
        email,
        contact_number,
        address,
        role_specific_details,
        role_id,
      }
    );

    // Extract the data from the response
    const { data } = response;
    console.log(data);
    const { statusCode, message, token } = data;

    return {
      statusCode,
      message,
      token,
    };
  } catch (error) {
    throw error;
  }
};
