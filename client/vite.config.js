import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1500, // Increase the warning limit to 1000 KB
  },
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_API_BASE_URL,
        secure: false,
      },
    },
  },
  plugins: [react()],
  preview: {
    host: true, // Allows access from external IPs
    port: 4173, // Specify the port if needed
  },
});
