export interface OrgLocation1 {
  loc: string;
  address: string;
  loc_contact?: number;
  loc_email: string;
  admin_id?: string;
  _id?: string;
}

export interface AddOrganization1 {
  _id?: string;
  org_name: string;
  org_location: OrgLocation1[];
  org_created_at?: string;
  org_updated_at?: string;
  isActive?: boolean;
  __v?: number;
}
export interface OrganizationsResponse1 {
  statuscode: number;
  data: AddOrganization1[];
}
