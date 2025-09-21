export class Piece {
  private id?: number
  private name: string
  private unit_price: number = 0 // Default value, can be set later
  private quantity: number

  constructor(name: string, unit_price: number, quantity: number, id?: number) {
    if (!name) {
      throw new Error('O nome é obrigatório');
    }

    this.id = id;
    this.name = name;
    this.validateQuantity(quantity);
    this.validateUnitPrice(unit_price);
  }

  public getId(): number | undefined {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getUnitPrice(): number {
    return this.unit_price;
  }

  public changeQuantity(quantity: number): void {
    this.validateQuantity(quantity);
  }

  private validateQuantity(quantity: number): void {
    if (quantity <= 0) {
      throw new Error('Quantidade não pode ser menor ou igual a 0');
    }
    this.quantity = quantity;
  }

  public changeUnitPrice(unit_price: number): void {
    this.validateUnitPrice(unit_price);
  }

  private validateUnitPrice(unit_price: number): void {
    if (unit_price < 0) {
      throw new Error('Preço unitário não pode ser negativo');
    }

    this.unit_price = unit_price;
  }
}