import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
 

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), "");

  return {
    envPrefix: "REACT_",
    server: {
      host: "localhost",
      port: env.PORT || 3000,
      open: true,
    },
    preview: {
      host: "localhost",
      port: env.PORT || 3000,
      open: true,
    },
    build: {
      // eslint-disable-next-line no-undef
      outDir: path.join(__dirname, "build"),
    },
    plugins: [react(),
    ViteImageOptimizer({
      includePublic: true,
      webp: {
        quality: 80,
      },
      jpeg: {
        quality: 70,
      },
      png: {
        quality: 80,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ]
  };
});
