import { PrismaClient } from "@prisma/client";

import { isProd } from "~/server/env";

export const prisma = new PrismaClient({
  log: isProd ? ["error"] : ["query", "error", "warn"],
});
