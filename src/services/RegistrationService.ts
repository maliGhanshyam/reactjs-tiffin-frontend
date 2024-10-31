import axios from 'axios'
import { API_URL } from '../constants/Constants';
import { registerData } from './types/Register.type';

export const registerAdmin = async ({username,email,contact_number,address,password,organization_id,role}:registerData) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/register`, {username,email,contact_number,address,password,organization_id,role});
        return response;
    } catch (error) {
        throw error;
    }
}
