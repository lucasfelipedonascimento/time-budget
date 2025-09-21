// vitest.config.unit.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: [
      "test/contexts/**/application/use-cases/*.test.ts",
      "test/contexts/**/application/controllers/*.test.ts",
    ],
  },
});
