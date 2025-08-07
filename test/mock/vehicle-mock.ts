import { faker } from "@faker-js/faker";

export const vehicle = {
  id: faker.number.int({ min: 1, max: 1000 }),
  plate: 'HTK-3744',
  brand: faker.vehicle.manufacturer(),
  model: faker.vehicle.model(),
  year: faker.number.int({ min: 2000, max: 2023 }),
}