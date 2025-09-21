import { defineConfig } from "vitest/config";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

export default defineConfig({
  test: {
    globals: true,
    setupFiles: [""],
    coverage: {
      enabled: true,
      exclude: [
        "vitest.**.ts",
        "vitest.setup.**.ts",
        "src/constants/**",
        "src/contexts/**/domain/dto",
      ],
      include: ["src/contexts/**/domain/**/*.ts"],
    },
    environment: "node",
    include: ["test/**/*.test.ts"],
  },
});
