import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().default("http://localhost:3000"),
  DATABASE_URL: z.string().optional(),
  BETTER_AUTH_SECRET: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  APPLE_CLIENT_ID: z.string().optional(),
  APPLE_CLIENT_SECRET: z.string().optional(),
  BARCODE_API_KEY: z.string().optional(),
  NUTRITION_API_KEY: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;
export const env = envSchema.parse(process.env);
