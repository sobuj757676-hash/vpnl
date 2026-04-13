# Prompt 1: Next-Level Header & Hero (Top-Notch SaaS)

**Task**: Completely redesign `Header.tsx` and `MainHero.tsx` to match the ultra-premium tier of modern web design (think Vercel, Linear, Stripe).

## Global Rules
- **Stack**: Next.js App Router, Tailwind CSS v4, Framer Motion v12+, Lucide React.
- **Aesthetic**: Premium dark mode. Use deep zinc/black backgrounds (`bg-zinc-950`), absolute minimal borders (`border-white/5`), and high-contrast glowing elements.
- **Performance**: Use `useClient` only where strictly necessary.

## Step 1: `Header.tsx` (Dynamic Glassmorphic Header)
- **Scroll-Linked Animation**: Use Framer Motion's `useScroll` and `useMotionValueEvent` to detect scroll direction.
  - When scrolling down, the header should translate up (hide).
  - When scrolling up, it should reveal itself but shrink slightly and apply an intense backdrop blur (`backdrop-blur-2xl bg-zinc-950/60`).
- **Mega Menu (Desktop)**: Implement an interactive, animated dropdown menu for the navigation links using `AnimatePresence`. The dropdown should have a soft, multi-layered shadow and a subtle entrance animation (scale up from 0.95 to 1, opacity fade).
- **Magnetic CTA**: The "Get Started" button in the header should feature a "magnetic" effect on hover (moving slightly towards the cursor) using Framer Motion.

## Step 2: `MainHero.tsx` (Immersive Landing Experience)
- **Background - Aurora / Mesh Gradient**: Instead of static blobs, implement a complex animated background. Use multiple overlapping, slow-moving `<motion.div>` elements with extreme blur (`blur-[120px]`) in deep blues, purples, and cyans. Rotate and translate them continuously on an infinite loop to create a breathing "Aurora" effect.
- **Typography - Staggered Text Reveal**: The main `headline` must have a staggered reveal animation. Split the text into lines or words, and animate them sliding up from behind a hidden mask (`overflow-hidden`).
  - Use a text gradient: `bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40`.
- **Primary CTA - Glowing Border & Spotlight**: Create a highly advanced button.
  - Add an absolute positioned element inside the button that acts as a "spotlight" following the user's mouse position (using `onMouseMove` and React state for X/Y coordinates).
  - The border should be an animated gradient that slowly spins.
- **Abstract Floating Mockup (Optional but Highly Recommended)**: Add a beautiful, abstract 3D-like representation of a dashboard or abstract geometric shapes below the text. Use Framer Motion to make it float up and down gently (y-axis sine wave).

**Wait for my next command ("next") after you complete this step.**
