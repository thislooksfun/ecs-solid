import { getSession as getSessionBase } from "@solid-auth/next";
import { createServerData$, redirect } from "solid-start/server";

import { authConfig } from "~/server/auth";

export const getSession = (req: Request) => getSessionBase(req, authConfig);
export const ensureSession = async (
  req: Request,
  redirectTo = "/api/auth/signin"
) => {
  const session = await getSession(req);
  if (!session) throw redirect(redirectTo);
  return session;
};

// TODO: These are broken. See solidjs/solid-start#573.
// export const getSessionData = () =>
//   createServerData$((_, { request }) => getSession(request));
// export const ensureSessionData = () =>
//   createServerData$((_, { request }) => ensureSession(request));
