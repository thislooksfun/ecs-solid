import { config as loadDotenv } from "dotenv";
import solid from "solid-start/vite";
import { defineConfig } from "vite";

// eslint-disable-next-line import/no-default-export
export default defineConfig(() => {
  loadDotenv();
  return {
    plugins: [solid({ ssr: true })],
    build: {
      rollupOptions: { external: ["@prisma/client"] },
    },
  };
});
