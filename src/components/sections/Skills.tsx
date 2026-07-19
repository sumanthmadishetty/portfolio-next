"use client";

import { motion } from "motion/react";
import { Section, Reveal } from "@/components/ui/Section";
import {
  skills,
  categoryLabels,
  characterClass,
  characterXP,
  type SkillCategory,
} from "@/data/skills";
import { profile } from "@/data/profile";
import { useUIStore } from "@/store/ui";
import { useSfx } from "@/hooks/useSfx";

const CATEGORY_ORDER: SkillCategory[] = [
  "languages",
  "frontend",
  "backend",
  "data",
  "cloud",
];

function StatBar({
  name,
  level,
  delay,
}: {
  name: string;
  level: number;
  delay: number;
}) {
  const godMode = useUIStore((s) => s.godMode);
  const play = useSfx();
  const effective = godMode ? 10 : level;

  return (
    <div
      className="group flex items-center gap-3"
      onMouseEnter={() => play("tick")}
    >
      <span className="w-28 shrink-0 truncate text-sm text-muted transition-colors group-hover:text-foreground md:w-32">
        {name}
      </span>
      <div className="flex flex-1 gap-1" role="img" aria-label={`${name}: level ${effective} of 10`}>
        {Array.from({ length: 10 }, (_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scaleY: 0.3 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.25, delay: delay + i * 0.03 }}
            className={`h-3 flex-1 rounded-[2px] ${
              i < effective
                ? godMode
                  ? "bg-accent-2 shadow-[0_0_6px_rgba(139,92,246,0.6)]"
                  : "bg-accent/80"
                : "bg-surface-2"
            }`}
          />
        ))}
      </div>
      <span className="w-14 shrink-0 text-right font-mono text-xs text-accent">
        {godMode ? "MAX" : `LV ${effective}`}
      </span>
    </div>
  );
}

export function Skills() {
  const godMode = useUIStore((s) => s.godMode);

  return (
    <Section id="skills" eyebrow="02 · skills" title="Character Sheet">
      <Reveal>
        <div className="glow-card overflow-hidden">
          {/* Sheet header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-6 py-4 font-mono text-xs uppercase tracking-wider">
            <span className="text-muted">
              CHARACTER —{" "}
              <span className="text-foreground">{profile.name}</span>
            </span>
            <span className="text-muted">
              CLASS: <span className="text-accent">{characterClass}</span>
            </span>
            <span className="text-muted">
              XP:{" "}
              <span className="text-accent">
                {godMode ? "∞ (GOD MODE)" : characterXP}
              </span>
            </span>
          </div>

          <div className="grid gap-x-12 gap-y-10 p-6 md:grid-cols-2 md:p-8">
            {CATEGORY_ORDER.map((category, c) => (
              <div key={category}>
                <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-accent-2">
                  ▸ {categoryLabels[category]}
                </h3>
                <div className="space-y-3">
                  {skills
                    .filter((s) => s.category === category)
                    .map((skill, i) => (
                      <StatBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        delay={c * 0.05 + i * 0.04}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
