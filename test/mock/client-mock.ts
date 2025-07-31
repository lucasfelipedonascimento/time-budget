import { faker } from "@faker-js/faker";

export const client = {
  cpf: "12345678909",
  name: faker.person.fullName(),
  email: faker.internet.email(),
  address: faker.location.streetAddress(),
  address_number: faker.location.buildingNumber(),
  cep: "12345678",
  id: faker.number.int({ min: 1, max: 1000 }),
} 