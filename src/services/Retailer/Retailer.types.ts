export interface Approval {
  approval_status: string;
  organization_id: string;
  istrendy?: boolean;
  _id?: string; 
}

export interface Retailer {
  user_image:string;
  role_specific_details: {
    organization_id: string;
    approval: Approval[];
  };
  _id: string;
  username: string;
  email: string;
  contact_number: string;
  address: string;
  password: string;
  isActive: boolean;
  created_at: string;
  updated_at: string;
}

export interface RetailersResponse {
  statuscode: number; 
  data: Retailer[];
}

export interface ApiResponse {
  acknowledged: boolean;
}
