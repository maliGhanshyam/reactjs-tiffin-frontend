import { Organization } from "../Types";
 import { UserData } from "../Types";

 // ApiResponse interface
export interface ApiResponse {
  statuscode: number;
  data: UserData[];
  pagination: Pagination;
}

 //OrganizationsResponse interface
export interface OrganizationsResponse {
  statuscode: number;
  data: Organization[];
  pagination: Pagination;
}

// Pagination interface
export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}