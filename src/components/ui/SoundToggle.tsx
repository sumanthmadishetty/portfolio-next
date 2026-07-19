"use client";

import { useUIStore } from "@/store/ui";
import { sfx } from "@/lib/audio";
import { track } from "@/lib/analytics";

export function SoundToggle() {
  const soundOn = useUIStore((s) => s.soundOn);
  const toggleSound = useUIStore((s) => s.toggleSound);

  const onClick = () => {
    // Play the click when turning ON so the user hears immediate feedback.
    if (!soundOn) sfx.click();
    toggleSound();
    track("sound_toggled", { on: !soundOn });
  };

  return (
    <button
      onClick={onClick}
      aria-pressed={soundOn}
      aria-label={soundOn ? "Mute sounds" : "Enable sounds"}
      title={soundOn ? "Mute sounds" : "Enable sounds"}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-hairline text-muted transition-colors hover:border-accent/40 hover:text-accent"
    >
      {soundOn ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  );
}
