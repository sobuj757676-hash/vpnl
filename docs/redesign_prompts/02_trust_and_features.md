# Prompt 2: Advanced Bento Grid & Infinite Marquee

**Task**: Elevate `TrustAndTestimonials.tsx` and `WhyChooseUs.tsx` to absolute top-tier quality, focusing on complex micro-interactions.

## Step 1: `TrustAndTestimonials.tsx` (Flawless Marquee)
- **Infinite Logo Marquee**: Build an auto-scrolling row of logos.
  - Crucially, wrap the marquee container in a `mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent)` so the logos smoothly fade out at the left and right edges.
  - The animation should pause on hover.
- **Review Cards Refinement**: Convert the standard testimonial cards into sleek glassmorphic panels. Add a subtle radial gradient to the background of the card that becomes slightly more opaque on hover.

## Step 2: `WhyChooseUs.tsx` (Spotlight Bento Grid)
- **Bento Grid Layout**: Move away from a uniform 3x2 grid. Create a "Bento" layout where some cards span 2 columns or 2 rows (e.g., `md:col-span-2`, `md:row-span-2`).
- **Linear-Style Mouse Spotlight Effect**: This is the most important part. For the entire Bento grid container:
  - Track the mouse X/Y coordinates across the parent container.
  - Pass these coordinates to every individual feature card.
  - Inside each card, use these coordinates to render a subtle, soft radial gradient (a "spotlight") that illuminates the border and background *only* when the mouse is near it.
- **Card Content**: Each card should have abstract, low-opacity SVG patterns (dots, grid lines, topographic maps) in the background. When the mouse enters the card, the icon should trigger a spring-based scale animation.

**Wait for my next command ("next") after you complete this step.**
