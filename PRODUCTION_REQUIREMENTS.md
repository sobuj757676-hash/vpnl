# Production Requirements

To transition the prototype into a robust, scalable, and secure production-ready application, the following technical requirements must be met:

## 1. Database & State Management
- **Connection Pooling**: Implement efficient PostgreSQL connection pooling (e.g., PgBouncer or Prisma Accelerate) to handle concurrent traffic spikes gracefully.
- **Caching Layer**: Integrate Redis or an in-memory caching mechanism for frequently accessed data, such as VPN product catalogs, themes, and dynamic wildcard subdomain configurations.

## 2. Security & Hardening
- **Security Headers**: Implement strict HTTP security headers (Content-Security-Policy, Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options, etc.) to mitigate common web vulnerabilities.
- **Authentication Hardening**: Ensure strict session management, secure HTTP-only cookies (`Secure`, `HttpOnly`, `SameSite`), and robust TOTP/2FA brute-force protection.
- **Rate Limiting**: Apply rate limiting to all Next.js API Routes and Edge routes—especially login, 2FA, and CMS update endpoints—to prevent abuse and DoS attacks.
- **Input Validation**: Use Zod to strictly validate all incoming payloads, query parameters, and environment variables at runtime.
- **Subdomain Slug Constraints**: Ensure robust constraint checks and enforce a reserved keyword blacklist (e.g., "api", "admin", "www") for subdomain slugs to prevent routing collisions.

## 3. Reliability & Observability
- **Environment Variable Validation**: Validate all critical environment variables (e.g., `DATABASE_URL`, `JWT_SECRET`) at build time and runtime to prevent silent runtime failures.
- **Error Logging & Monitoring**: Integrate a centralized logging and monitoring platform to capture client/server-side errors, track application latency, and alert on 5xx status codes.
- **Graceful Error Handling**: Ensure standard fallback UI and handling for database connection failures (especially during Next.js static generation in CI/CD). Provide a dummy connection string fallback when instantiating the Prisma Client if `DATABASE_URL` is missing.

## 4. Performance Optimization
- **Lighthouse Targets**: Achieve ≥ 90 on all Core Web Vitals scores (Performance, Accessibility, Best Practices, SEO), aiming for LCP < 1.5s and CLS < 0.05.
- **Asset Optimization**: Ensure all image uploads via Admin CMS are auto-converted to WebP/AVIF using `sharp`, properly sized, and served with aggressive caching. Ensure `next/image` is strictly configured with specific domain names.
- **Bundle Size Optimization**: Split large `node_modules` dependencies into separate vendor chunks in Vite (Admin Panel) to resolve chunk size warnings. Optimize Turbopack/Webpack configuration in Next.js to minimize main bundle sizes.

## 5. Quality Assurance
- **Cross-Browser & Mobile Testing**: Guarantee 100% functionality on Chrome, Firefox, Safari, Edge, and full mobile responsiveness down to 320px screens.
- **Accessibility (WCAG 2.1 AA)**: Maintain strict adherence to accessibility standards, ensuring robust ARIA attributes and visible focus rings.
