import { IServiceRepository } from "../../../contexts/support/services/domain/interface/IServiceRepository";
import { ServiceDTO } from "../../../../src/dto/Service";
import { database as db } from "../../database/connection";
import { services } from "../schema/public/services";
import { eq } from "drizzle-orm";

export class ServiceRepository implements IServiceRepository {
  create(service: ServiceDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findById(id: number): Promise<ServiceDTO | null> {
    const [row] = await db.select().from(services).where(eq(services.id, id));

    if (!row) return null;

    const parseToServiceDTO: ServiceDTO = {
      id: row.id,
      name: row.name,
      unit_price: Number(row.unit_price),
      time: row.time,
      created_at: String(row.created_at),
      updated_at: String(row.updated_at),
    };

    return parseToServiceDTO;
  }

  findAll(): Promise<ServiceDTO[]> {
    throw new Error("Method not implemented.");
  }

  update(id: number, service: Omit<ServiceDTO, "id">): Promise<void> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
