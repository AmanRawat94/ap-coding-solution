// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";

// // https://vitejs.dev/config/
// export default defineConfig({
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://localhost:3000",
//         secure: false,
//       },
//     },
//   },
//   plugins: [react()],
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },
  plugins: [react()],
  // esbuild: {
  //   jsxInject: `import React from 'react'`,
  // },
  optimizeDeps: {
    esbuildOptions: {
      jsx: "transform",
      jsxFactory: "React.createElement",
      jsxFragment: "React.Fragment",
    },
  },
  json: {
    stringify: true,
  },
  build: {
    target: "esnext",
  },
});
