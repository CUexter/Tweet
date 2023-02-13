import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { loadEnvConfig } from "@next/env";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(() => {
  loadEnvConfig(process.cwd());

  return {
    plugins: [react(), tsconfigPaths()],
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: "./src/utils/test/setup.ts",
      exclude: [...configDefaults.exclude, "e2e/*"],
    },
  };
});
