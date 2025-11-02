import { IBudgetRepository } from "../../../contexts/basic/domain/interface/IBudgetRepository";
import { BudgetDTO } from "../../../dto/BudgetDTO";
import { budgets } from "../../database/schema/budgets/budgets";
import { database as db } from "../../database/connection";
import { eq } from "drizzle-orm";

export class BudgetRepository implements IBudgetRepository {
  async findAll(): Promise<BudgetDTO[]> {
    const result = await db
      .select({
        id: budgets.id,
        client_id: budgets.client_id,
        vehicle_id: budgets.vehicle_id,
        total_value: budgets.total_value,
        status: budgets.status,
        created_at: budgets.created_at,
        updated_at: budgets.updated_at,
      })
      .from(budgets);

    if (!result) return [];

    const parseToBudgetDTO: BudgetDTO[] = result.map((budget) => {
      return {
        id: budget.id,
        client_id: budget.client_id,
        vehicle_id: budget.vehicle_id,
        total_value: budget.total_value,
        status: budget.status,
        created_at: String(budget.created_at),
        updated_at: String(budget.updated_at),
      };
    });

    return parseToBudgetDTO;
  }

  async findById(id: number): Promise<BudgetDTO | null> {
    const [row] = await db.select().from(budgets).where(eq(budgets.id, id));

    if (!row) return null;

    const parseToBudgetDTO: BudgetDTO = {
      id: row.id,
      client_id: row.client_id,
      vehicle_id: row.vehicle_id,
      total_value: row.total_value,
      status: row.status,
      created_at: String(row.created_at),
      updated_at: String(row.updated_at),
    };

    return parseToBudgetDTO;
  }

  async create(budget: BudgetDTO): Promise<void> {
    await db.insert(budgets).values({
      client_id: budget.client_id,
      vehicle_id: budget.vehicle_id,
      status: budget.status,
      total_value: budget.total_value,
    });
  }

  async update(budget: BudgetDTO): Promise<void> {
    await db
      .update(budgets)
      .set({
        client_id: budget.client_id,
        vehicle_id: budget.vehicle_id,
        status: budget.status,
        total_value: budget.total_value,
      })
      .where(eq(budgets.id, budget.id));
  }
}
