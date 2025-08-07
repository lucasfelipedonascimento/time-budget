// vitest.config.unit.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["test/contexts/**/domain/entities/*.test.ts"],
  },
});
