"use client";

import { EASE_OUT } from "@/lib/motion";
import { type MotionStyle, motion } from "framer-motion";
import { useRef } from "react";

const bentoCardVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    boxShadow: "none",
  },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    boxShadow: [
      "none",
      "0 0 0 1px color-mix(in oklch, var(--decorative) 35%, transparent), 0 0 24px color-mix(in oklch, var(--decorative) 18%, transparent)",
      "none",
    ],
    transition: {
      delay,
      duration: 0.55,
      ease: EASE_OUT,
      boxShadow: { delay: delay + 0.1, duration: 0.9, times: [0, 0.35, 1] },
    },
  }),
};

/** Cursor-aware behavior for a single feature card. */
export function FeaturesBentoCard({
  children,
  delay = 0,
  style,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties | undefined;
  className?: string | undefined;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    cardRef.current?.style.setProperty("--x", `${event.clientX - rect.left}px`);
    cardRef.current?.style.setProperty("--y", `${event.clientY - rect.top}px`);
  }

  function onMouseEnter() {
    if (spotRef.current) spotRef.current.style.opacity = "1";
    if (cardRef.current) {
      cardRef.current.style.transform = "translateY(-4px)";
      cardRef.current.style.borderColor = "var(--border-strong)";
      cardRef.current.style.boxShadow = "var(--shadow-card)";
    }
  }

  function onMouseLeave() {
    if (spotRef.current) spotRef.current.style.opacity = "0";
    if (cardRef.current) {
      cardRef.current.style.transform = "translateY(0)";
      cardRef.current.style.borderColor = "var(--border)";
      cardRef.current.style.boxShadow = "none";
    }
  }

  return (
    <motion.div
      ref={cardRef}
      custom={delay}
      variants={bentoCardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--bg-elev-1)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        transition:
          "transform 200ms ease-out, border-color 200ms ease-out, box-shadow 200ms ease-out",
        ...(style as MotionStyle),
      }}
    >
      <div
        ref={spotRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background:
            "radial-gradient(200px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.055) 0%, transparent 100%)",
          opacity: 0,
          transition: "opacity 200ms ease-out",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
