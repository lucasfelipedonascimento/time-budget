import { STATUS } from '../../../../constants/Status'

export class Status {
  private status: string;

  constructor(value: STATUS) {
    if (!value) {
      throw new Error('Status cannot be null or undefined');
    }

    this.validateStatus(value);
    this.status = value;
  }

  private validateStatus(value: STATUS): void {
    if (!Object.values(STATUS).includes(value)) {
      throw new Error(`Invalid status: ${value}`);
    }
  }

  get getStatus(): string {
    return this.status;
  }

  set setStatus(value: STATUS) {
    this.validateStatus(value);
    this.status = value;
  }
}