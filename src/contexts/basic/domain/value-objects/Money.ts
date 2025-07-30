

export class Money {
  private money: number;

  constructor(money: number){
    this.validateMoney(money);
  }

  private validateMoney(money: number): void {
    if (money < 0) {
      throw new Error("O valor do preço não pode ser negativo");
    }

    if (typeof money !== 'number') {
      throw new Error("O preço deve ser um número válido");
    }
    
    this.money = money;
  }

  get getMoney(): number {
    return this.money;
  }
}