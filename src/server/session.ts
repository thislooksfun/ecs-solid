import { createCookieSessionStorage } from "solid-start";

import { serverEnvironment } from "~/server/env";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    secrets: [serverEnvironment.SESSION_SECRET],
    secure: serverEnvironment.NODE_ENV === "production",
  },
});
