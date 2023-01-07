import GitHub from "@auth/core/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type SolidAuthConfig } from "@solid-auth/next";

import { serverEnvironment } from "~/server/env";

import { prisma } from "./db/client";

declare module "@auth/core" {
  interface Session {
    user: {
      id: string;
      name: string;
      avatar?: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  }
}

export const authConfig: SolidAuthConfig = {
  // TODO: Make a hybrid Redis/Prisma adapter? Store Users in Prisma, but
  // Sessions and VerificationTokens in Redis.

  // @ts-expect-error -- import mismatch, but it works fine.
  adapter: PrismaAdapter(prisma),

  callbacks: {
    session: async ({ session, user }) => {
      session.user = {
        id: user.id,
        name: user.name,
        avatar: user.image ?? undefined,
      };
      return session;
    },
  },

  debug: false,

  // TODO: Custom pages!
  // pages: {},

  providers: [
    GitHub({
      clientId: serverEnvironment.GITHUB_CLIENT_ID,
      clientSecret: serverEnvironment.GITHUB_CLIENT_SECRET,
      authorization: {
        params: { scope: "user:email" },
      },
    }),
    // TODO: More providers
    // TODO: Add credentials auth, using patch-package to make it actually work.
  ],
  secret: serverEnvironment.AUTH_SECRET,
  session: {
    strategy: "database",
    generateSessionToken: () => crypto.randomUUID(),
  },
};
