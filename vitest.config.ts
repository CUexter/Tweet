import { loadEnvConfig } from "@next/env";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults, defineConfig } from "vitest/config";

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
