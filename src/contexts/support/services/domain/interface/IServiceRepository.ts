import { ServiceDTO } from "../../../../../../src/dto/Service";

export interface IServiceRepository {
  create(service: ServiceDTO): Promise<void>;
  update(id: number, service: Omit<ServiceDTO, "id">): Promise<void>;
  findById(id: number): Promise<ServiceDTO | null>;
  findAll(): Promise<ServiceDTO[]>;
}
