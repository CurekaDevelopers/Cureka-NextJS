import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  REACT_ENV: z.enum(["development", "production", "test"]).default("development"),
  REACT_SERVER_BASE_URL: z.string(),
});

export const env = envSchema.parse(import.meta.env);
