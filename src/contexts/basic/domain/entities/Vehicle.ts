import { Plate } from "../../../../value-objects/Plate";

export class Vehicle {
  private id?: number;
  private plate: Plate;
  private brand: string;
  private model: string;
  private year: number;

  constructor (
    plate: string,
    brand: string,
    model: string,
    year: number,
    id?: number,
  ) {
    if (!brand || !model || !year) {
      throw new Error('Os campos: placa, marca, modelo e ano são obrigatórios');
    }

    this.id = id;
    this.plate = new Plate(plate);
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  get getId(): number | undefined {
    return this.id;
  }
  get getPlate(): string {
    return this.plate.getPlate;
  }
  get getBrand(): string {
    return this.brand;
  }
  get getModel(): string {
    return this.model;
  }
  get getYear(): number {
    return this.year;
  }

  public changePlate(newPlate: string): void {
    this.plate = new Plate(newPlate);
  }

  public changeBrand(newBrand: string): void {
    if (!newBrand) {
      throw new Error('Brand is required');
    }
    this.brand = newBrand;
  }

  public changeModel(newModel: string): void {
    if (!newModel) {
      throw new Error('Model is required');
    }
    this.model = newModel;
  }

  public changeYear(newYear: number): void {
    if (!newYear) {
      throw new Error('Year is required');
    }
    this.year = newYear;
  }
}