# Prompt 4: Parallax Depth & Mega Footer

**Task**: Finalize the premium feel by completely revamping `StatsBar.tsx`, `AboutUs.tsx`, and `GlobalFooter.tsx`.

## Step 1: `StatsBar.tsx` (Cinematic Data)
- **Background Depth**: Add an absolute positioned SVG grid background that slowly scales up and fades out infinitely, creating a sense of forward motion.
- **Number Animation**: Use `react-countup` but ensure it only triggers when firmly in the viewport (using `useInView`). Wrap the numbers in a massive, bold font with a subtle gradient text mask.

## Step 2: `AboutUs.tsx` (Multi-layer Parallax)
- **Complex Parallax**: Implement a multi-layered parallax effect.
  - The main image/graphic should move upwards slowly as the user scrolls down (`useScroll` mapped to a negative Y value).
  - Floating UI elements (like a "100% Secure" badge) placed around the main image should move at *different* speeds to create a strong 3D depth effect.
- **Typography Polish**: Give the "Our Mission" text block maximum readability. Use a very subtle left-border gradient to anchor the text visually.

## Step 3: `GlobalFooter.tsx` (Interactive Mega Footer)
- **Massive Top CTA**: Design the "Ready to take control?" section as a distinct block sitting *above* the main footer columns. Give it a deep radial gradient background and a glowing button.
- **Organized Links**: Arrange the navigation links meticulously. Add a sleek interaction: when hovering over a link, a small arrow (`->`) should slide in from the left, or the text should translate slightly to the right.
- **Social Icons**: The social icons should be enclosed in circles with `border-white/10`. On hover, they should fill with their respective brand colors (e.g., Twitter blue) while the icon turns white.
- **Subtle Polish**: Add an ultra-fine `border-t border-white/5` with a very soft white glow at the very top edge of the footer.

**Wait for my next command ("next") after you complete this step.**
