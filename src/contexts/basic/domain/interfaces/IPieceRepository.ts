import { PieceDTO } from "../dto/Piece";

export interface IPieceRepository {
  create(piece: PieceDTO): Promise<void>;
  update(piece: PieceDTO): Promise<void>;
  findById(id: number): Promise<PieceDTO | null>;
  findAll(): Promise<PieceDTO[]>;
}
