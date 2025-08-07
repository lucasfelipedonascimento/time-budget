import { faker } from "@faker-js/faker";

export const piece = {
  id: faker.number.int({ min: 1, max: 1000 }),
  name: faker.animal.rodent(),
  time: faker.number.int(),
  unit_price: faker.number.float(),
  quantity: faker.number.int({ min: 1, max: 10 }),
} 