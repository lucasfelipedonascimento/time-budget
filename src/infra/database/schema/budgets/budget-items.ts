import { integer, pgEnum, serial, varchar } from "drizzle-orm/pg-core";
import { budgets } from "./budgets";
import { budgetSchema } from "./budgetSchema.ts";
import { pieces } from "../public/pieces.ts";
import { services } from "../public/services.ts";

export const itemTypeEnum = pgEnum("item_type", ["service", "piece"]);

export const budgetItems = budgetSchema.table(
  "budget_items",
  {
    id: serial("id").primaryKey(),
    budget_id: integer("budget_id")
      .references(() => budgets.id)
      .notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    item_type: itemTypeEnum("item_type").notNull(),
    item_id: integer("item_id").references(() => {
      return budgetItems.item_type === "service" ? services.id : pieces.id;
    }),
    time: integer("time"),
    quantity: integer("quantity").notNull(),
    unit_price: integer("price").default(0).notNull(),
    subtotal: integer("subtotal").default(0).notNull(),
  },
  () => ({
    schema: "budget",
  })
);
