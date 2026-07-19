"use client";

import { Section, Reveal } from "@/components/ui/Section";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <Section id="experience" eyebrow="03 · experience" title="My Journey">
      <ol className="relative ml-3 space-y-12 border-l border-hairline pl-8">
        {experience.map((job, i) => (
          <li key={job.orgName} className="relative">
            {/* Timeline node */}
            <span
              className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_10px_rgba(34,211,238,0.7)]"
              aria-hidden
            />
            <Reveal delay={i * 0.05}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <a
                  href={job.orgWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-xl font-semibold text-foreground transition-colors hover:text-accent"
                >
                  {job.orgName}
                </a>
                <span className="text-sm text-muted">{job.designation}</span>
                <span className="ml-auto font-mono text-xs text-muted">
                  {job.start} — {job.end}
                </span>
              </div>

              {job.summary && (
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
                  {job.summary}
                </p>
              )}

              <ul className="mt-4 space-y-2">
                {job.accomplishments.map((item) => (
                  <li
                    key={item.slice(0, 32)}
                    className="flex gap-3 text-sm leading-relaxed text-muted"
                  >
                    <span className="text-accent" aria-hidden>
                      ▸
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {job.techStack && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-hairline px-3 py-1 font-mono text-xs text-muted transition-colors hover:border-accent/40 hover:text-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
