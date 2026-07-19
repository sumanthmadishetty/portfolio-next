# sumanth.tech — portfolio

Personal portfolio of **Sumanth Madishetty** — a sleek, sci-fi-minimal single-page site with accent 3D and a few gaming touches.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme` config)
- **React Three Fiber v9** + **drei** — shader starfield + floating icosahedron hero
- **Motion** for UI animation · **Zustand** for tiny global state
- **Mixpanel** analytics (set `NEXT_PUBLIC_MIXPANEL_TOKEN`)

## Features

- 3D hero scene, code-split and quality-tiered (static gradient fallback for reduced-motion / no-WebGL / low-power devices)
- RPG-style **character sheet** for skills with animated stat bars
- Vertical experience timeline
- Interactive **particle playground** (attract / repel / vortex)
- WebAudio-synthesized sound effects (muted by default, toggle in navbar)
- Konami code easter egg — try `↑↑↓↓←→←→BA`

## Development

```bash
npm install
npm run dev    # dev server
npm run build  # production build
npm run lint   # eslint
```

## Editing content

All content lives in typed data files — no component changes needed:

- `src/data/profile.ts` — name, bio, socials, quick facts
- `src/data/skills.ts` — skills with categories and levels
- `src/data/experience.ts` — work history
- `src/data/projects.ts` — project cards (currently placeholders)
