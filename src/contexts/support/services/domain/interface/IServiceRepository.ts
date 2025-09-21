import { ServiceDTO } from "../dto/Service";

export interface IServiceRepository {
  create(service: ServiceDTO): Promise<void>;
  update(service: ServiceDTO): Promise<void>;
  findById(id: number): Promise<ServiceDTO | null>;
  findAll(): Promise<ServiceDTO[]>;
}
