import { faker } from "@faker-js/faker";

export const piece = {
  id: faker.number.int({ min: 1, max: 100 }),
  name: faker.animal.rodent(),
  unit_price: faker.number.float({ min: 1 }),
  quantity: faker.number.int({ min: 1, max: 10 }),
} 