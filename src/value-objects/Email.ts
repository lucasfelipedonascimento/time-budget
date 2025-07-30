
export class Email {
  private email: string;

  constructor(email: string) {
    this.validateEmail(email);
  }

  public get getEmail(): string {
    return this.email;
  }

  private validateEmail(email: string): void {
    if (!email || typeof email !== 'string' || !this.isValidEmail(email)) {
      throw new Error("O email deve ser um endereço de email válido");
    }
    this.email = email;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}