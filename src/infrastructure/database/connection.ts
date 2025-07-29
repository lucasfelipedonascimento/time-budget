import postgres from 'postgres';
import { env } from '../../env/local'
import { drizzle } from 'drizzle-orm/postgres-js';
import { budgetSchema } from './schema/budgets/schema';

export const sql = postgres(env.DATABASE_URL);
export const database = drizzle(sql, {
  schema: {
    // Define your database schema here
    // For example:
    // users: {
    //   id: 'serial primary key',
    //   name: 'text not null',
    //   email: 'text not null unique',
    // }
    budgetSchema,
  },
  casing: 'snake_case',
})