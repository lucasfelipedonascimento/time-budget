import { expect, test } from 'vitest';
import { faker } from '@faker-js/faker'
import { Piece } from '../../../../../src/contexts/basic/domain/entities/Piece';
import { piece as pieceMock } from '../../../../mock/piece-mock';

test('testar entidade piece com todos os campos', () => {
  const piece = new Piece(
    pieceMock.name,
    pieceMock.unit_price,
    pieceMock.quantity,
    pieceMock.id,
  )

  expect(piece.getId()).toBe(pieceMock.id);
  expect(piece.getName()).toBe(pieceMock.name);
  expect(piece.getUnitPrice()).toBe(pieceMock.unit_price);
  expect(piece.getQuantity()).toBe(pieceMock.quantity);
})

test('testar entidade piece sem id', () => {
  const piece = new Piece(
    pieceMock.name,
    pieceMock.unit_price,
    pieceMock.quantity,
  )

  expect(piece.getId()).toBeUndefined();
  expect(piece.getName()).toBe(pieceMock.name);
  expect(piece.getUnitPrice()).toBe(pieceMock.unit_price);
  expect(piece.getQuantity()).toBe(pieceMock.quantity);
})

test('deve lançar erro ao passar peça sem campo obrigatório', () => {
  expect(() => {
    new Piece(
      '',
      pieceMock.unit_price,
      pieceMock.quantity,
      pieceMock.id,
    )
  }).toThrowError('O nome é obrigatório')

  expect(() => {
    new Piece(
      pieceMock.name,
      -1,
      pieceMock.quantity,
      pieceMock.id,
    )
  }).toThrowError('Preço unitário não pode ser negativo')

  expect(() => {
    new Piece(
      pieceMock.name,
      pieceMock.unit_price,
      0,
      pieceMock.id,
    )
  }).toThrowError('Quantidade não pode ser menor ou igual a 0')
})

test('deve testar ser possível alterar dados da peça', () => {
  const piece = new Piece(
    pieceMock.name,
    pieceMock.unit_price,
    pieceMock.quantity,
    pieceMock.id,
  )

  expect(piece.getId()).toBe(pieceMock.id);
  expect(piece.getName()).toBe(pieceMock.name);
  expect(piece.getUnitPrice()).toBe(pieceMock.unit_price);
  expect(piece.getQuantity()).toBe(pieceMock.quantity);

  // alterar preço unitário
  const newUnitPrice = faker.number.float()
  piece.changeUnitPrice(newUnitPrice);
  expect(piece.getUnitPrice()).toBe(newUnitPrice)

  // alterar quantidade
  const newQuantity = faker.number.int({ min: 1, max: 10 })
  piece.changeQuantity(newQuantity);
  expect(piece.getQuantity()).toBe(newQuantity)
})