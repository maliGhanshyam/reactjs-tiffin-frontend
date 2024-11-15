import { Retailer } from "../../pages/dashboard/AdminDashboard/AdminDashboard.types";

export interface RetailerCardProps {
  retailer: Retailer;
  onApprove?: () => void;
  onReject?: () => void;
  showButtons?: boolean;
}
