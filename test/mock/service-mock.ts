import { faker } from "@faker-js/faker";

import { piece } from './piece-mock'
import { Piece } from "../../src/contexts/basic/domain/entities/Piece";

export const service = {
  id: faker.number.int({ min: 1, max: 1000 }),
  name: faker.animal.rodent(),
  time: faker.number.int(),
  unit_price: faker.number.float(),
  quantity: faker.number.int({ min: 1, max: 10 }),
  pieces: [new Piece(
    piece.id,
    piece.name,
    piece.unit_price,
    piece.quantity,
  )]
} 