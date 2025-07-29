export class CPF {
  private cpf: string;

  constructor(value: string) {
    if (!value) {
      throw new Error('CPF cannot be null or undefined');
    }

    this.validateCPF(value);
    this.cpf = value;
  }

  private validateCPF(value: string): void {
    const cpfRegex = /^\d{11}$/; // CPF must be 11 digits
    if (!cpfRegex.test(value)) {
      throw new Error(`Invalid CPF format: ${value}`);
    }
  }

  get getCPF(): string {
    return this.cpf;
  }

  set setCPF(value: string) {
    this.validateCPF(value);
    this.cpf = value;
  }
}