"use client";

import dynamic from "next/dynamic";
import { useQualityTier } from "@/hooks/useQualityTier";

// Everything three.js lives in this async chunk — the page shell never pays for it.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

/**
 * Decides between the real 3D scene and the static gradient fallback.
 * The `.hero-fallback` gradient is always painted underneath, so there is
 * no flash while the 3D chunk loads.
 */
export function HeroScene() {
  const tier = useQualityTier();

  return (
    <div className="hero-fallback absolute inset-0" aria-hidden>
      {tier !== null && tier !== "off" && <HeroCanvas tier={tier} />}
    </div>
  );
}
