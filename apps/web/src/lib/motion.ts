/**
 * @file src/lib/motion.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Shared Framer Motion variant library — EXPOZOR landing page.
 *
 * Rules:
 *   • All motion constants MUST come from this file.
 *   • No magic numbers in component files for animations.
 *   • All durations and easings mirror the CSS tokens in globals.css.
 *   • Every Variants object is "hidden" → "visible" by convention so that
 *     motion.div initial="hidden" whileInView="visible" always works.
 *
 * Performance constraints (from brief):
 *   • Only animate: opacity, transform, filter (paint-only properties).
 *   • Never animate: width/height/margin/padding inside keyframes/transitions
 *     (except the FAQ accordion, which is the sole authorised exception).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { Transition, Variants } from "framer-motion";

/* ── Canonical easings — mirror CSS --ease-* tokens ──────────────────────── */

/** Matches --ease-out: fast start, smooth deceleration. Primary easing. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Matches --ease-spring: slight overshoot for scale-pop moments only. */
export const EASE_SPRING = [0.34, 1.56, 0.64, 1] as const;

/** Matches --ease-in-out: symmetric, for looping animations. */
export const EASE_IN_OUT = [0.4, 0, 0.2, 1] as const;

/* ── Canonical durations — mirror CSS --dur-* tokens ─────────────────────── */

export const DUR = {
  fast: 0.08,
  base: 0.15,
  slow: 0.25,
  xslow: 0.42,
  reveal: 0.55, // standard whileInView reveal duration
} as const;

/* ── Viewport defaults ────────────────────────────────────────────────────── */

/** Standard once-only viewport trigger with a slight negative margin so
 *  elements begin animating just before they fully enter the viewport. */
export const VIEWPORT_ONCE = { once: true, margin: "-40px" } as const;

/** Tighter margin for elements near the bottom of their section. */
export const VIEWPORT_TIGHT = { once: true, margin: "-20px" } as const;

/* ── Base transition helper ───────────────────────────────────────────────── */

export function ease(duration = DUR.reveal, delay = 0): Transition {
  return { duration, delay, ease: EASE_OUT };
}

/* ═══════════════════════════════════════════════════════════════════════════
   VARIANT LIBRARY
   All objects follow the hidden → visible convention.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Fade + slide up ──────────────────────────────────────────────────────── */
/** Standard reveal: fades in while rising 16 px. Use for most section elements. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.reveal, ease: EASE_OUT } },
};

/** Shallower reveal (8 px) for elements that are already partially on-screen. */
export const fadeUpSm: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.reveal, ease: EASE_OUT } },
};

/* ── Fade only (no Y movement) ───────────────────────────────────────────── */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DUR.slow, ease: EASE_IN_OUT } },
};

/* ── Scale + fade pop ────────────────────────────────────────────────────── */
/** Scales from 92 % → 100 % while fading in. Used for badges and pills. */
export const scalePop: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: DUR.reveal, ease: EASE_OUT } },
};

/** Spring scale — slight overshoot. Use sparingly for celebratory moments. */
export const scaleSpring: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DUR.reveal, ease: EASE_SPRING },
  },
};

/* ── Directional slides ───────────────────────────────────────────────────── */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: DUR.reveal, ease: EASE_OUT } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 12 },
  visible: { opacity: 1, x: 0, transition: { duration: DUR.reveal, ease: EASE_OUT } },
};

/* ── Stagger container ────────────────────────────────────────────────────── */
/**
 * Wrap a list of children that each use `fadeUp` (or any hidden→visible
 * variant). The container itself is invisible; it only orchestrates timing.
 *
 * @param stagger      Seconds between each child (default: 0.055 = --stagger-base)
 * @param delayChildren  Initial delay before the first child fires (default: 0)
 */
export function staggerContainer(stagger = 0.055, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  };
}

/* ── Hover / tap feedback (used with whileHover / whileTap) ──────────────── */

/** Subtle card lift on hover. Pair with transition on the motion element. */
export const cardLift = {
  scale: 1.015,
  y: -3,
  transition: { duration: DUR.base, ease: EASE_OUT },
} as const;

/** Mint glow CTA button hover state. */
export const ctaGlow = {
  scale: 1.03,
  boxShadow: "0 0 40px color-mix(in oklch, #3DDC97 25%, transparent)",
  transition: { duration: DUR.base, ease: EASE_OUT },
} as const;

/** Secondary ghost button hover — no glow, just a tiny scale. */
export const ghostLift = {
  scale: 1.02,
  transition: { duration: DUR.base, ease: EASE_OUT },
} as const;

/** Standard tap shrink for any interactive element. */
export const tapShrink = { scale: 0.97 } as const;

/* ── Accordion (height: auto — sole authorised layout-property exception) ── */
/**
 * FAQ accordion open/close. Uses `height: "auto"` which is explicitly approved
 * in the brief as the sole exception to the layout-property ban.
 */
export const accordionVariants: Variants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.28, ease: EASE_OUT },
  },
  open: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.28, ease: EASE_OUT },
  },
};

/* ── Progress bar fill (transform: scaleX) ───────────────────────────────── */
/**
 * Animates a bar from 0 → `pct`% using scaleX (paint-only).
 * Apply `style={{ originX: 0 }}` on the motion element.
 *
 * @param pct    Target fill percentage (0–100)
 * @param delay  Optional stagger delay in seconds
 */
export function progressFill(pct: number, delay = 0): Variants {
  return {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: pct / 100,
      transition: { delay, duration: 0.75, ease: EASE_OUT },
    },
  };
}

/* ── Number pop — fires once a count-up animation completes ─────────────── */
/**
 * Use as an `animate` target on the stat element after the count-up triggers.
 * Cycles: rest → popped → rest via `animate` prop switching.
 */
export const numberPop: Variants = {
  rest: { scale: 1 },
  popped: {
    scale: [1, 1.045, 1],
    transition: { duration: 0.35, ease: EASE_OUT },
  },
};

/* ── Section eyebrow line ────────────────────────────────────────────────── */
/** Slides down 4 px and fades in. Used for all `.eyebrow` labels. */
export const eyebrowReveal: Variants = {
  hidden: { opacity: 0, y: -4 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.slow } },
};

/* ── Checklist item (x slide-in for security / CTA bullets) ─────────────── */
export const bulletSlideIn: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE_OUT } },
};

/* ── Cross-fade swap (AnimatePresence mode="wait" pair) ─────────────────── */
export const crossFade: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.18, ease: EASE_OUT } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.14 } },
};
