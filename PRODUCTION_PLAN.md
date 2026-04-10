# Production Plan

This step-by-step roadmap details how to implement the production requirements for the project.

## Phase 1: Environment & Setup Validation
1. **Environment Variable Validation**: Setup strict validation for all environment variables (e.g. using `zod`) at the application entrypoint (Next.js config and Prisma instantiation). Ensure build-time dummy values are present for CI static builds.

## Phase 2: Security Hardening
2. **Security Headers**: Add strict security headers to `next.config.ts`. Include CSP, HSTS, X-Frame-Options, and others to protect the application.
3. **Authentication Hardening**: Audit JWT creation, cookie storage (ensure `Secure`, `HttpOnly`, `SameSite=Strict`), and 2FA brute force protections.
4. **Rate Limiting**: Implement a generic rate-limiting mechanism for key API routes (login, 2FA, data mutations).
5. **Input Validation**: Add `zod` schemas to validate all API request payloads and query parameters across all Next.js API routes.
6. **Subdomain Slug Safety**: Add constraints to prevent subdomain slug collisions and block a reserved keyword list ("api", "admin", "www", "test", etc.).

## Phase 3: Reliability & Observability
7. **Error Logging**: Set up structured error logging for Next.js Server Components, API routes, and Edge proxy. Use a standardized logger to output context-rich errors.
8. **Graceful Database Fallbacks**: Review Prisma Client instantiation and queries. Wrap critical queries in `try/catch` and gracefully handle missing DB connections during build-time (e.g. in `src/lib/prisma.ts`).
9. **Next.js Image Security**: Update `next.config.ts` to strictly allowlist specific domains for `next/image` to prevent open-proxy vulnerabilities and control costs.

## Phase 4: Performance & Optimization
10. **Admin Panel Build Optimization**: Configure `vite.config.ts` in the `admin/` directory to split large `node_modules` dependencies (e.g., React, UI libraries) into separate vendor chunks (`build.rollupOptions.output.manualChunks`).
11. **Database Connection Pooling**: Ensure Prisma Client is configured to work correctly with PgBouncer or Prisma Accelerate depending on the deployment environment. Provide documentation for pooling configuration.
12. **Caching Strategy**: Implement Next.js unstable_cache/fetch cache strategies for frequently accessed read-only data, such as public VPN catalogs and wildcard configurations.

## Phase 5: Testing & QA
13. **Accessibility Audit**: Perform a sweep of both the Admin Panel and Main Site to ensure full WCAG 2.1 Level AA compliance (ARIA attributes, `focus-visible:ring-*` classes).
14. **Cross-Browser & Mobile QA**: Test all main UI components down to 320px breakpoints, fixing any overflow or styling issues. Run Playwright verification scripts on key journeys.
