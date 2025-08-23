import { IVehicleRepository } from '../../../contexts/basic/domain/interfaces/IVehicleRepository'
import { VehicleDTO } from '../../../contexts/basic/domain/dto/Vehicle'
import { database as db } from '../../database/connection'
import { vehicles } from '../schema/budgets/vehicle'
import { eq } from 'drizzle-orm';

export class VehicleRepository implements IVehicleRepository {

  async findById(id: number): Promise<VehicleDTO | null> {
    const [row] = await db.select().from(vehicles).where(eq(vehicles.id, id));
    
    if (!row) return null

    return row as VehicleDTO;
  }
}