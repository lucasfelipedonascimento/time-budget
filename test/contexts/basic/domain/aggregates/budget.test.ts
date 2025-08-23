import { expect, test } from "vitest";
import { Vehicle } from '../../../../../src/contexts/basic/domain/entities/Vehicle'
import { vehicle as vehicleMock } from '../../../../mock/vehicle-mock'
import { client as clientMock } from '../../../../mock/client-mock'
import { budget as budgetMock } from '../../../../mock/budget-mock'
import { faker } from "@faker-js/faker";
import { Budget } from '../../../../../src/contexts/basic/domain/aggregates/Budget'
import { Client } from "../../../../../src/contexts/basic/domain/entities/Client";
import { Service } from "../../../../../src/contexts/basic/domain/entities/Service";
import { Piece } from "../../../../../src/contexts/basic/domain/entities/Piece";
import { STATUS } from "../../../../../src/constants/Status";
import { piece as pieceMock } from "../../../../mock/piece-mock";

let newClient: Client
let newVehicle: Vehicle 
let newService: Service
let newPiece: Piece

newClient = new Client(
  clientMock.cpf,
  clientMock.name,
  clientMock.email,
  clientMock.address,
  clientMock.address_number,
  clientMock.cep,
  clientMock.id
)

newVehicle = new Vehicle(
  vehicleMock.plate,
  vehicleMock.brand,
  vehicleMock.model,
  vehicleMock.year,
  vehicleMock.id
)

newPiece = new Piece(
  faker.animal.cat(),
  faker.number.float({ min: 1 }),
  faker.number.int({ min: 1, max: 10 }),
  faker.number.int({ min: 1 }),
)

newService = new Service(
  faker.animal.cetacean(),
  faker.number.int(),
  faker.number.float({ min: 1 }),
  faker.number.int({ min: 1, max: 10 }),
  [newPiece],
  faker.number.int({ min: 1 }),
)

test('testar agregado budget com todos os campos', () => {
  const budget = new Budget(
    budgetMock.client,
    budgetMock.vehicle,
    budgetMock.created_at, // create
    budgetMock.updated_at, // update
    budgetMock.services,
    budgetMock.pieces,
    budgetMock.id,
  )

  expect(budget.getId()).toBe(budgetMock.id)
  expect(budget.getStatus()).toBe(STATUS.PENDING)
  expect(budget.getClient()).toBe(budgetMock.client)
  expect(budget.getVehicle()).toBe(budgetMock.vehicle)
  expect(budget.getCreatedAt()).toBe(budgetMock.created_at)
  expect(budget.getUpdatedAt()).toBe(budgetMock.updated_at)
  expect(budget.getServices()).toBe(budgetMock.services)
  expect(budget.getPieces()).toBe(budgetMock.pieces)
  expect(budget.getTotalAmount()).not.toBe(0)
})

test('testar agregado budget sem o id', () => {
  const budget = new Budget(
    budgetMock.client,
    budgetMock.vehicle,
    budgetMock.created_at, // create
    budgetMock.updated_at, // update
    budgetMock.services,
    budgetMock.pieces,
  )

  expect(budget.getId()).toBeUndefined()
  expect(budget.getStatus()).toBe(STATUS.PENDING)
  expect(budget.getClient()).toBe(budgetMock.client)
  expect(budget.getVehicle()).toBe(budgetMock.vehicle)
  expect(budget.getCreatedAt()).toBe(budgetMock.created_at)
  expect(budget.getUpdatedAt()).toBe(budgetMock.updated_at)
  expect(budget.getServices()).toBe(budgetMock.services)
  expect(budget.getPieces()).toBe(budgetMock.pieces)
  expect(budget.getTotalAmount()).not.toBe(0)
})

test('testar agregado budget sem os serviços', () => {
  const budget = new Budget(
    budgetMock.client,
    budgetMock.vehicle,
    budgetMock.created_at,
    budgetMock.updated_at,
    undefined, // serviços
    budgetMock.pieces,
    budgetMock.id
  )

  expect(budget.getId()).toBe(budgetMock.id)
  expect(budget.getStatus()).toBe(STATUS.PENDING)
  expect(budget.getClient()).toBe(budgetMock.client)
  expect(budget.getVehicle()).toBe(budgetMock.vehicle)
  expect(budget.getCreatedAt()).toBe(budgetMock.created_at)
  expect(budget.getUpdatedAt()).toBe(budgetMock.updated_at)
  expect(budget.getServices()).toEqual([])
  expect(budget.getPieces()).toBe(budgetMock.pieces)
  expect(budget.getTotalAmount()).not.toBe(0)
})

test('testar agregado budget sem os serviços e sem id', () => {
  const budget = new Budget(
    budgetMock.client,
    budgetMock.vehicle,
    budgetMock.created_at,
    budgetMock.updated_at,
    undefined, // serviços
    budgetMock.pieces,
  )

  expect(budget.getId()).toBeUndefined()
  expect(budget.getStatus()).toBe(STATUS.PENDING)
  expect(budget.getClient()).toBe(budgetMock.client)
  expect(budget.getVehicle()).toBe(budgetMock.vehicle)
  expect(budget.getCreatedAt()).toBe(budgetMock.created_at)
  expect(budget.getUpdatedAt()).toBe(budgetMock.updated_at)
  expect(budget.getServices()).toEqual([])
  expect(budget.getPieces()).toBe(budgetMock.pieces)
  expect(budget.getTotalAmount()).not.toBe(0)
})

test('testar agregado budget sem as peças', () => {
  const budget = new Budget(
    budgetMock.client,
    budgetMock.vehicle,
    budgetMock.created_at,
    budgetMock.updated_at,
    budgetMock.services, 
    undefined, // peças
    budgetMock.id
  )

  expect(budget.getId()).toBe(budgetMock.id)
  expect(budget.getStatus()).toBe(STATUS.PENDING)
  expect(budget.getClient()).toBe(budgetMock.client)
  expect(budget.getVehicle()).toBe(budgetMock.vehicle)
  expect(budget.getCreatedAt()).toBe(budgetMock.created_at)
  expect(budget.getUpdatedAt()).toBe(budgetMock.updated_at)
  expect(budget.getServices()).toBe(budgetMock.services)
  expect(budget.getPieces()).toEqual([])
  expect(budget.getTotalAmount()).not.toBe(0)
})

test('testar agregado budget sem as peças e sem o id', () => {
  const budget = new Budget(
    budgetMock.client,
    budgetMock.vehicle,
    budgetMock.created_at,
    budgetMock.updated_at,
    budgetMock.services, 
    undefined, // peças
  )

  expect(budget.getId()).toBeUndefined()
  expect(budget.getStatus()).toBe(STATUS.PENDING)
  expect(budget.getClient()).toBe(budgetMock.client)
  expect(budget.getVehicle()).toBe(budgetMock.vehicle)
  expect(budget.getCreatedAt()).toBe(budgetMock.created_at)
  expect(budget.getUpdatedAt()).toBe(budgetMock.updated_at)
  expect(budget.getServices()).toBe(budgetMock.services)
  expect(budget.getPieces()).toEqual([])
  expect(budget.getTotalAmount()).not.toBe(0)
})

test('testar alterar cliente do agregado', () => {
  const budget = new Budget(
    budgetMock.client,
    budgetMock.vehicle,
    budgetMock.created_at, // create
    budgetMock.updated_at, // update
    budgetMock.services,
    budgetMock.pieces,
    budgetMock.id,
  )

  expect(budget.getClient()).toBe(budgetMock.client)
  
  budget.changeClient(newClient)
  expect(budget.getClient()).toBe(newClient)

  expect(budget.getId()).toBe(budgetMock.id)
})

test('testar alterar veículo do agregado', () => {
  const budget = new Budget(
    budgetMock.client,
    budgetMock.vehicle,
    budgetMock.created_at, // create
    budgetMock.updated_at, // update
    budgetMock.services,
    budgetMock.pieces,
    budgetMock.id,
  )

  expect(budget.getVehicle()).toBe(budgetMock.vehicle)
  
  budget.changeVehicle(newVehicle)
  expect(budget.getVehicle()).toBe(newVehicle)
  
  expect(budget.getId()).toBe(budgetMock.id)
})

// adicionar serviço
test('testar adicionar serviço ao agregado', () => {
  const budget = new Budget(
    budgetMock.client,
    budgetMock.vehicle,
    budgetMock.created_at,
    budgetMock.updated_at, 
    budgetMock.services,
    budgetMock.pieces,
    budgetMock.id,
  )

  expect(budget.getServices()).toBe(budgetMock.services)
  
  budget.addService(newService)
  expect(budget.getServices()).toContain(newService)
  
  expect(budget.getId()).toBe(budgetMock.id)
})

// remover serviço
test('testar remover serviço do agregado', () => {
  const budget = new Budget(
    budgetMock.client,
    budgetMock.vehicle,
    budgetMock.created_at,
    budgetMock.updated_at, 
    [newService],
    budgetMock.pieces,
    budgetMock.id,
  )

  expect(budget.getServices()).includes(newService)
  
  budget.removeService(Number(newService.getId()))
  expect(budget.getServices()).not.toContain(newService)
  
  expect(budget.getId()).toBe(budgetMock.id)
})

// deve dar erro ao adicionar serviço já presente na lista
test('deve dar erro ao testar adicionar serviço já presente no agregado', () => {
  const budget = new Budget(
    budgetMock.client,
    budgetMock.vehicle,
    budgetMock.created_at,
    budgetMock.updated_at, 
    [newService],
    budgetMock.pieces,
    budgetMock.id,
  )

  expect(budget.getServices()).includes(newService)
  
  expect(() => {
    budget.addService(newService)
  }).toThrowError('Serviço já está associado a este orçamento')
  expect(budget.getServices()).toContain(newService)
  expect(budget.getId()).toBe(budgetMock.id)
})

// deve dar erro ao remover serviço não presente na lista
test('deve dar erro ao testar remover serviço não presente no agregado', () => {
  const budget = new Budget(
    budgetMock.client,
    budgetMock.vehicle,
    budgetMock.created_at,
    budgetMock.updated_at, 
    budgetMock.services,
    budgetMock.pieces,
    budgetMock.id,
  )
  
  expect(budget.getServices()).toBe(budgetMock.services)
  expect(() => {
    budget.removeService(0)
  }).toThrowError('Serviço não encontrado no orçamento')
  
  expect(budget.getId()).toBe(budgetMock.id)
})

// alterar preço do serviço
test('testar alterar preço de um serviço', () => {
  const budget = new Budget(
    budgetMock.client,
    budgetMock.vehicle,
    budgetMock.created_at,
    budgetMock.updated_at, 
    budgetMock.services,
    budgetMock.pieces,
    budgetMock.id,
  )

  expect(budget.getServices()).toBe(budgetMock.services)
  const firstService = budgetMock.services[0]
  const newUnitPrice = faker.number.int({ min: 1, max: 50 })
  budget.changeServicePrice(Number(firstService?.getId()), newUnitPrice)
  
  expect(firstService.getUnitPrice()).toBe(newUnitPrice)
  expect(budget.getId()).toBe(budgetMock.id)
})

// alterar quantidade do serviço
test('testar alterar preço de um serviço', () => {
  const budget = new Budget(
    budgetMock.client,
    budgetMock.vehicle,
    budgetMock.created_at,
    budgetMock.updated_at, 
    budgetMock.services,
    budgetMock.pieces,
    budgetMock.id,
  )

  expect(budget.getServices()).toBe(budgetMock.services)
  const firstService = budgetMock.services[0]

  const newQuantity = faker.number.int({ min: 1, max: 50 })
  budget.changeServiceQuantity(Number(firstService?.getId()), newQuantity)
  
  expect(firstService.getQuantity()).toBe(newQuantity)
  expect(budget.getId()).toBe(budgetMock.id)
})

// adicionar peça ao serviço
test('testar adicionar peça em um serviço', () => {
  const budget = new Budget(
    budgetMock.client,
    budgetMock.vehicle,
    budgetMock.created_at,
    budgetMock.updated_at, 
    budgetMock.services,
    budgetMock.pieces,
    budgetMock.id,
  )

  expect(budget.getServices()).toBe(budgetMock.services)
  const firstService = budgetMock.services[0]

  const newPieceToService = new Piece(
    faker.animal.cetacean(),
    faker.number.float({ min: 1 }),
    faker.number.int({ min: 1 }),
    faker.number.int({ min: 1 }),
  )

  budget.addPieceToService(Number(firstService.getId()), newPieceToService)
})

// remover peça do serviço
test('testar remover peça de um serviço', () => {
  const budget = new Budget(
    budgetMock.client,
    budgetMock.vehicle,
    budgetMock.created_at,
    budgetMock.updated_at, 
    budgetMock.services,
    budgetMock.pieces,
    budgetMock.id,
  )

  expect(budget.getServices()).toBe(budgetMock.services)
  const firstService = budgetMock.services[0]

  budget.removePieceToService(Number(firstService.getId()), Number(pieceMock.id))
  expect(firstService.getPieces()).not.includes(Number(pieceMock.id))
})

// alterar preço da peça do serviço
test('testar alterar preço da peça de um serviço', () => {
  const budget = new Budget(
    newClient,
    newVehicle,
    budgetMock.created_at,
    budgetMock.updated_at, 
    budgetMock.services,
    [newPiece],
    budgetMock.id,
  )

  expect(budget.getServices()).toBe(budgetMock.services)
  const services = budget.getServices() || []
  const firstService = services[0]

  const pieces = firstService.getPieces() || []
  const firstPiece = pieces[0]

  const newPrice = faker.number.int({ min: 1 })
  budget.changePiecePriceInService(Number(firstService.getId()), Number(firstPiece.getId()), newPrice)
  expect(firstPiece?.getUnitPrice()).toBe(newPrice)
})

// alterar quantidade de peça no serviço
test('testar alterar quantidade da peça de um serviço', () => {
  const budget = new Budget(
    newClient,
    newVehicle,
    budgetMock.created_at,
    budgetMock.updated_at, 
    budgetMock.services,
    [newPiece],
    budgetMock.id,
  )

  expect(budget.getServices()).toBe(budgetMock.services)
  const services = budget.getServices() || []
  const firstService = services[0]

  const pieces = firstService.getPieces() || []
  const firstPiece = pieces[0]

  const newQuantity = faker.number.int({ min: 1 })
  budget.changePieceQuantityInService(Number(firstService.getId()), Number(firstPiece.getId()), newQuantity)
  expect(firstPiece?.getQuantity()).toBe(newQuantity)
})

// erro ao adicionar peça no serviço
test('deve dar erro ao tentar adicionar peça no serviço', () => {
  const budget = new Budget(
    newClient,
    newVehicle,
    budgetMock.created_at,
    budgetMock.updated_at, 
    budgetMock.services,
    [newPiece],
    budgetMock.id,
  )

  expect(budget.getServices()).toBe(budgetMock.services)

  expect(() => {
    budget.addPieceToService(0, newPiece)
  }).toThrowError('Serviço não encontrado')
})

// erro ao remover peça de serviço não presente no orçamento
test('deve dar erro ao tentar remove peça do serviço', () => {
  const budget = new Budget(
    newClient,
    newVehicle,
    budgetMock.created_at,
    budgetMock.updated_at, 
    budgetMock.services,
    [newPiece],
    budgetMock.id,
  )

  expect(budget.getServices()).toBe(budgetMock.services)

  expect(() => {
    budget.removePieceToService(0, Number(newPiece.getId()))
  }).toThrowError('Serviço não encontrado')
})

// erro ao remover peça não presente em um serviço do orçamento
test('deve dar erro ao tentar remove peça do serviço', () => {
  const budget = new Budget(
    newClient,
    newVehicle,
    budgetMock.created_at,
    budgetMock.updated_at, 
    budgetMock.services,
    [newPiece],
    budgetMock.id,
  )

  expect(budget.getServices()).toBe(budgetMock.services)
  const services = budget.getServices() || []
  const firstService = services[0]

  expect(() => {
    budget.removePieceToService(Number(firstService.getId()), Number(newPiece.getId()))
  }).toThrowError('Peça não encontrada no serviço')
})

// adicionar peça
test('testar adicionar peça a um orçamento', () => {
  const budget = new Budget(
    newClient,
    newVehicle,
    budgetMock.created_at,
    budgetMock.updated_at, 
    budgetMock.services,
    [],
    budgetMock.id,
  )

  expect(budget.getPieces()).toEqual([])

  budget.addPiece(newPiece)
  expect(budget.getPieces()).includes(newPiece)
})

// remover peça
test('testar remove peça de um orçamento', () => {
  const budget = new Budget(
    newClient,
    newVehicle,
    budgetMock.created_at,
    budgetMock.updated_at, 
    budgetMock.services,
    [newPiece],
    budgetMock.id,
  )

  expect(budget.getPieces()).includes(newPiece)

  budget.removePiece(Number(newPiece.getId()))
  expect(budget.getPieces()).not.includes(newPiece)
})

// alterar preço da peça
test('testar alterar preço de peça em um orçamento', () => {
  const budget = new Budget(
    newClient,
    newVehicle,
    budgetMock.created_at,
    budgetMock.updated_at, 
    budgetMock.services,
    [newPiece],
    budgetMock.id,
  )

  expect(budget.getPieces()).includes(newPiece)
  const pieces = budget.getPieces() || []
  const firstPiece = pieces[0]

  const newPrice = faker.number.int({ min: 1 })
  budget.changePiecePrice(Number(firstPiece.getId()), newPrice)
  expect(firstPiece.getUnitPrice()).toBe(newPrice)
})

// alterar quantidade da peça
test('testar alterar quantidade de peça em um orçamento', () => {
  const budget = new Budget(
    newClient,
    newVehicle,
    budgetMock.created_at,
    budgetMock.updated_at, 
    budgetMock.services,
    [newPiece],
    budgetMock.id,
  )

  expect(budget.getPieces()).includes(newPiece)
  const pieces = budget.getPieces() || []
  const firstPiece = pieces[0]

  const newQuantity = faker.number.int({ min: 1, max: 10 })
  budget.changePieceQuantity(Number(firstPiece.getId()), newQuantity)
  expect(firstPiece.getQuantity()).toBe(newQuantity)
})

// aprovar orçamento
test('testar aprovar um orçamento', () => {
  const budget = new Budget(
    newClient,
    newVehicle,
    budgetMock.created_at,
    budgetMock.updated_at, 
    budgetMock.services,
    budgetMock.pieces,
    budgetMock.id,
  )

  expect(budget.getStatus()).toBe(STATUS.PENDING)
  
  budget.approve()
  expect(budget.getStatus()).toBe(STATUS.APPROVE)
})

// reprovar orçamento
test('testar reprovar um orçamento', () => {
  const budget = new Budget(
    newClient,
    newVehicle,
    budgetMock.created_at,
    budgetMock.updated_at, 
    budgetMock.services,
    budgetMock.pieces,
    budgetMock.id,
  )

  expect(budget.getStatus()).toBe(STATUS.PENDING)
  
  budget.reject()
  expect(budget.getStatus()).toBe(STATUS.REJECT)
})

// erro ao tentar aprovar orçamento
test('deve dar erro ao tentar reprovar um orçamento não pendente', () => {
  const budget = new Budget(
    newClient,
    newVehicle,
    budgetMock.created_at,
    budgetMock.updated_at, 
    budgetMock.services,
    budgetMock.pieces,
    budgetMock.id,
  )

  expect(budget.getStatus()).toBe(STATUS.PENDING)
  
  budget.approve()
  expect(budget.getStatus()).toBe(STATUS.APPROVE)

  expect(() => {
    budget.reject()
  }).toThrowError('Somente orçamentos pendentes podem ser alterados')
})

// erro ao tentar aprovar orçamento
test('deve dar erro ao tentar aprovar um orçamento não pendente', () => {
  const budget = new Budget(
    newClient,
    newVehicle,
    budgetMock.created_at,
    budgetMock.updated_at, 
    budgetMock.services,
    budgetMock.pieces,
    budgetMock.id,
  )

  expect(budget.getStatus()).toBe(STATUS.PENDING)
  
  budget.reject()
  expect(budget.getStatus()).toBe(STATUS.REJECT)

  expect(() => {
    budget.approve()
  }).toThrowError('Somente orçamentos pendentes podem ser alterados')
})

