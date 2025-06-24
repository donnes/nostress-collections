import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import path from "node:path";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tanstackStart({ target: "netlify" }),
    tsConfigPaths({
      projects: [path.resolve(__dirname, "./tsconfig.json")],
    }),
  ],
});
