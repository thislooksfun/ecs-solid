import { config as loadDotenv } from "dotenv";
import solid from "solid-start/vite";
// @ts-expect-error -- no typings yet
import vercel from "solid-start-vercel";
import { defineConfig } from "vite";

// eslint-disable-next-line import/no-default-export
export default defineConfig(() => {
  loadDotenv();
  return {
    plugins: [
      solid({
        ssr: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        adapter: vercel({
          // The build currently is not edge-compatible. :(
          edge: false,
        }),
      }),
    ],
    build: {
      rollupOptions: { external: ["@prisma/client"] },
    },
  };
});
