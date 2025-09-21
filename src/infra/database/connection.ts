import postgres from 'postgres';
import { env } from '../../env/local'
import { drizzle } from 'drizzle-orm/postgres-js';
import { budgetSchema } from './schema/budgets/budgetSchema'

export const sql = postgres(env.DATABASE_URL);
export const database = drizzle(sql, {
  schema: {
    budgetSchema,
  },
  casing: 'snake_case',
})
