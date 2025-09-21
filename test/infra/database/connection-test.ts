import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { budgetSchema } from "../../../src/infra/database/schema/budgets/budgetSchema";
import { envTest } from "../../../src/env/test";

export const sqlTest = postgres(envTest.DATABASE_URL);
export const databaseTest = drizzle(sqlTest, {
  schema: {
    [envTest.SCHEMA_INTEGRATION]: budgetSchema,
  },
  casing: "snake_case",
});
