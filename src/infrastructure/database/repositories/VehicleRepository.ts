import { TABLE } from '../../../constants/Table';
import { IVehicleRepository } from '../../../contexts/basic/domain/interfaces/IVehicleRepository'
import { Client as PgClient } from 'pg'
import { VehicleDTO } from '../../../contexts/basic/domain/dto/Vehicle'

export class VehicleRepository implements IVehicleRepository {
  private client: PgClient;

  constructor(client: PgClient) {
    this.client = client;
  }

  async findById(id: number): Promise<VehicleDTO | null> {
    const result = await this.client.query(`SELECT * FROM ${TABLE.vehicles} WHERE id = $1`, [id]);

    if (result.rows.length > 0) {
      return result.rows[0];
    }

    return null;
  }
}