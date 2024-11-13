export interface Approval {
  approval_status: string;
  organization_id: string;
  istrendy?: boolean;
  _id?: string; // Optional since it might not appear in the response
}

export interface Retailer {
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
  statuscode: number;  // Matches the API response's lowercase property name
  data: Retailer[];
}

export interface ApiResponse {
  acknowledged: boolean;
}
