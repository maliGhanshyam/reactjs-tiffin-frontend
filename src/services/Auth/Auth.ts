import axios from "axios";
import { IRegisterData } from "./Auth.types";

const API_URL = process.env.REACT_APP_API_URL! || "http://localhost:5000";

export const registerAdmin = async ({
  username,
  email,
  contact_number,
  address,
  password,
  organization_id,
  role_id,
}: IRegisterData) => {
  try {
    const role_specific_details = {
      organization_id: organization_id,
      approval_status: "pending",
    };
    const response = await axios.post(`${API_URL}/api/auth/register`, {
      username,
      email,
      contact_number,
      address,
      password,
      role_specific_details,
      role_id,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// export const registerAdmin = async ({
//   username,
//   email,
//   contact_number,
//   address,
//   password,
//   organization_id,
//   role_id,
// }: IRegisterData): Promise<IRegisterResponse> => {
//   try {
//     const role_specific_details = {
//       organization_id: organization_id,
//       approval_status: "pending",
//     };

//     const response = await axios.post<IData, IRegisterResponse>(
//       `${API_URL}/api/auth/register`,
//       {
//         username,
//         email,
//         contact_number,
//         address,
//         password,
//         role_specific_details,
//         role_id,
//       }
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
