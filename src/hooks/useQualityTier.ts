"use client";

import { useSyncExternalStore } from "react";

export type QualityTier = "off" | "low" | "high";

const emptySubscribe = () => () => {};

let cached: QualityTier | null = null;

function computeTier(): QualityTier {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "off";
  }
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return "off";
  } catch {
    return "off";
  }
  const lowPower =
    window.innerWidth < 768 || (navigator.hardwareConcurrency ?? 8) <= 4;
  return lowPower ? "low" : "high";
}

function getSnapshot(): QualityTier {
  cached ??= computeTier();
  return cached;
}

/**
 * How much GPU work the visitor's device should get:
 * - "off": prefers-reduced-motion or no WebGL → static fallback
 * - "low": small viewport or few cores → fewer particles, capped DPR
 * - "high": everything on
 * Returns null during SSR/hydration.
 */
export function useQualityTier(): QualityTier | null {
  return useSyncExternalStore(emptySubscribe, getSnapshot, () => null);
}
