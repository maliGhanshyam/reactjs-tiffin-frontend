import { Retailer } from "../../pages/dashboard/AdminDashboard/AdminDashboard.types";

export interface RetailerInfoCardProps {
  retailer: Retailer;
  showButtons?: boolean;
  onApprove?: (retailerId: string) => void;
  onReject?: (retailerId: string) => void;
  onTrendy?: (retailerId: string) => void;
}
