# Vercel Deployment & Development Guide

This document outlines the best practices and instructions for deploying the Multi-Tenant VPN Portfolio Ecosystem (both Main Next.js API/Website and React Admin Panel) to Vercel.

## 1. Architecture Overview
This ecosystem relies on a Monorepo-like structure (or two separate Vercel projects) due to differing build tools:
- **Next.js App (`/src`)**: Serves the main website, wildcard subdomain landing pages, and the backend API Routes (Node.js/Edge).
- **React Admin Panel (`/admin`)**: A Vite-based Single Page Application (SPA) that consumes the Next.js API.

## 2. Environment Variables
Both environments will require environment variables set in the Vercel Dashboard:
- `DATABASE_URL`: Connection string to your PostgreSQL (e.g., Supabase, Neon, RDS). Ensure you use a connection pooler (like PgBouncer or Prisma Accelerate) because serverless functions can quickly exhaust database connections.
- `JWT_SECRET`: A secure, randomly generated string for signing session tokens (must be compatible with \`jose\` for Edge runtimes).
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_S3_BUCKET_NAME`: Credentials for S3/Cloudflare R2 image storage.
- `NEXT_PUBLIC_MAIN_DOMAIN`: E.g., \`abcd.com\`. Used for calculating subdomains.

## 3. Rate Limiting in a Serverless Environment
Currently, the application utilizes an **in-memory Map** for rate limiting login attempts and analytics events.
- **The Limitation:** Vercel deploys Serverless Functions. Each function instance has its own memory, and instances are spun up and torn down constantly (cold starts). Therefore, an in-memory Map only limits requests hitting the *same* function instance. It is not a global rate limit.
- **Production Recommendation (Vercel KV or Upstash Redis):** To implement robust, global rate limiting, you should provision a Redis database (like Vercel KV). You can then use the `@vercel/kv` package or generic Redis client to track login attempts and enforce the rate limit accurately across all edge locations.

## 4. Subdomain Slug Collision
The application uses a real-time `/api/admin/vpn-products/check-slug` endpoint to warn the Super Admin if a subdomain is already taken during creation. This is also strictly enforced at the database level (`@unique` constraint in Prisma) to prevent race conditions.

## 5. Prisma ORM in Serverless
- **Connection Limits:** As mentioned, use a connection pool URL for `DATABASE_URL` (usually `postgres://...&pgbouncer=true` or Prisma Data Proxy).
- **Static Generation (`try/catch`):** In `src/` server components, Prisma queries are wrapped in `try/catch` blocks. If the DB is unreachable during Vercel's static build phase, the build won't crash, allowing CI/CD to succeed.
- **Prisma Generate:** Ensure your Vercel Build Command includes `npx prisma generate` before `next build`.

## 6. Wildcard Subdomain Routing
Vercel supports wildcard subdomains out-of-the-box on custom domains.
1. Add your domain \`abcd.com\` to Vercel.
2. Add the wildcard domain \`*.abcd.com\` to Vercel.
3. Configure your DNS provider (e.g., Cloudflare) to point a wildcard CNAME (`*`) to `cname.vercel-dns.com.`.
4. The \`src/proxy.ts\` middleware will automatically rewrite incoming \`*.abcd.com\` requests to the internal \`/subdomain/[slug]\` Next.js route.

## 7. Deploying the Admin Panel
The admin panel is in the `/admin` subdirectory. You can either:
- Deploy it as a **separate Vercel project**. Set the Root Directory to `admin`, Framework Preset to Vite, and Build Command to `npm run build`.
- Serve it through Next.js (requires merging the Vite output into Next.js `public` directory, or configuring Next.js rewrites). A separate project is highly recommended for separation of concerns and security.
