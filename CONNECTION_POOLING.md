# Database Connection Pooling Configuration

When deploying this Next.js application to a serverless environment (like Vercel), your application instances will spin up and down rapidly in response to traffic. Because PostgreSQL handles connections by spawning a new process for each connection, this rapid scaling can quickly exhaust the database's connection limit, resulting in `PrismaClientInitializationError` or timeout errors.

To solve this, **Connection Pooling** is required for production.

## Option 1: Supabase / Neon / PgBouncer (Recommended)

If you are using a managed PostgreSQL provider like Supabase or Neon, they provide built-in connection poolers (often using PgBouncer).

1. Retrieve the **Transaction Connection Pooler** URL from your provider's dashboard. (It usually runs on a different port, e.g., `6543` instead of `5432`).
2. Update your `DATABASE_URL` environment variable to use this pooler URL.
3. Append `?pgbouncer=true` to the URL so Prisma knows it is talking to a pooler.

**Example `DATABASE_URL`:**
`postgres://user:password@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true`

*Note: For the `DIRECT_URL` (used exclusively for `prisma migrate` and `prisma push` operations), use the standard connection URL without `?pgbouncer=true`.*

## Option 2: Prisma Accelerate

If your provider does not offer a connection pooler, you can use **Prisma Accelerate**.

1. Enable Accelerate in your Prisma Data Platform dashboard.
2. Generate an Accelerate API key connection string.
3. Replace your `DATABASE_URL` with the generated `prisma://` URL.

**Example `DATABASE_URL`:**
`prisma://accelerate.prisma-data.net/?api_key=ey....`

*Note: If using Accelerate, you must also install the `@prisma/extension-accelerate` package and extend the Prisma Client in `src/lib/prisma.ts`.*
