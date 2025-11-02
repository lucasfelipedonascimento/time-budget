import {
  serial,
  varchar,
  decimal,
  integer,
  pgTable,
  timestamp,
} from "drizzle-orm/pg-core";
import { services } from "./services";

export const serviceItems = pgTable("service_items", {
  id: serial("id").primaryKey(),
  service_id: integer("service_id")
    .references(() => services.id)
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  unit_price: decimal("unit_price").notNull().default("0.00"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("created_at").notNull().defaultNow(),
});
