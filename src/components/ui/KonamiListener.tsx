"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useKonami } from "@/hooks/useKonami";
import { useUIStore } from "@/store/ui";
import { sfx } from "@/lib/audio";
import { track } from "@/lib/analytics";

export function KonamiListener() {
  const godMode = useUIStore((s) => s.godMode);
  const setGodMode = useUIStore((s) => s.setGodMode);
  const soundOn = useUIStore((s) => s.soundOn);
  const [toast, setToast] = useState<string | null>(null);

  const onUnlock = useCallback(() => {
    const next = !godMode;
    setGodMode(next);
    if (next) {
      if (soundOn) sfx.powerup();
      setToast("GOD MODE UNLOCKED — +30 to all stats");
      track("konami_activated");
    } else {
      setToast("god mode disabled");
    }
  }, [godMode, setGodMode, soundOn]);

  useKonami(onUnlock);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12 }}
          className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2"
          role="status"
        >
          <div className="rounded-lg border border-accent-2/50 bg-surface px-5 py-3 font-mono text-sm text-accent-2 shadow-[0_0_24px_rgba(139,92,246,0.35)]">
            {toast}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
