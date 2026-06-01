"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: "t1",
    quote:
      "Finally an expense app that doesn't make me feel guilty about spending. The AI categories are eerily accurate.",
    name: "Amara L.",
    role: "Product Designer",
    avatar: "A",
    avatarColor: "#7CF5C2",
  },
  {
    id: "t2",
    quote:
      "The receipt scanner is the fastest I've used. I snap, confirm in two seconds, and I'm done. Life-changing for business trips.",
    name: "Marcus T.",
    role: "Freelance Consultant",
    avatar: "M",
    avatarColor: "#FFB36B",
  },
  {
    id: "t3",
    quote:
      "My partner and I use it for shared expenses. The settle-up feature is brilliant — no more mental math.",
    name: "Sasha K.",
    role: "Engineer",
    avatar: "S",
    avatarColor: "#60a5fa",
  },
];

const logos = [
  { name: "Stripe", width: 64 },
  { name: "Vercel", width: 80 },
  { name: "Linear", width: 68 },
  { name: "Notion", width: 72 },
  { name: "Figma", width: 56 },
  { name: "GitHub", width: 72 },
];

export function TrustSection() {
  return (
    <section aria-label="Testimonials and trust signals" className="section-py">
      <div className="container-site">
        {/* Logo wall */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-center text-xs uppercase tracking-widest text-[var(--text-tertiary)] font-medium mb-8">
            Loved by people who work at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="text-[var(--text-tertiary)] font-semibold text-base md:text-lg opacity-40 hover:opacity-70 transition-opacity duration-200 select-none"
                aria-label={logo.name}
              >
                {logo.name}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative glass rounded-[var(--radius-xl)] p-6 border border-[var(--border)] flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-0.5" aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    size={14}
                    fill="var(--accent-2)"
                    className="text-[var(--accent-2)]"
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1">
                "{t.quote}"
              </p>

              {/* Author */}
              <footer className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ background: t.avatarColor + "22", color: t.avatarColor }}
                  aria-hidden="true"
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{t.name}</p>
                  <p className="text-xs text-[var(--text-tertiary)]">{t.role}</p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
