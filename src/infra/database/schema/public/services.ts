import {
  decimal,
  pgTable,
  serial,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  unit_price: decimal("unit_price").notNull().default("0.00"),
  time: decimal("time").notNull().default("0.00"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("created_at").notNull().defaultNow(),
});
