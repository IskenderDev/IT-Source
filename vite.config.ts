import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/itsource/public/",
  server: {
    proxy: {
      "/api": {
        target: "http://localhost/itsource",
        changeOrigin: true,
      },
    },
  },
});
