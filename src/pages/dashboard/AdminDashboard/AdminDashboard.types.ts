export interface Approval {
  approval_status: string;
  organization_id: string;
  _id: string;
}

export interface Retailer {
  role_specific_details: {
    retailer: {
      gst_no: string;
      approval: Approval[];
    };
  };
  _id: string;
  username: string;
  email: string;
  contact_number: string;
  address: string;
  password: string;
  confirmPassword: string;
  organization_id: string;
  role: string;
  created_at: string;
  updated_at: string;
}
