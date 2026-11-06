/**
 * Unified Motion Design Tokens
 * 
 * Consistent motion language across GSAP, CSS, and Framer Motion:
 * - Easing curve family: Exponential / Apple fluid cubic-bezier (0.23, 1, 0.32, 1)
 * - Duration scale:
 *     fast: 180ms (micro-interactions, button presses, tooltips)
 *     base: 380ms (drawers, reveals, modals, page transitions)
 *     slow: 750ms (atmospheric ambient shifts, camera fly-throughs)
 * - Stagger interval: 80ms
 */

export const MOTION_TOKENS = {
  // Cubic Bezier parameters
  ease: {
    out: [0.23, 1, 0.32, 1] as [number, number, number, number],
    inOut: [0.77, 0, 0.175, 1] as [number, number, number, number],
    cssOut: 'cubic-bezier(0.23, 1, 0.32, 1)',
    cssInOut: 'cubic-bezier(0.77, 0, 0.175, 1)',
    gsapOut: 'power3.out',
    gsapInOut: 'power3.inOut',
  },
  
  // Duration scale (in seconds for GSAP / Framer Motion, in ms for CSS)
  duration: {
    fast: 0.18,       // 180ms
    base: 0.38,       // 380ms
    slow: 0.75,       // 750ms
    fastMs: 180,
    baseMs: 380,
    slowMs: 750,
  },
  
  // Stagger intervals
  stagger: {
    base: 0.08,       // 80ms between elements
  },
  
  // Spring presets (critically damped, no cartoonish overshoot)
  spring: {
    default: { type: 'spring' as const, stiffness: 280, damping: 25, mass: 1 },
    snappy: { type: 'spring' as const, stiffness: 350, damping: 30, mass: 0.8 },
    smooth: { type: 'spring' as const, stiffness: 180, damping: 24, mass: 1.2 },
  },
} as const;

export default MOTION_TOKENS;
