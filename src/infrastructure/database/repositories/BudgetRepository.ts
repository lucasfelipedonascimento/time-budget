import { Budget } from '../../../contexts/basic/domain/aggregates/Budget';
import { IBudgetRepository } from '../../../contexts/basic/domain/interfaces/IBudgetRepository'
import { Client as PgClient } from 'pg'
import { TABLE } from '../../../constants/Table'
import { BudgetDTO } from '../../../contexts/basic/domain/dto/Budget'

export class BudgetRepository implements IBudgetRepository {
  private client: PgClient;

  constructor (client: PgClient) {
    this.client = client;
  }
  

  async findAll(): Promise<BudgetDTO[]> {
    const result = await this.client.query(`SELECT * FROM ${TABLE.budgets}`, []);

    return result.rows[0];
  }

  async findById(id: number): Promise<BudgetDTO | null> {
    const result = await this.client.query(`SELECT * FROM ${TABLE.budgets} WHERE id = $1`, [id]);

    if (result.rows.length > 0) {
       return result.rows[0];
      ;
    }
    return null;
  }

  async create(budget: BudgetDTO): Promise<void> {
    const { client_id, vehicle_id, status, total_value } = budget

    await this.client.query(`INSERT INTO ${TABLE.budgets} 
      (client_id, vehicle_id, status, total_value)
      VALUES ($1, $2, $3, $4)`,
      [client_id, vehicle_id, status, total_value]);
  }

  async update(budget: BudgetDTO): Promise<void> {
    const { client_id, vehicle_id, status, total_value, id } = budget;

    await this.client.query(`UPDATE ${TABLE.budgets} 
      SET (client_id = $1, vehicle_id = $2, status = $3, total_value = $4) 
      WHERE id = $5`, [client_id, vehicle_id, status, total_value, id]);
  }
}