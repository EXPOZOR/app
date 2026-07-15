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
  headingLevel?: 1 | 2;
  animated?: boolean;
  className?: string;
}

export function SectionHeader({
  headingId,
  eyebrow,
  title,
  description,
  align = "center",
  headingLevel = 2,
  animated = true,
  className,
}: SectionHeaderProps) {
  const { reduceMotion } = useMotionPreference();
  const shouldAnimate = animated && !reduceMotion;
  const Heading = headingLevel === 1 ? motion.h1 : motion.h2;

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

      <Heading
        id={headingId}
        className="section-heading mb-3.5"
        initial={shouldAnimate ? { opacity: 0, y: 14 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ...TRANSITION.reveal, delay: 0.08 }}
      >
        {title}
      </Heading>

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
