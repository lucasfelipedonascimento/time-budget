import { ClientDTO } from '../dto/Client';

export interface IClientRepository {
  findById(id: number): Promise<ClientDTO | null>;
}