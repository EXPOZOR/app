"use client";

import { useReducedMotion } from "framer-motion";

/**
 * The single JavaScript boundary for the user's reduced-motion preference.
 * CSS animation suppression remains centralized in globals.css.
 */
export function useMotionPreference() {
  const reduceMotion = useReducedMotion() ?? false;

  return {
    reduceMotion,
    allowMotion: !reduceMotion,
  } as const;
}
