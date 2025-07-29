export class Plate {
  private plate: string;

  constructor(value: string) {
    if (!value) {
      throw new Error('Plate cannot be null or undefined');
    }

    this.validatePlate(value);
    this.plate = value;
  }

  private validatePlate(value: string): void {
    const plateRegex = /^[A-Z]{3}-\d{4}$/; // Example regex for Brazilian plates
    if (!plateRegex.test(value)) {
      throw new Error(`Invalid plate format: ${value}`);
    }
  }

  get getPlate(): string {
    return this.plate;
  }

  set setPlate(value: string) {
    this.validatePlate(value);
    this.plate = value;
  }
}