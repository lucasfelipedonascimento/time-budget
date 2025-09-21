import { beforeAll, expect, test } from 'vitest';
import { Service } from '../../../../../src/contexts/basic/domain/entities/Service'
import { faker } from '@faker-js/faker'
import { service as serviceMock } from '../../../../mock/service-mock'
import { Piece } from '../../../../../src/contexts/basic/domain/entities/Piece';
import { piece as pieceMock } from '../../../../mock/piece-mock';

const piece = new Piece(
  pieceMock.name,
  pieceMock.unit_price,
  pieceMock.quantity,
  pieceMock.id,
)
let pieces: Piece[]

beforeAll(() => {
  pieces = [piece]
})

test('testar entidade service com todos os campos', () => {
  const service = new Service(
    serviceMock.name,
    serviceMock.time,
    serviceMock.unit_price,
    serviceMock.quantity,
    pieces,
    serviceMock.id,
  )

  expect(service.getId()).toBe(serviceMock.id);
  expect(service.getName()).toBe(serviceMock.name);
  expect(service.getTime()).toBe(serviceMock.time);
  expect(service.getUnitPrice()).toBe(serviceMock.unit_price);
  expect(service.getQuantity()).toBe(serviceMock.quantity);
  expect(service.getPieces()).toBe(pieces);
})

test('testar entidade service sem passar o id', () => {
  const service = new Service(
    serviceMock.name,
    serviceMock.time,
    serviceMock.unit_price,
    serviceMock.quantity,
    pieces,
  )

  expect(service.getId()).toBeUndefined();
  expect(service.getName()).toBe(serviceMock.name);
  expect(service.getTime()).toBe(serviceMock.time);
  expect(service.getUnitPrice()).toBe(serviceMock.unit_price);
  expect(service.getQuantity()).toBe(serviceMock.quantity);
  expect(service.getPieces()).toBe(pieces);
})

test('testar entidade service sem passar as peças', () => {
  const service = new Service(
    serviceMock.name,
    serviceMock.time,
    serviceMock.unit_price,
    serviceMock.quantity,
    undefined, // peças
    serviceMock.id,
  )

  expect(service.getId()).toBe(serviceMock.id);
  expect(service.getName()).toBe(serviceMock.name);
  expect(service.getTime()).toBe(serviceMock.time);
  expect(service.getUnitPrice()).toBe(serviceMock.unit_price);
  expect(service.getQuantity()).toBe(serviceMock.quantity);
  expect(service.getPieces()).toBeUndefined()
})

test("deve lançar um erro ao tentar criar um serviço sem um campo obrigatório", () => {
  expect(() => {
    new Service(
      '',
      serviceMock.time,
      serviceMock.unit_price,
      serviceMock.quantity,
      pieces, // peças
      serviceMock.id,
    )
  }).toThrowError('Os campos: nome, tempo, quantidade e preço unitário são obrigatórios')

  expect(() => {
    new Service(
      serviceMock.name,
      0, // tempo
      serviceMock.unit_price,
      serviceMock.quantity,
      pieces, // peças
      serviceMock.id,
    )
  }).toThrowError('Tempo não pode ser igual ou menor que 0')

  expect(() => {
    new Service(
      serviceMock.name,
      -1, // tempo
      serviceMock.unit_price,
      serviceMock.quantity,
      pieces, // peças
      serviceMock.id,
    )
  }).toThrowError('Tempo não pode ser igual ou menor que 0')

  expect(() => {
    new Service(
      serviceMock.name,
      serviceMock.time,
      0,
      serviceMock.quantity,
      pieces, // peças
      serviceMock.id,
    )
  }).toThrowError('O preço não pode ser menor que 0')

  expect(() => {
    new Service(
      serviceMock.name,
      serviceMock.time,
      serviceMock.unit_price,
      0,
      pieces, // peças
      serviceMock.id,
    )
  }).toThrowError('Quantidade não pode ser igual ou menor que 0')

  expect(() => {
    new Service(
      serviceMock.name,
      serviceMock.time,
      serviceMock.unit_price,
      -1,
      pieces, // peças
      serviceMock.id,
    )
  }).toThrowError('Quantidade não pode ser igual ou menor que 0')

})

test('deve adicionar uma peça na lista de peças', () => {
  const service = new Service(
    serviceMock.name,
    serviceMock.time,
    serviceMock.unit_price,
    serviceMock.quantity,
    pieces,
    serviceMock.id,
  )

  expect(service.getPieces()).toBe(pieces)

  const newPiece = new Piece(
    faker.animal.snake(),
    pieceMock.unit_price,
    pieceMock.quantity,
    faker.number.int(),
  )
  service.addPiece(newPiece);
  expect(service.getPieces()).toContain(newPiece)
})

test('deve remover uma peça na lista de peças', () => {
  const service = new Service(
    serviceMock.name,
    serviceMock.time,
    serviceMock.unit_price,
    serviceMock.quantity,
    pieces,
    serviceMock.id,
  )

  expect(service.getPieces()).toBe(pieces)
  service.removePiece(Number(piece?.getId()));
  expect(service.getPieces()).not.toContain(piece)
})

// testar os métodos de alteração
test('deve ser possível alterar dado do serviço', () => {
  const service = new Service(
    serviceMock.name,
    serviceMock.time,
    serviceMock.unit_price,
    serviceMock.quantity,
    pieces,
    serviceMock.id,
  )

  expect(service.getQuantity()).toBe(serviceMock.quantity);
  expect(service.getTime()).toBe(serviceMock.time);
  expect(service.getUnitPrice()).toBe(serviceMock.unit_price);

  // mudar quantidade
  const newQuantity = faker.number.int({ min: 1, max: 10 })
  service.changeQuantity(newQuantity)

  expect(service.getQuantity()).toBe(newQuantity)

  // mudar tempo
  const newTime = faker.number.int({ min: 1, max: 10 })
  service.changeTime(newTime)
  expect(service.getTime()).toBe(newTime)

  // mudar preço unitario
  const newUnitPrice = faker.number.float()
  service.changeUnitPrice(newUnitPrice)
  expect(service.getUnitPrice()).toBe(newUnitPrice)

  expect(service.getId()).toBe(serviceMock.id)
})

// testar adição de peça com a peça já estando adicionada
test('deve dar erro ao tentar adicionar peça já na lista novamente', () => {
  const service = new Service(
    serviceMock.name,
    serviceMock.time,
    serviceMock.unit_price,
    serviceMock.quantity,
    pieces,
    serviceMock.id,
  )

  expect(service.getPieces()).toBe(pieces)

  expect(() => {
    service.addPiece(piece)
  }).toThrowError('A Peça já está associada a este serviço')
})

// testar remoção de peça sem a mesma está na lista
test('deve dar erro ao tentar remover peça não presente na lista', () => {
  const service = new Service(
    serviceMock.name,
    serviceMock.time,
    serviceMock.unit_price,
    serviceMock.quantity,
    undefined,
    serviceMock.id,
  )

  expect(service.getPieces()).toBeUndefined()
  expect(() => {
    service.removePiece(Number(piece.getId()))
  }).toThrowError('Peça não encontrada no serviço')
})