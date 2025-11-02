export type BudgetDTO = {
  id?: number;
  client_id: number;
  vehicle_id: number;
  total_value: string;
  status: "pending" | "approve" | "reject" | "in_progress";
  pieces?: { id: number; name: string; quantity: number; unit_price: number }[];
  services?: {
    id: number;
    name: string;
    quantity: number;
    time: string;
    unit_price: number;
    pieces?: {
      id: number;
      name: string;
      quantity: number;
      unit_price: number;
    }[];
  }[];
  created_at?: string | null;
  updated_at?: string | null;
};
