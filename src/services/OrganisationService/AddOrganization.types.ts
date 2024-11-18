export interface AddOrgLocation {
  loc: string;
  address: string;
  loc_contact?: number;
  loc_email: string;
  admin_id?: string;
  _id?: string;
}

export interface AddOrganization {
  _id?: string;
  org_name: string;
  org_location: AddOrgLocation[];
  org_created_at?: string;
  org_updated_at?: string;
  isActive?: boolean;
  __v?: number;
}
export interface AddOrganizationsResponses {
  statuscode: number;
  data: AddOrganization[];
}
