"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useUIStore } from "@/store/ui";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uWarp;
  attribute float aSeed;
  varying float vTwinkle;
  varying float vSeed;

  void main() {
    vec3 pos = position;
    // Slow drift toward the camera; warp multiplies the speed massively.
    float speed = mix(0.4, 14.0, uWarp);
    pos.z = mod(pos.z + uTime * speed, 40.0) - 20.0;
    vTwinkle = 0.6 + 0.4 * sin(uTime * (1.5 + aSeed * 3.0) + aSeed * 40.0);
    vSeed = aSeed;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (1.8 + aSeed * 2.2) * (14.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uWarp;
  varying float vTwinkle;
  varying float vSeed;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float alpha = smoothstep(0.5, 0.05, d) * vTwinkle;
    // Base: cool white-cyan. Warp: shift toward violet.
    vec3 base = mix(vec3(0.75, 0.88, 1.0), vec3(0.55, 0.95, 1.0), vSeed);
    vec3 warped = mix(base, vec3(0.72, 0.5, 1.0), uWarp);
    gl_FragColor = vec4(warped, alpha * 0.9);
  }
`;

export function Starfield({ count = 3500 }: { count?: number }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const godMode = useUIStore((s) => s.godMode);

  const { positions, seeds } = useMemo(() => {
    // Deterministic seeded PRNG (mulberry32) keeps this render-pure.
    let s = 0x9e3779b9;
    const rand = () => {
      s |= 0;
      s = (s + 0x6d2b79f5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * 50;
      positions[i * 3 + 1] = (rand() - 0.5) * 30;
      positions[i * 3 + 2] = (rand() - 0.5) * 40;
      seeds[i] = rand();
    }
    return { positions, seeds };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWarp: { value: 0 },
    }),
    []
  );

  useFrame((_, delta) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value += delta;
    // Ease warp in/out instead of snapping.
    const target = godMode ? 1 : 0;
    const w = material.current.uniforms.uWarp;
    w.value = THREE.MathUtils.lerp(w.value, target, delta * 2.5);
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
