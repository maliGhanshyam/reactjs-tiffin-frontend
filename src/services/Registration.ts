import axios from 'axios'
import { API_URL } from '../constants/Constants';
import { registerData } from './types/register';

export const registerAdmin = async (registerData: registerData) => {
    try {
        console.log(registerData)
        const response = await axios.post(`${API_URL}/register`, registerData);
        return response.data;
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
}
