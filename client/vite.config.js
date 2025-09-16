// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/auth": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/auth/, "/auth"),
      },
      "/api/carpool": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/carpool/, "/carpool"),
      },
      "/api/ecocenter": {
        target: "http://localhost:3001", // backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/ecocenter/, "/ecocenter"),
      },
      "/api/live": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/live/, "/live"),
      },
      "/api/carbon": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/carbon/, "/carbon"),
      },
    },
  },
});
