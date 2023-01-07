import { SolidAuth } from "@solid-auth/next";

import { authConfig } from "~/server/auth";

// eslint-disable-next-line @typescript-eslint/unbound-method
export const { GET, POST } = SolidAuth(authConfig);
