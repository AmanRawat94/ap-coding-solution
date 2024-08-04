import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: import.meta.env.VITE_API_BASE_URL,
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
