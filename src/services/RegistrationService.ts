import axios from 'axios'
import { API_URL } from '../constants/Constants';
import { registerData } from './types/register';

export const registerAdmin = async ({username,email,contact_number,address,password,organization_id,role}:registerData) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/register`, {username,email,contact_number,address,password,organization_id,role});
        console.log(response);
        return response;
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
}
