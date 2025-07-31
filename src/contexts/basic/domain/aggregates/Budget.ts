import { Client } from '../entities/Client'
import { Vehicle } from '../entities/Vehicle'
import { Service } from '../entities/Service'
import { Piece } from '../entities/Piece'
import { STATUS } from '../../../../constants/Status'

export class Budget {
  private id?: string
  private status: STATUS = STATUS.PENDING // Default to 'pending'
  private client: Client
  private vehicle: Vehicle
  private totalAmount: number = 0 // Default to 0, will be calculated later
  private services: Service[] = []
  private pieces: Piece[] = []
  private createdAt: string
  private updatedAt: string

  constructor(
    client: Client,
    vehicle: Vehicle,
    createdAt: string,
    updatedAt: string,
    services: Service[],
    pieces: Piece[],
    id?: string,
  ) {
    this.validateClient(client)
    this.validateVehicle(vehicle)
    this.services = services ?? []
    this.pieces = pieces ?? []
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.id = id
    this.calculateTotalAmount() // Calculate total amount based on services and pieces
  }

  getId(): string | undefined {
    return this.id
  }
  getStatus(): string {
    return this.status
  }
  getClient(): Client {
    return this.client
  }
  getVehicle(): Vehicle {
    return this.vehicle
  }
  getServices(): Service[] | undefined {
    return this.services
  }
  getPieces(): Piece[] | undefined {
    return this.pieces
  }
  getTotalAmount(): number {
    return this.totalAmount
  }
  getCreatedAt(): string {
    return this.createdAt
  }
  getUpdatedAt(): string {
    return this.updatedAt
  }

  // serviços
  public addService(service: Service): void {
    this.ensureBudgetIsPending();

    const serviceInBudget = this.services.some(s => s.getId() === service.getId());
    if (serviceInBudget) {
      throw new Error('Serviço já está associado a este orçamento');
    }
    
    this.services.push(service);
    this.calculateTotalAmount();
  }

  public removeService(serviceId: number): void {
    this.ensureBudgetIsPending();

    const serviceInBudget = this.services.some(s => s.getId() === serviceId);
    if (!serviceInBudget) {
      throw new Error('Serviço não encontrado no orçamento');
    }

    this.services = this.services.filter(service => service.getId() !== serviceId);
    this.calculateTotalAmount();
  }
  // - alterar preço do serviço
  public changeServicePrice(serviceId: number, newPrice: number): void {
    this.ensureBudgetIsPending();

    const service = this.services.find(service => service.getId() === serviceId);
    if (!service) {
      throw new Error('Serviço não encontrado');
    }
    // alterar o preço do serviço
    service.changeUnitPrice(newPrice);

    // atualizar o orçamento
    this.calculateTotalAmount();
  }

  // - alterar quantidade do serviço
  public changeServiceQuantity(serviceId: number, newQuantity: number): void {
    this.ensureBudgetIsPending();

    const service = this.services.find(service => service.getId() === serviceId);
    if (!service) {
      throw new Error('Serviço não encontrado');
    }
    // alterar a quantidade do serviço
    service.changeQuantity(newQuantity);

    // atualizar o orçamento
    this.calculateTotalAmount();
  }

  // - peças dos serviços
  public addPieceToService(serviceId: number, piece: Piece): void {
    // verifica se o orçamento está pendente
    this.ensureBudgetIsPending();

    // pegar o serviço, onde vai ser adicionada a peça, pelo id
    const service = this.services.find(service => service.getId() === serviceId);
    if (!service) {
      throw new Error('Serviço não encontrado');
    }
    // adicionar a peça ao serviço
    service.addPiece(piece);

    // atualizar o orçamento
    this.calculateTotalAmount();
  }

  public removePieceToService(serviceId: number, pieceId: number): void {
    this.ensureBudgetIsPending();

    const service = this.services.find(service => service.getId() === serviceId);
    if (!service) {
      throw new Error('Serviço não encontrado');
    }
    service.removePiece(pieceId);
    this.calculateTotalAmount();
  }

  // - alterar quantidade da peça do serviço
  public changePieceQuantityInService(serviceId: number, pieceId: number, newQuantity: number): void {
    this.ensureBudgetIsPending();

    const service = this.services.find(service => service.getId() === serviceId);
    if (!service) {
      throw new Error('Serviço não encontrado');
    }
    
    const piece = service.getPieces()?.find(piece => piece.getId() === pieceId);
    if (!piece) {
      throw new Error('Peça não encontrada no serviço');
    }
    
    // alterar a quantidade da peça do serviço
    piece.changeQuantity(newQuantity);

    // atualizar o orçamento
    this.calculateTotalAmount();
  }
  // - alterar preço da peça do serviço
  public changePiecePriceInService(serviceId: number, pieceId: number, newPrice: number): void {
    this.ensureBudgetIsPending();

    const service = this.services.find(service => service.getId() === serviceId);
    if (!service) {
      throw new Error('Serviço não encontrado');
    }
    
    const piece = service.getPieces()?.find(piece => piece.getId() === pieceId);
    if (!piece) {
      throw new Error('Peça não encontrada no serviço');
    }
    
    // alterar o preço da peça do serviço
    piece.changeUnitPrice(newPrice);

    // atualizar o orçamento
    this.calculateTotalAmount();
  }

  // peças
  public addPiece(piece: Piece): void {
    this.ensureBudgetIsPending();

    const pieceInBudget = this.pieces.some(p => p.getId() === piece.getId());
    if (pieceInBudget) {
      throw new Error('Peça já está associada a este orçamento');
    }
    this.pieces.push(piece);
    this.calculateTotalAmount();
  }

  public removePiece(pieceId: number): void {
    this.ensureBudgetIsPending();

    const pieceInBudget = this.pieces.some(piece => piece.getId() === pieceId);
    if (!pieceInBudget) {
      throw new Error('Peça não encontrada no orçamento');
    }
    this.pieces = this.pieces.filter(piece => piece.getId() !== pieceId);
    this.calculateTotalAmount();
  }

  // - alterar preço da peça
  public changePiecePrice(pieceId: number, newPrice: number): void {
    this.ensureBudgetIsPending();

    const piece = this.pieces.find(piece => piece.getId() === pieceId);
    if (!piece) {
      throw new Error('Peça não encontrada');
    }
    // alterar o preço da peça
    piece.changeUnitPrice(newPrice);

    // atualizar o orçamento
    this.calculateTotalAmount();
  }
  // - alterar quantidade da peça
  public changePieceQuantity(pieceId: number, newQuantity: number): void {
    this.ensureBudgetIsPending();

    const piece = this.pieces.find(piece => piece.getId() === pieceId);
    if (!piece) {
      throw new Error('Peça não encontrada');
    }
    // alterar a quantidade da peça
    piece.changeQuantity(newQuantity);

    // atualizar o orçamento
    this.calculateTotalAmount();
  }

  // veículo
  public changeVehicle(vehicle: Vehicle): void {
    this.ensureBudgetIsPending();
    this.validateVehicle(vehicle);
  }

  // cliente
  public changeClient(client: Client): void {
    this.ensureBudgetIsPending();
    this.validateClient(client);
  }

  public approve(): void {
    this.ensureBudgetIsPending();
    if (this.status === STATUS.APPROVE) {
      throw new Error('Orçamento já aprovado');
    }
    this.status = STATUS.APPROVE;
  }

  public reject(): void {
    this.ensureBudgetIsPending();
    if (this.status === STATUS.REJECT) {
      throw new Error('Orçamento já rejeitado');
    }
    this.status = STATUS.REJECT;
  }

  private validateClient(client: Client): void {
    if (!client.getId) {
      throw new Error('O cliente é obrigatório para gerar um orçamento');
    }
    this.client = client;
  }

  private validateVehicle(vehicle: Vehicle): void {
    if (!vehicle.getId) {
      throw new Error('O veículo é obrigatório para gerar um orçamento');
    }
    this.vehicle = vehicle;
  }

  private ensureBudgetIsPending(): void {
    if (this.status !== STATUS.PENDING) {
      throw new Error('Somente orçamentos pendentes podem ser alterados');
    }
  }

  private calculateTotalAmount(): void {
    let total = 0;
    if (this.services) {
      total += this.services.reduce((sum, service) => sum + service.getUnitPrice() * service.getQuantity(), 0);
    }
    if (this.pieces) {
      total += this.pieces.reduce((sum, piece) => sum + piece.getUnitPrice() * piece.getQuantity(), 0);
    }
    
    this.totalAmount = total;
  }
}