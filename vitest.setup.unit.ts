import postgres from "postgres";
import { envTest } from './src/env/test'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { beforeAll, afterAll, beforeEach } from 'vitest'

const dbUnitTest = postgres(envTest.SCHEMA_UNIT!, { max: 1 });

beforeAll(async () => {
  // criar schemas se não existirem
  await dbUnitTest`CREATE SCHEMA IF NOT EXISTS ${dbUnitTest(envTest.SCHEMA_UNIT)}`;

  await migrate(drizzle(dbUnitTest, { schema: { [envTest.SCHEMA_UNIT!]: {} } }), { migrationsFolder: './drizzle' });
})

beforeEach(async () => {
  await dbUnitTest`TRUNCATE TABLE ${dbUnitTest("budgets")} RESTART IDENTITY CASCADE;`;
  await dbUnitTest`TRUNCATE TABLE ${dbUnitTest("clients")} RESTART IDENTITY CASCADE;`;
  await dbUnitTest`TRUNCATE TABLE ${dbUnitTest("vehicles")} RESTART IDENTITY CASCADE;`;
  await dbUnitTest`TRUNCATE TABLE ${dbUnitTest("budget_items")} RESTART IDENTITY CASCADE;`;
})

afterAll(async () => {
  // remover schemas criados
  await dbUnitTest`DROP SCHEMA IF EXISTS ${dbUnitTest(envTest.SCHEMA_UNIT)} CASCADE`;
  // fechar a conexão com o banco de dados
  await dbUnitTest.end();
})