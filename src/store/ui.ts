"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  soundOn: boolean;
  toggleSound: () => void;
  godMode: boolean;
  setGodMode: (on: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      soundOn: false,
      toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),
      godMode: false,
      setGodMode: (on) => set({ godMode: on }),
    }),
    {
      name: "portfolio-ui",
      partialize: (s) => ({ soundOn: s.soundOn }),
    }
  )
);
