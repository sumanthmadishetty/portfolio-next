import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-hairline py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 text-center">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {profile.name} · Built with Next.js &
          React Three Fiber
        </p>
        <p
          className="font-mono text-[10px] tracking-widest text-muted/40"
          title="Try it…"
        >
          ↑↑↓↓←→←→BA
        </p>
      </div>
    </footer>
  );
}
