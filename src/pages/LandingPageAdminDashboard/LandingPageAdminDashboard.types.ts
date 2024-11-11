export interface ISnackbar {
    open: boolean;
    message: string;
    severity: "success" | "error";
  }
export interface ApiResponse {
  acknowledged: boolean;
}
