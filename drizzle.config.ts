import { defineConfig } from "drizzle-kit";
import { env } from "./src/env/local";

export default defineConfig({
  dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
  casing: 'snake_case',
  schema: './src/infrastructure/database/schema/*/schema.ts',
  out: './src/infrastructure/database/migrations',
  dbCredentials: {
    url: env.DATABASE_URL,
  }
})
