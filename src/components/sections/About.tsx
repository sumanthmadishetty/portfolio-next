"use client";

import { Section, Reveal } from "@/components/ui/Section";
import { profile } from "@/data/profile";

export function About() {
  return (
    <Section id="about" eyebrow="01 · about" title="Me & Myself">
      <div className="grid gap-8 md:grid-cols-[3fr_2fr]">
        <Reveal>
          <div className="glow-card overflow-hidden">
            {/* Terminal chrome */}
            <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden />
              <span className="ml-3 font-mono text-xs text-muted">
                sumanth@portfolio ~
              </span>
            </div>
            <div className="space-y-4 p-6 font-mono text-sm leading-relaxed">
              <p className="text-accent">$ whoami</p>
              {profile.bio.map((line) => (
                <p key={line.slice(0, 24)} className="text-muted">
                  {line}
                </p>
              ))}
              <p className="text-accent">
                $ <span className="animate-blink">▊</span>
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid content-start gap-4">
          {profile.facts.map((fact, i) => (
            <Reveal key={fact.label} delay={0.1 + i * 0.08}>
              <div className="glow-card px-5 py-4">
                <p className="font-mono text-xs uppercase tracking-wider text-muted">
                  {fact.label}
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-foreground">
                  {fact.value}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
