import { VehicleDTO } from '../dto/Vehicle';

export interface IVehicleRepository {
  findById(id: number): Promise<VehicleDTO | null>;
}