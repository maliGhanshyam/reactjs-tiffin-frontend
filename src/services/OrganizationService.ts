import axios from "axios"
import { API_URL } from "../constants/Constants";

export const getAllOrganization = async () => {
    try{
        const response= await axios.get(`${API_URL}/api/organizations/getall`);
        return response.data;
    }catch(error){
        throw error;
    }
}