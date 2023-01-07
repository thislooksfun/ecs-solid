import {
  type SafeParseReturnType,
  type SafeParseSuccess,
  type ZodFormattedError,
  z,
} from "zod";

function formatErrors(errors: ZodFormattedError<Map<string, string>, string>) {
  const formattedErrors = [];
  for (const [name, value] of Object.entries(errors)) {
    if (value && "_errors" in value)
      formattedErrors.push(`${name}: ${value._errors.join(", ")}\n`);
  }
  return formattedErrors;
}

function assertSuccessful<Input, Output>(
  parseResult: SafeParseReturnType<Input, Output>
): asserts parseResult is SafeParseSuccess<Output> {
  if (parseResult.success === false) {
    // eslint-disable-next-line no-console
    console.error(
      "❌ Invalid environment variables:\n",
      ...formatErrors(parseResult.error.format())
    );
    throw new Error("Invalid environment variables");
  }
}

const environmentScheme = z.object({
  /* eslint-disable @typescript-eslint/naming-convention */
  AUTH_SECRET: z.string(),

  DATABASE_URL: z.string(),

  // DISCORD_CLIENT_ID: z.string(),
  // DISCORD_CLIENT_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),

  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  SESSION_SECRET: z.string(),
  SITE_URL: z.string(),

  // UPSTASH_REDIS_REST_URL: z.string(),
  // UPSTASH_REDIS_REST_TOKEN: z.string(),
  /* eslint-enable @typescript-eslint/naming-convention */
});

console.log(process.env);
const environmentParseResult = environmentScheme.safeParse(process.env);
// console.log(environmentParseResult);
assertSuccessful(environmentParseResult);
export const serverEnvironment = environmentParseResult.data;
export const isProd = serverEnvironment.NODE_ENV === "production";
