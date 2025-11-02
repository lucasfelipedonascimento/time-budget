import {
  sqlTest,
  databaseTest,
} from "../../../../infra/database/connection-test";
import { TEST_SCHEMA } from "../../../../../vitest.setup.integration";
import { pieces } from "../../../../../src/infra/database/schema/public/pieces";
import { services } from "../../../../../src/infra/database/schema/public/services";
import { serviceItems } from "../../../../../src/infra/database/schema/public/service-items";
import { vehicles } from "../../../../../src/infra/database/schema/public/vehicles";
import { clients } from "../../../../../src/infra/database/schema/public/clients";
import { faker } from "@faker-js/faker";

// cadastrar peça
async function handleCreatePiece() {
  return await databaseTest
    .insert(pieces)
    .values({
      name: "Peça Teste",
      unit_price: "100.00",
    })
    .returning({ id: pieces.id });
}
// cadastrar serviço
async function handleCreateService() {
  await databaseTest
    .insert(services)
    .values({
      name: "Serviço Teste",
      unit_price: "150.00",
    })
    .returning({ id: services.id });
}

// cadastrar serviço com peça
async function handleCreateServiceWithPiece() {
  const service = await databaseTest
    .insert(services)
    .values({
      name: "Serviço Teste 2",
      unit_price: "150.00",
    })
    .returning({ id: services.id });
  const serviceId = service[0].id;

  const serviceItem = await databaseTest
    .insert(serviceItems)
    .values({
      service_id: service[0].id,
      name: "Item de Serviço Teste 2",
      unit_price: "50.00",
    })
    .returning({ id: serviceItems.id });
  const serviceItemId = serviceItem[0].id;

  return { serviceId, serviceItemId };
}

// cadastrar veículo
async function handleCreateVehicle() {
  return await databaseTest
    .insert(vehicles)
    .values({
      plate: "ABC-1234",
      brand: "Toyota",
      model: "Corolla",
      year: "2020",
    })
    .returning({ id: vehicles.id });
}

// cadastrar cliente
async function handleCreateClient() {
  return await databaseTest
    .insert(clients)
    .values({
      name: faker.person.fullName(),
      cpf: faker.string.numeric(11),
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      address_number: faker.location.buildingNumber(),
      cep: faker.location.zipCode({ format: "#####-###" }),
    })
    .returning({ id: clients.id });
}

// testar caso de uso de cadastrar orçamento
test("testar caso de uso de cadastrar orçamento", async () => {
  // criar as tabelas necessárias para o teste

  // criar cliente
  const client = await handleCreateClient();
  const clientId = client[0].id;
  // criar veículo
  const vehicle = await handleCreateVehicle();
  const vehicleId = vehicle[0].id;
  // criar peça
  const piece = await handleCreatePiece();
  const pieceId = piece[0].id;
  // criar serviço
  const service = await handleCreateService();
  const serviceId = service[0].id;
  // criar serviço com peça
  const serviceWithPiece = await handleCreateServiceWithPiece();
  const serviceWithPieceId = serviceWithPiece.serviceId;
  const serviceItemId = serviceWithPiece.serviceItemId;

  // criar orçamento com os dados criados acima
});
