import dotenv from "dotenv";
import solid from "solid-start/vite";
import { defineConfig } from "vite";

// eslint-disable-next-line import/no-default-export
export default defineConfig(() => {
  dotenv.config();
  return {
    plugins: [solid({ ssr: true })],
    build: {
      rollupOptions: { external: ["@prisma/client"] },
    },
  };
});
