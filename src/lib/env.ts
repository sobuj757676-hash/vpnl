import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(1),
  S3_REGION: z.string().optional(),
  S3_ACCESS_KEY_ID: z.string().optional(),
  S3_SECRET_ACCESS_KEY: z.string().optional(),
  S3_ENDPOINT: z.string().optional(),
  S3_FORCE_PATH_STYLE: z.string().optional(),
  S3_BUCKET_NAME: z.string().optional(),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
});

const validateEnv = () => {
  // During Next.js static generation builds (e.g. on Vercel), many variables might be missing.
  // We don't want the build to fail if we're just pre-rendering static pages without a DB.
  // But we want it to fail correctly at runtime.
  const isBuildPhase = process.env.npm_lifecycle_event === 'build' || process.env.CI === 'true';

  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    if (isBuildPhase) {
      console.warn('⚠️ Environment variable validation failed during build. Ignoring for static generation.');
      return process.env as z.infer<typeof envSchema>;
    }
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables');
  }

  return parsed.data;
};

export const env = validateEnv();
