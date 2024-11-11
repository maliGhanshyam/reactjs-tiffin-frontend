export interface Props {
  title: string;
  description: string;
  status: string;
  fields?: { label: string; value: string }[];
  onApprove?: () => void;
  onReject?: () => void;
  onTrendy?: () => void;
  isTrendy?: boolean;
}
