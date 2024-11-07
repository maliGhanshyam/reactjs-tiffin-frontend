export interface Organization {
  _id: string;
  org_name: string;
}

export interface ISnackbar {
  open: boolean;
  message: string;
  severity: "success" | "error";
}
export interface RegisterResponse {
  statuscode: number;
  message: string;
}
