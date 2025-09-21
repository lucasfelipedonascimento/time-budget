import { Erros } from "../constants/Erros";

export class Plate {
  private plate: string;

  constructor(value: string) {
    this.requiredPlate(value);
  }

  private validatePlate(value: string): void {
    // Example regex for Brazilian license plates
    const plateRegex = /^[A-Z]{3}-?\d[A-Z0-9]\d{2}$|^[A-Z]{3}-?\d{4}$/; 
    if (!plateRegex.test(value)) {
      throw new Error(Erros.invalidPlate);
    }

    this.plate = value; // Normalize plate format
  }

  get getPlate(): string {
    return this.plate;
  }
  
  changePlate(newPlate: string): void {
    this.requiredPlate(newPlate);
  }

  private requiredPlate(plate: string): void {
    if (!plate) {
      throw new Error('A placa é obrigatória');
    }

    this.validatePlate(plate);
  }
}