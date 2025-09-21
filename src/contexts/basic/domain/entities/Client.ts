import { CPF } from '../../../../value-objects/CPF'
import { Email } from '../../../../value-objects/Email'
import { CEP } from '../../../../value-objects/CEP'
import { Erros } from '../../../../constants/Erros';

export class Client {
  private id?: number;
  private cpf: CPF;
  private name: string;
  private email: Email;
  private address: string;
  private address_number: string;
  private cep: CEP;

  constructor(
    cpf: string,
    name: string,
    email: string,
    address: string,
    address_number: string,
    cep: string,
    id?: number,
  ) {
    if (!name || !address || !address_number) {
      throw new Error(Erros.allRequiredFields);
    }

    this.id = id || undefined;
    this.cpf = new CPF(cpf);
    this.name = name;
    this.email = new Email(email);
    this.address = address;
    this.address_number = address_number;
    this.cep = new CEP(cep);
  }

  get getId(): number | undefined {
    return this.id;
  }
  get getCPF(): string {
    return this.cpf.getCPF;
  }
  get getName(): string {
    return this.name;
  }
  get getEmail(): string {
    return this.email.getEmail;
  }
  get getAddress(): string {
    return this.address;
  }
  get getAddressNumber(): string {
    return this.address_number;
  }
  get getCep(): string {
    return this.cep.getCEP;
  }

  public changeName(name: string): void {
    this.requiredField(name);
    this.name = name;
  }

  public changeEmail(email: string): void {
    this.email = new Email(email);
  }

  public changeCPF(cpf: string): void {
    this.cpf = new CPF(cpf);
  }

  public changeCEP(cep: string): void {
    this.requiredField(cep);
    this.cep = new CEP(cep);
  }

  public changeAddress(address: string): void {
    this.requiredField(address);
    this.address = address;
  }

  public changeAddressNumber(address_number: string): void {
    this.requiredField(address_number);
    this.address_number = address_number;
  }
  
  private requiredField(value: string | number) {
    if (!value) {
      throw new Error(Erros.requiredField);
    }
  }
}