"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Starfield } from "./Starfield";
import { FloatingShape } from "./FloatingShape";
import { track } from "@/lib/analytics";
import type { QualityTier } from "@/hooks/useQualityTier";

function ParallaxRig() {
  useFrame((state, delta) => {
    const camera = state.camera;
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      state.pointer.x * 0.3,
      delta * 2
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      state.pointer.y * 0.2,
      delta * 2
    );
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroCanvas({ tier }: { tier: Exclude<QualityTier, "off"> }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const tracked = useRef(false);

  // Pause the render loop entirely when the hero scrolls out of view.
  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const onFirstInteraction = () => {
    if (!tracked.current) {
      tracked.current = true;
      track("hero_3d_interacted");
    }
  };

  return (
    <div
      ref={wrapper}
      className="absolute inset-0"
      onPointerMove={onFirstInteraction}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={tier === "low" ? [1, 1.5] : [1, 2]}
        frameloop={visible ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 6, 5]} intensity={1.2} color="#8bd8ee" />
        <Starfield count={tier === "low" ? 1500 : 3500} />
        <group position={[0, 0, 0]}>
          <FloatingShape />
        </group>
        {tier === "high" && <ParallaxRig />}
      </Canvas>
    </div>
  );
}
