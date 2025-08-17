// vitest.config.unit.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["test/contexts/**/domain/**/*.test.ts"],
    exclude: ["src/contexts/**/domain/dto", 
              "src/contexts/**/domain/interfaces", 
              "src/infrastructure/database/schema",
              "src/infrastructure/database/migrations",
            ]
  },
});
