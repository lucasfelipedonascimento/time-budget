import { expect, test } from "vitest";
import { Vehicle } from '../../../../../src/contexts/basic/domain/entities/Vehicle'
import { vehicle as vehicleMock } from '../../../../mock/vehicle-mock'
import { Erros } from "../../../../../src/constants/Erros";
import { faker } from "@faker-js/faker";

test('testar entidade veículo com todos os campos', () => {
  const vehicle = new Vehicle(
    vehicleMock.plate,
    vehicleMock.brand,
    vehicleMock.model,
    vehicleMock.year,
    vehicleMock.id
  )

  expect(vehicle.getId).toBe(vehicleMock.id)
  expect(vehicle.getPlate).toBe(vehicleMock.plate)
  expect(vehicle.getBrand).toBe(vehicleMock.brand)
  expect(vehicle.getModel).toBe(vehicleMock.model)
  expect(vehicle.getYear).toBe(vehicleMock.year)
})

test('testar entidade veículo sem passar o id', () => {
  const vehicle = new Vehicle(
    vehicleMock.plate,
    vehicleMock.brand,
    vehicleMock.model,
    vehicleMock.year,
  )

  expect(vehicle.getId).toBeUndefined()
  expect(vehicle.getPlate).toBe(vehicleMock.plate)
  expect(vehicle.getBrand).toBe(vehicleMock.brand)
  expect(vehicle.getModel).toBe(vehicleMock.model)
  expect(vehicle.getYear).toBe(vehicleMock.year)
})

// testar erros

test('deve lançar erro ao não passar um campo obrigatório', () => {
  expect(() => {
    new Vehicle(
      vehicleMock.plate,
      vehicleMock.brand,
      '',
      vehicleMock.year,
      vehicleMock.id
    )
  }).toThrowError('Os campos: placa, marca, modelo e ano são obrigatórios');
})

test('deve lançar erro ao não passar a placa', () => {
  expect(() => {
    new Vehicle(
      '',
      vehicleMock.brand,
      vehicleMock.model,
      vehicleMock.year,
      vehicleMock.id
    )
  }).toThrowError('A placa é obrigatória');
})


test('deve lançar erro ao passar uma placa inválida', () => {
  expect(() => {
    new Vehicle(
      faker.vehicle.vrm(),
      vehicleMock.brand,
      vehicleMock.model,
      vehicleMock.year,
      vehicleMock.id
    )
  }).toThrowError(Erros.invalidPlate);
})

// testar métodos de alteração

test('deve alterar a placa do veículo no formato "ABC-1234"', () => {
  const vehicle = new Vehicle(
    vehicleMock.plate,
    vehicleMock.brand,
    vehicleMock.model,
    vehicleMock.year,
    vehicleMock.id
  )

  const newPlate = 'ABC-1234';
  vehicle.changePlate(newPlate);

  expect(vehicle.getPlate).toBe(newPlate);
})

test('deve alterar a placa do veículo no formato "ABC1234"', () => {
  const vehicle = new Vehicle(
    vehicleMock.plate,
    vehicleMock.brand,
    vehicleMock.model,
    vehicleMock.year,
    vehicleMock.id
  )

  const newPlate = 'ABC1234';
  vehicle.changePlate(newPlate);

  expect(vehicle.getPlate).toBe(newPlate);
})

test('deve lançar erro ao alterar a placa para um valor inválido', () => {
  const vehicle = new Vehicle(
    vehicleMock.plate,
    vehicleMock.brand,
    vehicleMock.model,
    vehicleMock.year,
    vehicleMock.id
  )

  expect(() => {
    vehicle.changePlate(faker.vehicle.vrm());
  }).toThrowError(Erros.invalidPlate);
})

test('deve lançar um erro ao tentar alterar a placa para um valor vazio', () => {
  const vehicle = new Vehicle(
    vehicleMock.plate,
    vehicleMock.brand,
    vehicleMock.model,
    vehicleMock.year,
    vehicleMock.id
  )

  expect(() => {
    vehicle.changePlate('');
  }).toThrowError('A placa é obrigatória');
})

test('deve alterar a marca do veículo', () => {
  const vehicle = new Vehicle(
    vehicleMock.plate,
    vehicleMock.brand,
    vehicleMock.model,
    vehicleMock.year,
    vehicleMock.id
  )

  const newBrand = 'Nova Marca';
  vehicle.changeBrand(newBrand);

  expect(vehicle.getBrand).toBe(newBrand);
})

test('deve lançar erro ao alterar a marca para um valor vazio', () => {
  const vehicle = new Vehicle(
    vehicleMock.plate,
    vehicleMock.brand,
    vehicleMock.model,
    vehicleMock.year,
    vehicleMock.id
  )

  expect(() => {
    vehicle.changeBrand('');
  }).toThrowError('Brand is required');
})

test('deve alterar o modelo do veículo', () => {
  const vehicle = new Vehicle(
    vehicleMock.plate,
    vehicleMock.brand,
    vehicleMock.model,
    vehicleMock.year,
    vehicleMock.id
  )

  const newModel = 'Novo Modelo';
  vehicle.changeModel(newModel);

  expect(vehicle.getModel).toBe(newModel);
})

test('deve lançar erro ao alterar o modelo para um valor vazio', () => {
  const vehicle = new Vehicle(
    vehicleMock.plate,
    vehicleMock.brand,
    vehicleMock.model,
    vehicleMock.year,
    vehicleMock.id
  )

  expect(() => {
    vehicle.changeModel('');
  }).toThrowError('Model is required');
})

test('deve alterar o ano do veículo', () => {
  const vehicle = new Vehicle(
    vehicleMock.plate,
    vehicleMock.brand,
    vehicleMock.model,
    vehicleMock.year,
    vehicleMock.id
  )

  const newYear = 2022;
  vehicle.changeYear(newYear);

  expect(vehicle.getYear).toBe(newYear);
})

test('deve lançar erro ao alterar o ano para um valor inválido', () => {
  const vehicle = new Vehicle(
    vehicleMock.plate,
    vehicleMock.brand,
    vehicleMock.model,
    vehicleMock.year,
    vehicleMock.id
  )

  expect(() => {
    vehicle.changeYear(0);
  }).toThrowError('Year is required');
})