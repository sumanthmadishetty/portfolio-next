"use client";

import { useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { HeroScene } from "@/components/three/HeroScene";
import { profile } from "@/data/profile";
import { useSfx } from "@/hooks/useSfx";

function greeting() {
  const hr = new Date().getHours();
  if (hr < 12) return "good morning";
  if (hr < 18) return "good afternoon";
  return "good evening";
}

const emptySubscribe = () => () => {};

export function Hero() {
  // Server renders a neutral "hello"; the client swaps in the time-of-day
  // greeting right after hydration without a mismatch.
  const greet = useSyncExternalStore(emptySubscribe, greeting, () => "hello");
  const play = useSfx();

  return (
    <section id="hero" className="relative flex min-h-svh items-center overflow-hidden">
      <HeroScene />

      {/* Soft glow behind the content, echoing the 3D object */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4 font-mono text-sm text-accent"
        >
          $ {greet} — welcome aboard
        </motion.p>

        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl md:text-7xl">
          {profile.name.split(" ").map((word, w) => (
            <span key={word} className="mr-4 inline-block whitespace-nowrap">
              {word.split("").map((ch, i) => (
                <motion.span
                  key={`${w}-${i}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 + (w * 8 + i) * 0.03 }}
                  className="inline-block"
                >
                  {ch}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-6 max-w-xl text-lg text-muted"
        >
          Full-stack engineer — 5+ years across{" "}
          <span className="text-foreground">JavaScript</span>,{" "}
          <span className="text-foreground">DevOps</span> &{" "}
          <span className="text-foreground">data engineering</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#experience"
            onClick={() => play("whoosh")}
            className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-background transition hover:brightness-110"
          >
            View my work
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-md border border-hairline px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-accent/40 hover:text-accent"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted transition-colors hover:text-accent"
      >
        <motion.svg
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </motion.svg>
      </motion.a>
    </section>
  );
}
