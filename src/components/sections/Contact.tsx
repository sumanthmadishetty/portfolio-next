"use client";

import { Section, Reveal } from "@/components/ui/Section";
import { profile } from "@/data/profile";
import { track } from "@/lib/analytics";
import { useSfx } from "@/hooks/useSfx";

const SOCIALS = [
  {
    name: "GitHub",
    href: profile.socials.github,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12v3.15c0 .3.21.67.8.55C20.22 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: profile.socials.linkedin,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
      </svg>
    ),
  },
  {
    name: "StackOverflow",
    href: profile.socials.stackoverflow,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.36 20.2v-5.38h1.79V22H3v-7.18h1.8v5.38h12.56ZM6.77 14.32l.37-1.76 8.79 1.85-.37 1.76-8.79-1.85Zm1.16-4.21.74-1.64 8.14 3.78-.74 1.64-8.14-3.78Zm2.26-3.99 1.13-1.4 6.91 5.77-1.13 1.4-6.91-5.77ZM14.65 2l5.36 7.21-1.44 1.07-5.36-7.21L14.65 2ZM6.59 18.41v-1.8h8.98v1.8H6.59Z" />
      </svg>
    ),
  },
];

export function Contact() {
  const play = useSfx();

  return (
    <Section id="contact" eyebrow="06 · contact" title="Let's Connect" className="pb-12">
      <Reveal>
        <div className="glow-card mx-auto max-w-2xl p-8 text-center md:p-12">
          <p className="mx-auto max-w-md text-sm leading-relaxed text-muted">
            Whether it&apos;s for a project, freelancing, or just to say hi —
            hit me up. I usually respond within a few hours.
          </p>
          <a
            href={`mailto:${profile.email}`}
            onClick={() => {
              play("whoosh");
              track("contact_clicked");
            }}
            className="mt-8 inline-block rounded-md bg-accent px-6 py-3 font-mono text-sm font-medium text-background transition hover:brightness-110"
          >
            {profile.email}
          </a>
          <div className="mt-10 flex justify-center gap-6">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                onClick={() => track("social_clicked", { network: social.name })}
                onMouseEnter={() => play("tick")}
                className="text-muted transition-all hover:text-accent hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
