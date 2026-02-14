// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
      // shared 폴더
      { find: "@shared", replacement: path.resolve(__dirname, "src/shared") },
      /* features 내부 폴더들 */
      {
        find: "@announce",
        replacement: path.resolve(__dirname, "src/features/announce"),
      },
      {
        find: "@main",
        replacement: path.resolve(__dirname, "src/features/main"),
      },
      {
        find: "@userlist",
        replacement: path.resolve(__dirname, "src/features/userlist"),
      },
      {
        find: "@specific",
        replacement: path.resolve(__dirname, "src/features/specific"),
      },
    ],
  },
});
