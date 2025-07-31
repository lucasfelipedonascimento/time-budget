import postgres from "postgres";
import { envTest } from './src/env/test'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { beforeAll, afterAll, beforeEach } from 'vitest'

const dbIntegrationTest = postgres(envTest.SCHEMA_INTEGRATION!, { max: 1 });

beforeAll(async () => {
  // criar schemas se não existirem
  await dbIntegrationTest`CREATE SCHEMA IF NOT EXISTS ${dbIntegrationTest(envTest.SCHEMA_INTEGRATION)}`;

  await migrate(drizzle(dbIntegrationTest, { schema: { [envTest.SCHEMA_INTEGRATION!]: {} } }), { migrationsFolder: './drizzle' });
})

beforeEach(async () => {
  await dbIntegrationTest`TRUNCATE TABLE ${dbIntegrationTest("budgets")} RESTART IDENTITY CASCADE;`;
  await dbIntegrationTest`TRUNCATE TABLE ${dbIntegrationTest("clients")} RESTART IDENTITY CASCADE;`;
  await dbIntegrationTest`TRUNCATE TABLE ${dbIntegrationTest("vehicles")} RESTART IDENTITY CASCADE;`;
  await dbIntegrationTest`TRUNCATE TABLE ${dbIntegrationTest("budget_items")} RESTART IDENTITY CASCADE;`;
})

afterAll(async () => {
  // remover schemas criados
  await dbIntegrationTest`DROP SCHEMA IF EXISTS ${dbIntegrationTest(envTest.SCHEMA_INTEGRATION)} CASCADE`;
  // fechar a conexão com o banco de dados
  await dbIntegrationTest.end();
})