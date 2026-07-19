"use client";

import { useEffect } from "react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useKonami(onUnlock: () => void) {
  useEffect(() => {
    let buffer: string[] = [];
    const onKeyDown = (e: KeyboardEvent) => {
      buffer.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);
      buffer = buffer.slice(-KONAMI.length);
      if (KONAMI.every((k, i) => buffer[i] === k)) {
        buffer = [];
        onUnlock();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onUnlock]);
}
