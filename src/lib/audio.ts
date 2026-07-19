"use client";

// Tiny WebAudio synth — no audio files. Each SFX is built from oscillators
// and gain envelopes so the whole sound layer costs zero bytes of assets.

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(
  freq: number,
  duration: number,
  {
    type = "sine" as OscillatorType,
    volume = 0.08,
    delay = 0,
    slideTo,
  }: {
    type?: OscillatorType;
    volume?: number;
    delay?: number;
    slideTo?: number;
  } = {}
) {
  const ac = getCtx();
  if (!ac) return;
  const t0 = ac.currentTime + delay;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + duration);
  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(volume, t0 + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(gain).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

export const sfx = {
  /** Soft high blip — hovers and small interactions */
  tick() {
    tone(880, 0.06, { type: "sine", volume: 0.04 });
  },
  /** Click / toggle */
  click() {
    tone(520, 0.08, { type: "triangle", volume: 0.06, slideTo: 660 });
  },
  /** Section CTA whoosh */
  whoosh() {
    tone(220, 0.25, { type: "sine", volume: 0.05, slideTo: 440 });
  },
  /** Konami power-up: rising arpeggio */
  powerup() {
    const notes = [261.6, 329.6, 392, 523.3, 659.3, 784];
    notes.forEach((f, i) =>
      tone(f, 0.12, { type: "square", volume: 0.05, delay: i * 0.07 })
    );
  },
};
