import { serial, varchar } from 'drizzle-orm/pg-core'
import { budgetSchema } from './budgetSchema'

export const vehicles = budgetSchema.table('vehicles', {
  id: serial('id').primaryKey(),
  plate: varchar('plate', { length: 10 }).notNull(),
  brand: varchar('brand', { length: 50 }).notNull(),
  model: varchar('model', { length: 256 }).notNull(),
  year: varchar('year', { length: 4 }).notNull(),
})