import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Set base to "/" for a root GitHub Pages site (e.g. username.github.io)
// If deploying to a project repo (username.github.io/KyroWTF), change to "/KyroWTF/"
const BASE = "/";

export default defineConfig({
  base: BASE,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
});
