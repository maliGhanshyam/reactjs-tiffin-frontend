export interface IRole {
  organization_id: string;
  approval_status: string;
}
export interface IRegisterData {
  username: string;
  email: string;
  contact_number: string;
  address: string;
  password: string;
  confirmPassword: string;
  organization_id: string;
  role_id: string;
}
export interface IData{
    username:string
    email:string
    contact_number:string
    address:string
    password:string
    role_specific_details:IRole
    role_id:string
}
export interface IAuthResponse {
  statuscode: number;
  message: string;
  token: string;
  _id: string;
}
export interface IRegisterResponse{
    data:IAuthResponse,
    status:number
}