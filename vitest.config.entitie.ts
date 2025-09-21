// vitest.config.unit.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: [
      "test/contexts/**/domain/entities/*.test.ts",
      "test/contexts/**/domain/aggregates/*.test.ts",
    ],
    exclude: [
      "src/contexts/**/domain/dto",
      "src/contexts/**/domain/interfaces",
      "src/contexts/**/domain/dto",
      "src/infra/database/schema",
      "src/infra/database/migrations",
      "test/contexts/**/infra",
    ],
  },
});
