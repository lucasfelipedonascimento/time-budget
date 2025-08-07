import { expect, test } from 'vitest';
import { Client } from '../../../../../src/contexts/basic/domain/entities/Client'
import { faker } from '@faker-js/faker'
import { client as clientMock } from '../../../../mock/client-mock'
import { Erros } from '../../../../../src/constants/Erros';

test('testar entidade cliente com todos os campos', () => {
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

test('deve lançar erro ao tentar criar cliente sem passar endereço', () => {
  expect(() => {
    new Client(
      clientMock.cpf,
      clientMock.name,
      clientMock.email,
      '',
      clientMock.address_number,
      clientMock.cep,
      clientMock.id
    )
  }).toThrowError(Erros.allRequiredFields)
})

test('deve lançar erro ao tentar criar cliente sem passar o número da casa', () => {
  expect(() => {
    new Client(
      clientMock.cpf,
      clientMock.name,
      clientMock.email,
      clientMock.address,
      '',
      clientMock.cep,
      clientMock.id
    )
  }).toThrowError(Erros.allRequiredFields)
})

// testar os métodos de alteração

test('deve lançar erro ao tentar alterar dado do cliente para vazio', () => {
  const client = new Client(
    clientMock.cpf,
    clientMock.name,
    clientMock.email,
    clientMock.address,
    clientMock.address_number,
    clientMock.cep,
    clientMock.id
  )

  expect(() => {
    client.changeName('');
  }).toThrowError(Erros.requiredField);
})

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

test('deve alterar o email do cliente', () => {
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
  client.changeEmail(newEmail);

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

test('deve alterar o cep', () => {
  const client = new Client(
    clientMock.cpf,
    clientMock.name,
    clientMock.email,
    clientMock.address,
    clientMock.address_number,
    clientMock.cep,
    clientMock.id
  )

  const newCEP = faker.string.numeric(8);
  client.changeCEP(newCEP);

  expect(client.getCep).toBe(newCEP);
})