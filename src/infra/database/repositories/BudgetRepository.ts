import { IBudgetRepository } from '../../../contexts/basic/domain/interfaces/IBudgetRepository'
import { BudgetDTO } from '../../../contexts/basic/domain/dto/Budget'
import { budgets } from '../../database/schema/budgets/budgets'
import { database as db } from '../../database/connection'
import { eq } from 'drizzle-orm';

export class BudgetRepository implements IBudgetRepository {
  async findAll(): Promise<BudgetDTO[]> {
    const result = await db.select({
      id: budgets.id,
      client_id: budgets.client_id,
      vehicle_id: budgets.vehicle_id,
      total_value: budgets.total_value,
      status: budgets.status,
      created_at: budgets.created_at,
      updated_at: budgets.updated_at
    }).from(budgets)

    if (!result) return [];
    
    return result as BudgetDTO[];
  }

  async findById(id: number): Promise<BudgetDTO | null> {
    const [row] = await db.select().from(budgets).where(eq(budgets.id, id));
    
    if (!row) return null;
    
    return row as BudgetDTO;
  }

  async create(budget: BudgetDTO): Promise<void> {
    await db.insert(budgets).values({
      client_id: budget.client_id,
      vehicle_id: budget.vehicle_id,
      status: budget.status,
      total_value: budget.total_value
    })
  }

  async update(budget: BudgetDTO): Promise<void> {
    await db.update(budgets).set({
      client_id: budget.client_id,
      vehicle_id: budget.vehicle_id,
      status: budget.status,
      total_value: budget.total_value
    }).where(eq(budgets.id, budget.id));
  }
}