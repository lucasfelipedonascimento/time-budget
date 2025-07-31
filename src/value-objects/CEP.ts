import { Erros } from "../constants/Erros";

export class CEP {
  private cep: string

  constructor(cep: string) {
    this.validateCEP(cep);
  }

  private validateCEP(cep: string): void {
    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;

    if (!cepRegex.test(cep)) {
      throw new Error(Erros.invalidCep);
    }

    this.cep = cep.replace('-', '');
  }

  get getCEP(): string {
    return this.cep;
  }
}