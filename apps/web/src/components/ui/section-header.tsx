"use client";

import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "framer-motion";
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
  const reduceMotion = useReducedMotion();
  const shouldAnimate = animated && !reduceMotion;

  return (
    <header className={cn(align === "center" ? "text-center" : "text-left", className)}>
      {eyebrow && (
        <motion.p
          className="eyebrow mb-3.5"
          initial={shouldAnimate ? { opacity: 0, y: -4 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
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
        transition={{ delay: 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          className={cn("section-subtitle", align === "center" && "mx-auto")}
          initial={shouldAnimate ? { opacity: 0, y: 10 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.14, duration: 0.5 }}
        >
          {description}
        </motion.p>
      )}
    </header>
  );
}
