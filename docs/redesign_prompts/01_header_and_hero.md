# Prompt 1: Next-Gen Header & Main Hero Redesign

**Task**: Completely redesign the `Header.tsx` and `MainHero.tsx` components to match a modern, premium SaaS (like Vercel or top VPNs).

## Context & Rules
- Tech Stack: Next.js (App Router), Tailwind CSS v4, Framer Motion, Lucide React.
- Style: Premium dark theme, advanced glassmorphism (`backdrop-blur-xl`, `bg-black/50`), glowing gradients, highly polished animations.

## Step 1: `Header.tsx`
- Implement a floating, glassmorphic header that becomes sticky with a shrink effect upon scrolling.
- **Mega Menu (Optional but recommended)**: Change simple nav links into a hover-triggered dropdown/mega-menu using Framer Motion (use `AnimatePresence` for smooth in/out).
- **Mobile Menu**: Create a sleek, full-screen overlay for the mobile menu using Framer Motion rather than a basic dropdown.
- **Accessibility**: Ensure `focus-visible` rings and proper ARIA attributes are maintained.

## Step 2: `MainHero.tsx`
- Keep the existing props (`headline`, `subHeadline`, `ctaLabel`, `ctaUrl`).
- **Background**: Upgrade the background effects. Instead of simple blur blobs, create a more complex, slow-moving animated background (e.g., aurora effect or glowing grid lines) using Framer Motion or pure CSS.
- **Typography**: Enhance the headline with a modern text-gradient and letter-spacing tracking. Add a staggered reveal animation to the headline words/letters.
- **CTA**: Design a highly converting "magnetic" or "glowing border" button for the primary CTA. When hovering, the gradient border should rotate or glow brighter.
- **Hero Image/Mockup (Optional Addition)**: Add an abstract 3D-like floating element or dashboard mockup graphic that gently floats up and down.

**Wait for my next command ("next") after you complete this step.**
