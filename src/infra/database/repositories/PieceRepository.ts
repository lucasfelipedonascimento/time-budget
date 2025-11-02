import { eq } from "drizzle-orm";
import { IPieceRepository } from "../../../contexts/support/pieces/domain/interface/IPieceRepository";
import { PieceDTO } from "../../../dto/Piece";
import { pieces } from "../schema/public/pieces";
import { database as db } from "../../database/connection";

export class PieceRepository implements IPieceRepository {
  create(piece: PieceDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(piece: PieceDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<PieceDTO[]> {
    throw new Error("Method not implemented.");
  }
  async findById(id: number): Promise<PieceDTO | null> {
    const [row] = await db.select().from(pieces).where(eq(pieces.id, id));

    if (!row) return null;

    const parseToPieceDTO: PieceDTO = {
      id: row.id,
      name: row.name,
      unit_price: Number(row.unit_price),
      created_at: String(row.created_at),
      updated_at: String(row.updated_at),
    };

    return parseToPieceDTO;
  }
}
