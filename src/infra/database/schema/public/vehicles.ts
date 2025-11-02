import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const vehicles = pgTable("vehicles", {
  id: serial("id").primaryKey(),
  plate: varchar("plate", { length: 10 }).notNull(),
  brand: varchar("brand", { length: 50 }).notNull(),
  model: varchar("model", { length: 256 }).notNull(),
  year: varchar("year", { length: 4 }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("created_at").notNull().defaultNow(),
});
