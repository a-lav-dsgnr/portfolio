"use client";
import { useEffect } from "react";

// Own synthesis, tuned louder/longer than cuelume's built-in "tick" recipe
// so it stays audible on laptop speakers. Bypasses cuelume's internal
// recipe (not tunable from outside the package) but keeps the same
// data-cuelume-hover="tick" markup, so no JSX changes were needed.
let ctx: AudioContext | null = null;

function getContext() {
  if (ctx) return ctx;
  const Ctor = window.AudioContext ?? (window as any).webkitAudioContext;
  if (!Ctor) return null;
  try {
    ctx = new Ctor();
  } catch {
    return null;
  }
  return ctx;
}

function unlock() {
  const context = getContext();
  if (context && context.state !== "running") {
    context.resume().catch(() => {});
  }
}

function playTick() {
  const context = getContext();
  if (!context) return;
  const afterResume = () => {
    const now = context.currentTime;

    const master = context.createGain();
    master.gain.value = 0.45;
    master.connect(context.destination);

    // bandpass-filtered noise burst — the "click" body
    const duration = 0.05;
    const length = Math.max(1, Math.floor(duration * context.sampleRate));
    const buffer = context.createBuffer(1, length, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = 2 * Math.random() - 1;
    const noise = context.createBufferSource();
    noise.buffer = buffer;
    const filter = context.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 5400;
    filter.Q.value = 1.8;
    const noiseGain = context.createGain();
    noiseGain.gain.setValueAtTime(0.0001, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.6, now + 0.002);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
    noise.connect(filter).connect(noiseGain).connect(master);
    noise.start(now);
    noise.stop(now + duration + 0.02);

    // short sine ping on top — the "brightness"
    const osc = context.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 2600;
    const oscGain = context.createGain();
    oscGain.gain.setValueAtTime(0.0001, now);
    oscGain.gain.exponentialRampToValueAtTime(0.12, now + 0.002);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
    osc.connect(oscGain).connect(master);
    osc.start(now);
    osc.stop(now + 0.06);

    setTimeout(() => {
      master.disconnect();
    }, 120);
  };

  if (context.state === "running") {
    afterResume();
  } else {
    context.resume().then(afterResume, () => {});
  }
}

const HOVER_GAP_MS = 150;
let lastHoverTime = -Infinity;

function isMouse(event: PointerEvent) {
  return (
    event.pointerType === "mouse" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

export default function CuelumeBind() {
  useEffect(() => {
    const unlockOnce = () => unlock();
    document.addEventListener("pointerdown", unlockOnce, { capture: true, once: true });
    document.addEventListener("keydown", unlockOnce, { capture: true, once: true });
    document.addEventListener("touchstart", unlockOnce, { capture: true, once: true });

    const onHover = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      const el = event.target.closest("[data-cuelume-hover]");
      if (!el || !isMouse(event)) return;
      const relatedTarget = event.relatedTarget;
      if (relatedTarget instanceof Node && el.contains(relatedTarget)) return;
      const now = performance.now();
      if (now - lastHoverTime < HOVER_GAP_MS) return;
      lastHoverTime = now;
      playTick();
    };
    document.addEventListener("pointerenter", onHover, true);

    return () => {
      document.removeEventListener("pointerdown", unlockOnce, true);
      document.removeEventListener("keydown", unlockOnce, true);
      document.removeEventListener("touchstart", unlockOnce, true);
      document.removeEventListener("pointerenter", onHover, true);
    };
  }, []);

  return null;
}
