import { faker } from "@faker-js/faker";
import { Client } from "../../src/contexts/support/clients/domain/entitie/Client";
import { Vehicle } from "../../src/contexts/support/vehicles/domain/entitie/Vehicle";
import { Service } from "../../src/contexts/support/services/domain/entitie/Service";
import { Piece } from "../../src/contexts/support/pieces/domain/entitie/Piece";
import { client as clientMock } from "../mock/client-mock";
import { vehicle as vehicleMock } from "../mock/vehicle-mock";
import { service as serviceMock } from "../mock/service-mock";
import { piece as pieceMock } from "../mock/piece-mock";

export const budget = {
  client: new Client(
    clientMock.cpf,
    clientMock.name,
    clientMock.email,
    clientMock.address,
    clientMock.address_number,
    clientMock.cep,
    clientMock.id
  ),
  vehicle: new Vehicle(
    vehicleMock.plate,
    vehicleMock.brand,
    vehicleMock.model,
    vehicleMock.year,
    vehicleMock.id
  ),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  pieces: [
    new Piece(
      pieceMock.name,
      pieceMock.unit_price,
      pieceMock.quantity,
      pieceMock.id
    ),
  ],
  services: [
    new Service(
      serviceMock.name,
      serviceMock.time,
      serviceMock.unit_price,
      serviceMock.quantity,
      [
        new Piece(
          pieceMock.name,
          pieceMock.unit_price,
          pieceMock.quantity,
          pieceMock.id
        ),
      ],
      serviceMock.id
    ),
  ],
  id: faker.number.int(),
};
