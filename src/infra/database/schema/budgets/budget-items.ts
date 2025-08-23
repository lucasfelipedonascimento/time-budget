import { integer, pgEnum, serial, varchar } from 'drizzle-orm/pg-core'
import { budgets } from './budgets'
import { budgetSchema } from './budgetSchema.ts';

export const itemTypeEnum = pgEnum('item_type', ["service", "piece"]);

export const budgetItems = budgetSchema.table('budget_items', {
  id: serial('id').primaryKey(),
  budget_id: integer('budget_id').references(() => budgets.id).notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  item_type: itemTypeEnum('item_type').notNull(),
  time: integer('time'),
  quantity: integer('quantity').notNull(),
  unit_price: integer('price').default(0).notNull(),
  subtotal: integer('subtotal').default(0).notNull(),
})