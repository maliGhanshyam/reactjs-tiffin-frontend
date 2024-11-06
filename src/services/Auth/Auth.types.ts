export interface RegisterData {
  username: string;
  email: string;
  contact_number: string;
  address: string;
  password: string;
  confirmPassword: string;
  organization_id: string;
  role_id: string;
}
export interface RegisterResponse {
  statuscode: number;
  message: string;
  token?: string;
}