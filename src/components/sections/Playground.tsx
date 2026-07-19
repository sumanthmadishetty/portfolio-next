"use client";

import { useEffect, useRef, useState } from "react";
import { Section, Reveal } from "@/components/ui/Section";
import { track } from "@/lib/analytics";
import { useSfx } from "@/hooks/useSfx";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Mode = "attract" | "repel" | "vortex";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hue: number;
}

const MODES: { id: Mode; label: string }[] = [
  { id: "attract", label: "Attract" },
  { id: "repel", label: "Repel" },
  { id: "vortex", label: "Vortex" },
];

export function Playground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<Mode>("attract");
  const modeRef = useRef<Mode>("attract");
  const [active, setActive] = useState(false);
  const reducedMotion = useReducedMotion();
  const tracked = useRef(false);
  const play = useSfx();

  // Only run the simulation while the section is on screen.
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    if (!active || reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = window.innerWidth < 768 ? 350 : 800;
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      hue: 185 + Math.random() * 80, // cyan → violet range
    }));

    const pointer = { x: -9999, y: -9999, down: false };

    const toCanvas = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: (clientX - rect.left) * dpr,
        y: (clientY - rect.top) * dpr,
      };
    };

    const onPointerMove = (e: PointerEvent) => {
      const p = toCanvas(e.clientX, e.clientY);
      pointer.x = p.x;
      pointer.y = p.y;
      if (!tracked.current) {
        tracked.current = true;
        track("playground_used");
      }
    };
    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onPointerDown = (e: PointerEvent) => {
      const p = toCanvas(e.clientX, e.clientY);
      // Burst: shove nearby particles outward.
      for (const pt of particles) {
        const dx = pt.x - p.x;
        const dy = pt.y - p.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < 220 * dpr) {
          const force = (220 * dpr - d) / (220 * dpr);
          pt.vx += (dx / d) * force * 14;
          pt.vy += (dy / d) * force * 14;
        }
      }
      play("click");
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("pointerdown", onPointerDown);

    let raf = 0;
    const step = () => {
      ctx.fillStyle = "rgba(5, 8, 16, 0.28)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const m = modeRef.current;
      for (const pt of particles) {
        const dx = pointer.x - pt.x;
        const dy = pointer.y - pt.y;
        const d = Math.hypot(dx, dy);
        const radius = 260 * dpr;

        if (d < radius && d > 1) {
          const force = ((radius - d) / radius) * 0.6;
          if (m === "attract") {
            pt.vx += (dx / d) * force;
            pt.vy += (dy / d) * force;
          } else if (m === "repel") {
            pt.vx -= (dx / d) * force;
            pt.vy -= (dy / d) * force;
          } else {
            // vortex: perpendicular swirl + slight pull
            pt.vx += (-dy / d) * force * 1.4 + (dx / d) * force * 0.15;
            pt.vy += (dx / d) * force * 1.4 + (dy / d) * force * 0.15;
          }
        }

        pt.vx *= 0.96;
        pt.vy *= 0.96;
        pt.x += pt.vx;
        pt.y += pt.vy;

        // Wrap around edges
        if (pt.x < 0) pt.x += canvas.width;
        if (pt.x > canvas.width) pt.x -= canvas.width;
        if (pt.y < 0) pt.y += canvas.height;
        if (pt.y > canvas.height) pt.y -= canvas.height;

        const speed = Math.hypot(pt.vx, pt.vy);
        const alpha = Math.min(0.9, 0.35 + speed * 0.12);
        ctx.fillStyle = `hsla(${pt.hue}, 90%, 65%, ${alpha})`;
        ctx.fillRect(pt.x, pt.y, 1.6 * dpr, 1.6 * dpr);
      }

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("pointerdown", onPointerDown);
    };
  }, [active, reducedMotion, play]);

  return (
    <Section id="playground" eyebrow="05 · playground" title="Particle Playground">
      <Reveal>
        {reducedMotion ? (
          <div className="glow-card hero-fallback flex h-64 items-center justify-center p-8 text-center">
            <p className="max-w-sm text-sm text-muted">
              This little particle toy respects your reduced-motion preference
              and stays still. It&apos;s best experienced with motion enabled.
            </p>
          </div>
        ) : (
          <div className="glow-card overflow-hidden">
            <canvas
              ref={canvasRef}
              className="h-[420px] w-full cursor-crosshair touch-none"
              aria-label="Interactive particle playground — move your pointer to play"
            />
            <div className="flex flex-wrap items-center gap-2 border-t border-hairline px-4 py-3">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setMode(m.id);
                    play("click");
                    track("playground_used", { mode: m.id });
                  }}
                  className={`rounded-md px-3 py-1.5 font-mono text-xs transition-colors ${
                    mode === m.id
                      ? "bg-accent text-background"
                      : "border border-hairline text-muted hover:border-accent/40 hover:text-accent"
                  }`}
                >
                  {m.label}
                </button>
              ))}
              <span className="ml-auto hidden font-mono text-[11px] text-muted/60 md:inline">
                move to steer · click to burst
              </span>
            </div>
          </div>
        )}
      </Reveal>
    </Section>
  );
}
