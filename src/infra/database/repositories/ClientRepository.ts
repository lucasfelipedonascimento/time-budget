import { IClientRepository } from "../../../contexts/support/clients/domain/interface/IClientRepository";
import { ClientDTO } from "../../../dto/Client";
import { database as db } from "../../database/connection";
import { clients } from "../schema/budgets/clients";
import { eq } from "drizzle-orm";

export class ClientRepository implements IClientRepository {
  async findById(id: number): Promise<ClientDTO | null> {
    const [row] = await db.select().from(clients).where(eq(clients.id, id));

    if (!row) return null;

    return row as ClientDTO;
  }
}
