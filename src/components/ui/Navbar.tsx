"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useSfx } from "@/hooks/useSfx";
import { SoundToggle } from "@/components/ui/SoundToggle";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "playground", label: "Playground" },
  { id: "contact", label: "Contact" },
];

const SECTION_IDS = ["hero", ...NAV_ITEMS.map((i) => i.id)];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollSpy(SECTION_IDS);
  const play = useSfx();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-hairline bg-background/70 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <a
          href="#hero"
          className="font-mono text-sm font-semibold tracking-tight text-foreground"
          aria-label="Back to top"
        >
          sm<span className="text-accent">.</span>
        </a>

        <div className="flex items-center gap-1 md:gap-2">
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.id} className="relative">
                <a
                  href={`#${item.id}`}
                  onMouseEnter={() => play("tick")}
                  className={`relative rounded-md px-3 py-1.5 text-sm transition-colors ${
                    active === item.id
                      ? "text-accent"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-accent"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
          <SoundToggle />
        </div>
      </nav>
    </header>
  );
}
