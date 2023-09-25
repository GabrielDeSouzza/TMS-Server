import { z } from 'zod';

const nodeEnv = z.enum(['development', 'production', 'test']);

const envSchema = z.object({
  NODE_ENV: nodeEnv.default('development'),

  DATABASE_URL: z.string().url().nonempty(),

  JWT_KEY: z.string().nonempty(),

  PORT: z.string().default('3000'),
});

export const env = envSchema.parse(process.env);
