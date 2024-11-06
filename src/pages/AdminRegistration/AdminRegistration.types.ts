export interface IOrganization {
  _id: string;
  org_name: string;
}

export interface ISnackbar {
  open: boolean;
  message: string;
  severity: "success" | "error";
}
export interface IRegisterResponse {
  statuscode: number;
  message: string;
}
