"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useUIStore } from "@/store/ui";

/** Wireframe-over-solid icosahedron that tilts toward the pointer. */
export function FloatingShape() {
  const group = useRef<THREE.Group>(null);
  const wireMat = useRef<THREE.MeshBasicMaterial>(null);
  const godMode = useUIStore((s) => s.godMode);
  const hue = useRef(0.52); // cyan

  useFrame((state, delta) => {
    if (!group.current) return;
    const { pointer } = state;
    // Lerp toward pointer-driven tilt for a weighty feel.
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      pointer.y * 0.35,
      delta * 2
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointer.x * 0.5,
      delta * 2
    );
    // Constant slow spin on top of pointer tilt; god mode spins it up.
    group.current.rotation.z += delta * (godMode ? 0.8 : 0.08);

    if (wireMat.current) {
      if (godMode) {
        hue.current = (hue.current + delta * 0.25) % 1;
        wireMat.current.color.setHSL(hue.current, 0.9, 0.65);
      } else {
        hue.current = THREE.MathUtils.lerp(hue.current, 0.52, delta * 2);
        wireMat.current.color.setHSL(0.52, 0.85, 0.62);
      }
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <group ref={group}>
        <mesh>
          <icosahedronGeometry args={[1.35, 0]} />
          <meshStandardMaterial
            color="#0b1020"
            roughness={0.3}
            metalness={0.7}
            flatShading
          />
        </mesh>
        <mesh scale={1.002}>
          <icosahedronGeometry args={[1.35, 0]} />
          <meshBasicMaterial ref={wireMat} wireframe color="#22d3ee" />
        </mesh>
      </group>
    </Float>
  );
}
