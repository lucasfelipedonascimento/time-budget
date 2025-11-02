import { BudgetDTO } from "../../../../dto/BudgetDTO";

export interface IBudgetRepository {
  create(budget: Partial<BudgetDTO>): Promise<void>;
  update(budget: Partial<BudgetDTO>): Promise<void>;
  findById(id: number): Promise<BudgetDTO | null>;
  findAll(): Promise<BudgetDTO[]>;
}
