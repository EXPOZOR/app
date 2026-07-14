"use client";

import { WaitlistForm } from "@/components/waitlist-form";
import { useMotionPreference } from "@/lib/use-motion-preference";
import { useCallback, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  rotSpeed: number;
  color: string;
  w: number;
  h: number;
  opacity: number;
  shape: "rect" | "circle" | "ribbon";
};

const CONFETTI_COLORS = [
  "var(--positive)",
  "#A78BFA",
  "#FB923C",
  "#60A5FA",
  "#F472B6",
  "#FBBF24",
  "#34D399",
];

function useConfetti() {
  const { allowMotion } = useMotionPreference();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const aliveRef = useRef(false);

  const fire = useCallback(() => {
    if (!allowMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = "block";

    const context = canvas.getContext("2d");
    if (!context) return;

    const originX = canvas.width / 2;
    const particles: Particle[] = Array.from({ length: 140 }, () => {
      const angle = Math.random() * Math.PI * 1.4 - Math.PI * 0.7;
      const speed = Math.random() * 14 + 4;

      return {
        x: originX + (Math.random() - 0.5) * 200,
        y: canvas.height * 0.45,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 6,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        color:
          CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)] ?? "var(--positive)",
        w: Math.random() * 10 + 4,
        h: Math.random() * 5 + 3,
        opacity: 1,
        shape: (["rect", "circle", "ribbon"] as const)[Math.floor(Math.random() * 3)] ?? "rect",
      };
    });

    aliveRef.current = true;
    const targetCanvas: HTMLCanvasElement = canvas;
    const targetContext: CanvasRenderingContext2D = context;

    function tick() {
      if (!aliveRef.current) return;
      targetContext.clearRect(0, 0, targetCanvas.width, targetCanvas.height);

      let living = 0;
      for (const particle of particles) {
        if (particle.opacity <= 0.01) continue;
        living++;
        particle.vx *= 0.99;
        particle.vy += 0.32;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rot += particle.rotSpeed;

        if (particle.y > targetCanvas.height * 0.65) particle.opacity -= 0.018;

        targetContext.save();
        targetContext.globalAlpha = Math.max(0, particle.opacity);
        targetContext.fillStyle = particle.color;
        targetContext.translate(particle.x, particle.y);
        targetContext.rotate((particle.rot * Math.PI) / 180);

        if (particle.shape === "circle") {
          targetContext.beginPath();
          targetContext.arc(0, 0, particle.w / 2, 0, Math.PI * 2);
          targetContext.fill();
        } else if (particle.shape === "ribbon") {
          targetContext.fillRect(
            -particle.w * 1.5,
            -particle.h / 2,
            particle.w * 3,
            particle.h / 2,
          );
        } else {
          targetContext.fillRect(-particle.w / 2, -particle.h / 2, particle.w, particle.h);
        }

        targetContext.restore();
      }

      if (living > 0) {
        requestAnimationFrame(tick);
      } else {
        targetCanvas.style.display = "none";
        aliveRef.current = false;
      }
    }

    requestAnimationFrame(tick);
    setTimeout(() => {
      aliveRef.current = false;
      targetCanvas.style.display = "none";
    }, 5000);
  }, [allowMotion]);

  return { canvasRef, fire };
}

/** The interactive portion of the otherwise server-rendered final CTA. */
export function WaitlistCelebrationForm() {
  const { canvasRef, fire } = useConfetti();

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          display: "none",
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
      <WaitlistForm onSuccess={fire} />
    </>
  );
}
