import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import commonjs from "vite-plugin-commonjs";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // commonjs()
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
    preserveSymlinks: true,
  },
});
