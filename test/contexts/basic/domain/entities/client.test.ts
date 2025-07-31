import { expect, test } from 'vitest';
import { Client } from '../../../../../src/contexts/basic/domain/entities/Client'
import { faker } from '@faker-js/faker'
import { client as clientMock } from '../../../../mock/client-mock'
import { Erros } from '../../../../../src/constants/Erros';

const CPF = '12345678909';
const CEP = '12345678';
const EMAIL = 'fulano@gmail.com'

test('testar entidade cliente com todos os campos certos', () => {
  const client = new Client(
    clientMock.cpf,
    clientMock.name,
    clientMock.email,
    clientMock.address,
    clientMock.address_number,
    clientMock.cep,
    clientMock.id
  )

  expect(client.getId).toBe(clientMock.id);
  expect(client.getCPF).toBe(clientMock.cpf);
  expect(client.getName).toBe(clientMock.name);
  expect(client.getEmail).toBe(clientMock.email);
  expect(client.getAddress).toBe(clientMock.address);
  expect(client.getAddressNumber).toBe(clientMock.address_number);
  expect(client.getCep).toBe(clientMock.cep);
})

test('testar entidade cliente sem passar o id', () => {
  const client = new Client(
    clientMock.cpf,
    clientMock.name,
    clientMock.email,
    clientMock.address,
    clientMock.address_number,
    clientMock.cep
  )

  expect(client.getCPF).toBe(clientMock.cpf);
  expect(client.getName).toBe(clientMock.name);
  expect(client.getEmail).toBe(clientMock.email);
  expect(client.getAddress).toBe(clientMock.address);
  expect(client.getAddressNumber).toBe(clientMock.address_number);
  expect(client.getCep).toBe(clientMock.cep);
})

test("deve lançar um erro ao tentar criar um cliente sem cpf", () => {
  expect(() => {
    new Client(
      '',
      faker.person.fullName(),
      faker.internet.email(),
      faker.location.streetAddress(),
      faker.location.buildingNumber(),
      faker.location.zipCode(),
      faker.number.int({ min: 1, max: 1000 })
    )
  }).toThrowError('CPF cannot be null or undefined')
})

test('deve lançar um erro ao não passar o email do cliente', () => {
  expect(() => {
    new Client(
      clientMock.cpf,
      clientMock.name,
      '',
      clientMock.address,
      clientMock.address_number,
      clientMock.cep,
      clientMock.id
    )
  }).toThrowError(Erros.invalidEmail)
})

test('deve lançar erro ao tentar criar cliente sem passar um campo obrigatório', () => {
  expect(() => {
    new Client(
      clientMock.cpf,
      '',
      clientMock.email,
      clientMock.address,
      clientMock.address_number,
      clientMock.cep,
      clientMock.id
    )
  }).toThrowError(Erros.allRequiredFields)
})

test('deve lançar erro ao tentar criar cliente com cep inválido', () => {
  expect(() => {
    new Client(
      clientMock.cpf,
      clientMock.name,
      clientMock.email,
      clientMock.address,
      clientMock.address_number,
      '1234',
      clientMock.id
    )
  }).toThrowError(Erros.invalidCep)
})

// testar os métodos de alteração

test('deve alterar o nome do cliente', () => {
  const client = new Client(
    clientMock.cpf,
    clientMock.name,
    clientMock.email,
    clientMock.address,
    clientMock.address_number,
    clientMock.cep,
    clientMock.id
  )

  const newName = faker.person.fullName();
  client.changeName(newName);

  expect(client.getName).toBe(newName);
})

// consertar
test.skip('deve alterar o email do cliente', () => {
  const client = new Client(
    clientMock.cpf,
    clientMock.name,
    clientMock.email,
    clientMock.address,
    clientMock.address_number,
    clientMock.cep,
    clientMock.id
  )

  const newEmail = faker.internet.email();
  client.changeName(newEmail);

  expect(client.getEmail).toBe(newEmail);
})

test('deve alterar o cpf', () => {
  const client = new Client(
    clientMock.cpf,
    clientMock.name,
    clientMock.email,
    clientMock.address,
    clientMock.address_number,
    clientMock.cep,
    clientMock.id
  )

  const newCpf = faker.string.numeric(11);
  client.changeCPF(newCpf);

  expect(client.getCPF).toBe(newCpf);
})

test('deve alterar o endereço', () => {
  const client = new Client(
    clientMock.cpf,
    clientMock.name,
    clientMock.email,
    clientMock.address,
    clientMock.address_number,
    clientMock.cep,
    clientMock.id
  )

  const newAddress = faker.location.streetAddress();
  client.changeAddress(newAddress);

  expect(client.getAddress).toBe(newAddress);
})

test('deve alterar o número da casa', () => {
  const client = new Client(
    clientMock.cpf,
    clientMock.name,
    clientMock.email,
    clientMock.address,
    clientMock.address_number,
    clientMock.cep,
    clientMock.id
  )

  const newAddressNumber = faker.location.buildingNumber();
  client.changeAddressNumber(newAddressNumber);

  expect(client.getAddressNumber).toBe(newAddressNumber);
})