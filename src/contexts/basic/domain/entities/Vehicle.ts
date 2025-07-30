import { Plate } from "../../../../value-objects/Plate";

export class Vehicle {
  private id: number;
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
    if (!id || !plate || !brand || !model || !year) {
      throw new Error('All fields are required');
    }

    this.id = id;
    this.plate = new Plate(plate);
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  get getId(): number {
    return this.id;
  }
  get getPlate(): Plate {
    return this.plate;
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
    if (!newPlate) {
      throw new Error('Plate is required');
    }
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