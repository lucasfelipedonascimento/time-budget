import { BudgetDTO } from '../dto/Budget';

export interface IBudgetRepository {
  create(budget: BudgetDTO): Promise<void>;
  update(budget: BudgetDTO): Promise<void>;
  findById(id: number): Promise<BudgetDTO | null>;
  findAll(): Promise<BudgetDTO[]>;
}