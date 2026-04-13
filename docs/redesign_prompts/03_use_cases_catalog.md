# Prompt 3: Scroll-Triggered Layouts & 3D Cards

**Task**: Completely overhaul `UseCases.tsx` and `VpnProductCatalog.tsx` to feature highly interactive, Apple-level scroll animations and 3D effects.

## Step 1: `UseCases.tsx` (Sticky Scroll Journey)
- **Apple-Style Sticky Scroll**: Discard the static side-by-side cards. Create a layout where the left column (containing the text descriptions for Individuals, Businesses, Travelers) is `sticky` and remains in the viewport.
- **Dynamic Content Swapping**: As the user scrolls down the page, track the scroll progress. The right side of the screen should smoothly fade/slide between large, high-fidelity visual representations (mockups, abstract illustrations) corresponding to whichever text section on the left is currently active/highlighted.
- Use Framer Motion's `useScroll` and `useTransform` to tie the opacity and Y-translation of the images directly to the scroll position.

## Step 2: `VpnProductCatalog.tsx` (3D Product Cards)
- **Interactive 3D Tilt**: Upgrade the product cards. Use `useMotionValue` and `useTransform` from Framer Motion.
  - Track mouse movement *over the specific card*.
  - Map the mouse X/Y to `rotateX` and `rotateY` values (e.g., max 10 degrees). When hovered, the card should physically tilt towards the user's cursor.
- **Dynamic Glow Based on Branding**: Ensure the hover glow effect uses the database value `product.primaryColor`.
- **Framer Motion `layoutId`**: For the category filter buttons at the top, implement an animated background pill that seamlessly glides between the active tabs using `<motion.div layoutId="activeTab">`.
- **Image Treatment**: If a logo exists, display it inside a deeply shadowed, slightly inset container. If not, generate a beautiful gradient placeholder based on the product name.

**Wait for my next command ("next") after you complete this step.**
