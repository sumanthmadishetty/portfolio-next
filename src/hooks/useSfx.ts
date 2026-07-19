"use client";

import { useCallback } from "react";
import { useUIStore } from "@/store/ui";
import { sfx } from "@/lib/audio";

/** Sound-gated SFX: no-ops unless the user has enabled sound. */
export function useSfx() {
  const soundOn = useUIStore((s) => s.soundOn);

  const play = useCallback(
    (name: keyof typeof sfx) => {
      if (soundOn) sfx[name]();
    },
    [soundOn]
  );

  return play;
}
