export type BudgetDTO = {
  id: number;
  client_id: number;
  vehicle_id: number;
  total_value: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}