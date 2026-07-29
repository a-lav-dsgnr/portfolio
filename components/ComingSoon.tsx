"use client";
import { useEffect, useRef } from "react";
import styles from "./ComingSoon.module.css";

/** 8×8 Bayer matrix, normalised to 0..1 — the ordered-dither threshold map. */
const BAYER = [
  0, 32, 8, 40, 2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44, 4, 36, 14, 46, 6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
  3, 35, 11, 43, 1, 33, 9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47, 7, 39, 13, 45, 5, 37,
  63, 31, 55, 23, 61, 29, 53, 21,
].map((v) => (v + 0.5) / 64);

/** Resolve a CSS color (incl. oklch) to RGB by letting the browser paint it. */
function toRgb(color: string): [number, number, number] {
  const c = document.createElement("canvas");
  c.width = c.height = 1;
  const ctx = c.getContext("2d");
  if (!ctx) return [255, 255, 255];
  ctx.fillStyle = "#000";
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r, g, b];
}

const PIXEL = 2; // on-screen size of one dither cell, in CSS px

export default function ComingSoon() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dark = window.matchMedia("(prefers-color-scheme: dark)");

    let cols = 0;
    let rows = 0;
    let image: ImageData | null = null;
    let ink: [number, number, number] = [255, 255, 255];
    let raf = 0;
    let last = 0;
    let lastT = 0;
    let visible = true;

    const readInk = () => {
      ink = toRgb(getComputedStyle(wrap).getPropertyValue("--fg").trim() || "#fff");
    };

    const resize = () => {
      const { width, height } = wrap.getBoundingClientRect();
      if (!width || !height) return;
      cols = Math.max(1, Math.ceil(width / PIXEL));
      rows = Math.max(1, Math.ceil(height / PIXEL));
      canvas.width = cols;
      canvas.height = rows;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      image = ctx.createImageData(cols, rows);
      ctx.imageSmoothingEnabled = false;
      // Resizing clears the canvas — repaint at once so the card is never
      // blank while waiting on the next animation frame.
      draw(lastT);
    };

    // Soft drifting plasma, dithered to 1-bit against the Bayer map.
    const draw = (t: number) => {
      if (!image) return;
      lastT = t;
      const data = image.data;
      const [ir, ig, ib] = ink;
      const cx = cols / 2;
      const cy = rows / 2;
      const norm = 1 / Math.max(cx, cy);

      for (let y = 0; y < rows; y++) {
        const dy = (y - cy) * norm;
        for (let x = 0; x < cols; x++) {
          const dx = (x - cx) * norm;

          // Three drifting waves keep the texture from ever tiling visibly.
          let v =
            0.5 +
            0.18 * Math.sin(x * 0.045 + t * 0.45) +
            0.18 * Math.sin(y * 0.055 - t * 0.32) +
            0.2 * Math.sin((x + y) * 0.03 + t * 0.21);

          // Fade toward the edges so the field sits inside the card.
          const r = Math.sqrt(dx * dx + dy * dy * 1.6);
          v *= Math.max(0, 1 - r * 0.85);
          // Hollow out the centre so the label stays legible.
          v *= Math.min(1, 0.25 + r * 1.5);

          const i = (y * cols + x) * 4;
          const on = v > BAYER[(y & 7) * 8 + (x & 7)];
          data[i] = ir;
          data[i + 1] = ig;
          data[i + 2] = ib;
          data[i + 3] = on ? 255 : 0;
        }
      }
      ctx.putImageData(image, 0, 0);
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || now - last < 1000 / 30) return;
      last = now;
      draw(now / 1000);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (reduced.matches) {
        draw(0);
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    readInk();
    resize();
    start();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "100px" },
    );
    io.observe(wrap);

    const onTheme = () => {
      readInk();
      if (reduced.matches) draw(0);
    };
    dark.addEventListener("change", onTheme);
    reduced.addEventListener("change", start);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      dark.removeEventListener("change", onTheme);
      reduced.removeEventListener("change", start);
    };
  }, []);

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.content}>
        <span className={styles.label}>More is coming soon</span>
      </div>
    </div>
  );
}
