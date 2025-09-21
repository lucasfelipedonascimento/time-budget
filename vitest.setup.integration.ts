import { beforeAll, afterAll } from "vitest";
import { execSync } from "child_process";
import { randomUUID } from "crypto";
import { config as dotenvConfig } from "dotenv";
import { envTest } from "./src/env/test";
import { sqlTest } from "./test/infra/database/connection-test";

dotenvConfig({ path: ".env.test" });

export let TEST_SCHEMA: string;

beforeAll(async () => {
  // Criar nome único de schema
  TEST_SCHEMA =
    envTest.SCHEMA_INTEGRATION + randomUUID().replace(/-/g, "").slice(0, 6);

  // Criar schema temporário
  await sqlTest.unsafe(`CREATE SCHEMA IF NOT EXISTS "${TEST_SCHEMA}"`);

  console.log(`Schema de teste criado: ${TEST_SCHEMA}`);

  // Rodar migrações apontando pro schema temporário
  execSync(`DB_SCHEMA=${TEST_SCHEMA} npx drizzle-kit migrate`, {
    stdio: "inherit",
    env: { ...process.env, DB_SCHEMA: TEST_SCHEMA },
  });
});

afterAll(async () => {
  // Limpar schema
  await sqlTest.unsafe(`DROP SCHEMA IF EXISTS "${TEST_SCHEMA}" CASCADE`);
  await sqlTest.end();

  console.log(`Schema de teste removido: ${TEST_SCHEMA}`);
});
