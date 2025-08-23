import { Piece } from './Piece'

export class Service {
  private id?: number
  private name: string
  private time: number
  private unit_price: number = 0 // Default value, can be set later
  private quantity: number
  private pieces?: Piece[]

  constructor(
    name: string,
    time: number,
    unit_price: number,
    quantity: number,
    pieces?: Piece[],
    id?: number,
  ) {
    if (!name) {
      throw new Error('Os campos: nome, tempo, quantidade e preço unitário são obrigatórios');
    }

    this.id = id;
    this.name = name;
    this.validateTime(time)
    this.validateUnitPrice(unit_price);
    this.validateQuantity(quantity);
    this.pieces = pieces || undefined;
  }

  public getId(): number | undefined {
    return this.id;
  }
  public getName(): string {
    return this.name;
  }
  public getTime(): number {
    return this.time;
  }
  public getUnitPrice(): number {
    return this.unit_price;
  }
  public getQuantity(): number {
    return this.quantity;
  }
  public getPieces(): Piece[] | undefined {
    return this.pieces;
  }
  public getPieceById(pieceId: number): Piece | undefined {
    return this.pieces?.find(p => p.getId() === pieceId)
  }

  // peças
  public addPiece(piece: Piece): void {
    // Verifica se a peça já está no serviço
    const validatePieceInService = this.pieces?.some(p => p.getId() === piece.getId());
    if (validatePieceInService) {
      throw new Error('A Peça já está associada a este serviço');
    }

    this.pieces?.push(piece);
  }

  public removePiece(pieceId: number): void {
    const validatePieceInService = this.pieces?.some(p => p.getId() === pieceId);
    if (!validatePieceInService) {
      throw new Error('Peça não encontrada no serviço');
    }

    this.pieces = this.pieces?.filter(piece => piece.getId() !== pieceId);
  }
 
  // tempo
  public changeTime(time: number): void {
    this.validateTime(time)
  }

  private validateTime(time: number): void {
    if (!time || time <= 0) {
      throw new Error('Tempo não pode ser igual ou menor que 0');
    }

    this.time = time;
  }

  // quantidade
  public changeQuantity(quantity: number): void {
    this.validateQuantity(quantity);
  }

  private validateQuantity(quantity: number): void {
    if (!quantity || quantity <= 0) {
      throw new Error('Quantidade não pode ser igual ou menor que 0');
    }

    this.quantity = quantity;
  }

  // preço unitário
  public changeUnitPrice(unit_price: number): void {
    this.validateUnitPrice(unit_price);
  }

  private validateUnitPrice(unit_price: number): void {
    if (!unit_price || unit_price < 0) {
      throw new Error('O preço não pode ser menor que 0');
    }

    this.unit_price = unit_price;
  }
}