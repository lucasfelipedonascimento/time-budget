import { decimal, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  unit_price: decimal("unit_price").notNull().default("0.00"),
});
