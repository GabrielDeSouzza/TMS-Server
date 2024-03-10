import { z } from 'zod';

const nodeEnv = z.enum(['development', 'production', 'test']);

const envSchema = z.object({
  NODE_ENV: nodeEnv.default('development'),

  DATABASE_URL: z.string().url().min(1),

  JWT_KEY: z.string().min(1),

  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
});

export const env = envSchema.parse(process.env);
