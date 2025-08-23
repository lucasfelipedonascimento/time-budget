import { PieceDTO } from "./Piece";

export type ServiceDTO = {
  id: number;
  name: string;
  time: number;
  unit_price: number;
  quantity: number;
  pieces: PieceDTO[];
};
