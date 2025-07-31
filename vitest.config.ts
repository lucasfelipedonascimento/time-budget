import { defineConfig } from "vitest/config";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ["./vitest.setup.unit.ts", "./vitest.setup.integration.ts"],
    coverage: {
      enabled: true,
      exclude: [
        'vitest.**.ts',
        'vitest.setup.**.ts',
        'src/constants/**',
        'src/contexts/**/**/dto'
      ]
    },
    environment: "node",
    include: ["test/**/*.test.ts"],
  },
});
