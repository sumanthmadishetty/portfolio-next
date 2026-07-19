"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}

/** Shared section wrapper: anchor id, mono eyebrow, display heading, reveal-on-scroll. */
export function Section({ id, eyebrow, title, children, className }: SectionProps) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-5xl px-6 py-24 md:py-32 ${className ?? ""}`}>
      {(eyebrow || title) && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          {eyebrow && (
            <p className="mb-2 font-mono text-sm text-accent">{eyebrow}</p>
          )}
          {title && (
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {title}
            </h2>
          )}
        </motion.div>
      )}
      {children}
    </section>
  );
}

/** Motion-reveal wrapper for list items / cards. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
