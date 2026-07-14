"use client";

import { cn } from "@/lib/cn";
import { TRANSITION } from "@/lib/motion";
import { useMotionPreference } from "@/lib/use-motion-preference";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export interface SectionHeaderProps {
  headingId: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "start" | "center";
  animated?: boolean;
  className?: string;
}

export function SectionHeader({
  headingId,
  eyebrow,
  title,
  description,
  align = "center",
  animated = true,
  className,
}: SectionHeaderProps) {
  const { reduceMotion } = useMotionPreference();
  const shouldAnimate = animated && !reduceMotion;

  return (
    <header className={cn(align === "center" ? "text-center" : "text-left", className)}>
      {eyebrow && (
        <motion.p
          className="eyebrow mb-3.5"
          initial={shouldAnimate ? { opacity: 0, y: -4 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={TRANSITION.slow}
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.h2
        id={headingId}
        className="section-heading mb-3.5"
        initial={shouldAnimate ? { opacity: 0, y: 14 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ...TRANSITION.reveal, delay: 0.08 }}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          className={cn("section-subtitle", align === "center" && "mx-auto")}
          initial={shouldAnimate ? { opacity: 0, y: 10 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...TRANSITION.reveal, delay: 0.14 }}
        >
          {description}
        </motion.p>
      )}
    </header>
  );
}
