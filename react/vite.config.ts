import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ""));
  return {
    base: process.env.GALACHAIN_EXAMPLES_ASSET_PATH || "/",
    plugins: [react(), svgr()],
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "src"),
      },
      preserveSymlinks: true,
    },
  };
});
