import { decimal, integer, pgEnum, serial, timestamp } from "drizzle-orm/pg-core"
import { clients } from "./clients"
import { vehicles } from "./vehicle"
import { budgetSchema } from "./budgetSchema.ts";

export const statusEnum = pgEnum('status', ["pending", "approve", "reject", "in_progress"]);

export const budgets = budgetSchema.table('budgets', {
  id: serial('id').primaryKey(),
  client_id: integer('client_id').references(() => clients.id).notNull(),
  vehicle_id: integer("vehicle_id").references(() => vehicles.id).notNull(),
  status: statusEnum('status').default('pending').notNull(),
  total_value: decimal('total_value', { precision: 10, scale: 2 }).notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
})