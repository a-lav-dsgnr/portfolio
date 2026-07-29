"use client";
import { useEffect } from "react";
import { play } from "cuelume";
import type { SoundName } from "cuelume";

// Sound comes from cuelume's own engine and recipe palette — this file owns
// the wiring, the level, and the unlock.
const FALLBACK: SoundName = "tick";
const HOVER_GAP_MS = 150;

// cuelume's recipes are mixed very quietly: `tick` peaks at masterGain 0.4 ×
// layer peak 0.14 ≈ 0.056 amplitude, which is inaudible on laptop speakers.
// The package exposes no gain control (only setEnabled), and it owns its
// AudioContext internally, so the one place to turn it up is the context's
// destination — we shadow the getter with a gain stage that feeds the real
// output. Everything upstream is still cuelume's synthesis, just louder.
const BOOST = 10;

let boostInstalled = false;
let amp: GainNode | null = null;
let level = BOOST;

function installBoost() {
  if (boostInstalled) return;
  const Ctor = window.AudioContext ?? (window as any).webkitAudioContext;
  if (!Ctor) return;
  const proto = Ctor.prototype;

  // `destination` sits on BaseAudioContext.prototype in current browsers but
  // on the concrete prototype in older WebKit — walk the chain for it.
  let owner: object | null = proto;
  let real: (() => AudioDestinationNode) | undefined;
  while (owner) {
    const descriptor = Object.getOwnPropertyDescriptor(owner, "destination");
    if (descriptor?.get) {
      real = descriptor.get as () => AudioDestinationNode;
      break;
    }
    owner = Object.getPrototypeOf(owner);
  }
  if (!real) return;
  boostInstalled = true;

  const amps = new WeakMap<BaseAudioContext, GainNode>();
  Object.defineProperty(proto, "destination", {
    configurable: true,
    get(this: AudioContext) {
      const output = real!.call(this);
      let node = amps.get(this);
      if (!node) {
        node = this.createGain();
        node.gain.value = level;
        node.connect(output);
        amps.set(this, node);
        amp = node;
      }
      return node;
    },
  });
}

// Safari only unlocks audio for a context created or resumed inside a real
// gesture handler; a hover doesn't count, so cuelume's lazily created context
// would stay suspended forever and nothing would ever play. Prime it on the
// first click/keypress instead — muted via our own gain stage, so the priming
// cue itself stays silent.
function prime() {
  const context = amp?.context as AudioContext | undefined;
  if (context?.state === "running") return;
  level = 0;
  if (amp) amp.gain.value = 0;
  play(FALLBACK);
  const opened = (amp?.context as AudioContext | undefined) ?? context;
  if (opened && opened.state !== "running") opened.resume().catch(() => {});
  setTimeout(() => {
    level = BOOST;
    if (amp) amp.gain.value = BOOST;
  }, 300);
}

let lastHoverTime = -Infinity;

function isMouse(event: PointerEvent) {
  return (
    event.pointerType === "mouse" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

export default function CuelumeBind() {
  useEffect(() => {
    try {
      installBoost();
    } catch {
      // Worst case the cue stays at cuelume's stock level.
    }

    // Every gesture is another chance to unlock — Safari can drop a context
    // back to "interrupted" when the tab loses focus or a call comes in.
    const gestures = ["pointerdown", "click", "keydown", "touchend"] as const;
    gestures.forEach((type) =>
      document.addEventListener(type, prime, { capture: true })
    );

    // Not cuelume's `bind()`: it listens on `pointerenter`, which is
    // dispatched per-element and unreliable through one delegated listener.
    // `pointerover` bubbles, so nothing gets missed.
    const onHover = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      const el = event.target.closest("[data-cuelume-hover]");
      if (!el || !isMouse(event)) return;
      const relatedTarget = event.relatedTarget;
      if (relatedTarget instanceof Node && el.contains(relatedTarget)) return;
      const now = performance.now();
      if (now - lastHoverTime < HOVER_GAP_MS) return;
      lastHoverTime = now;
      // The attribute picks the recipe; cuelume ignores unknown names.
      play((el.getAttribute("data-cuelume-hover") as SoundName) || FALLBACK);
    };
    document.addEventListener("pointerover", onHover, true);

    return () => {
      gestures.forEach((type) =>
        document.removeEventListener(type, prime, true)
      );
      document.removeEventListener("pointerover", onHover, true);
    };
  }, []);

  return null;
}
