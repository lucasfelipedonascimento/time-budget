import { CPF } from '../../../../value-objects/CPF'

export class Client {
  private id: number;
  private cpf: CPF;
  private name: string;
  private email: string;
  private address: string;
  private address_number: string;
  private cep: string;

  constructor(
    id: number,
    cpf: string,
    name: string,
    email: string,
    address: string,
    address_number: string,
    cep: string
  ) {
    if (!id || !name || !email || !address || !address_number || !cep) {
      throw new Error('All fields are required');
    }

    this.id = id;
    this.cpf = new CPF(cpf);
    this.name = name;
    this.email = email;
    this.address = address;
    this.address_number = address_number;
    this.cep = cep;
  }

  get getId(): number {
    return this.id;
  }
  get getCPF(): string {
    return this.cpf.getCPF;
  }
  get getName(): string {
    return this.name;
  }
  get getEmail(): string {
    return this.email;
  }
  get getAddress(): string {
    return this.address;
  }
  get getAddressNumber(): string {
    return this.address_number;
  }
  get getCep(): string {
    return this.cep;
  }
  set setName(name: string) {
    this.requiredField(name);
    this.name = name;
  }
  set setEmail(email: string) {
    this.requiredField(email);
    this.email = email;
  }
  set setAddress(address: string) {
    this.requiredField(address);
    this.address = address;
  }
  set setAddressNumber(address_number: string) {
    this.requiredField(address_number);
    this.address_number = address_number;
  }
  set setCep(cep: string) {
    this.requiredField(cep);
    this.cep = cep;
  }
  set setCPF(cpf: string) {
    this.requiredField(cpf);
    this.cpf = new CPF(cpf);
  }

  private requiredField(value: string | number) {
    if (!value) {
      throw new Error('Field cannot be null or undefined');
    }
  }
}