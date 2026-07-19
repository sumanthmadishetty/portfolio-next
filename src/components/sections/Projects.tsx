"use client";

import { Section, Reveal } from "@/components/ui/Section";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <Section id="projects" eyebrow="04 · projects" title="Selected Work">
      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.1}>
            <article className="glow-card group relative flex h-full flex-col p-6">
              {project.placeholder && (
                <span className="absolute right-4 top-4 rounded-full border border-accent-2/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-2">
                  coming soon
                </span>
              )}
              <div
                className="mb-5 h-10 w-10 rounded-lg border border-hairline bg-surface-2 font-mono text-lg leading-10 text-center text-accent"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">
                {project.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {project.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-hairline px-2.5 py-0.5 font-mono text-[11px] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
