import { ServiceDTO } from "./Service";
import { PieceDTO } from "./Piece";

export type BudgetDTO = {
  id: number;
  client_id: number;
  vehicle_id: number;
  total_value: string;
  status: "pending" | "approve" | "reject" | "in_progress";
  created_at: Date | null;
  updated_at: Date | null;
  services: ServiceDTO[];
  pieces: PieceDTO[];
};
