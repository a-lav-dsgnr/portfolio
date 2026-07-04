"use client";

import { useState, useEffect } from "react";
import styles from "./ImageLightbox.module.css";

type ImageVariant = { src: string; alt: string; label?: string };

type Props = {
  src?: string;
  alt?: string;
  images?: ImageVariant[];
  activeIndex?: number;
  onSelect?: (index: number) => void;
  className?: string;
  wrapClassName?: string;
};

type Phase = "closed" | "entering" | "open" | "exiting";

export default function ImageLightbox({
  src,
  alt,
  images,
  activeIndex = 0,
  onSelect,
  className,
  wrapClassName,
}: Props) {
  const [phase, setPhase] = useState<Phase>("closed");

  const variants = images ?? (src ? [{ src, alt: alt ?? "" }] : []);
  const current = variants[activeIndex] ?? variants[0];

  const close = () => setPhase((p) => (p === "closed" ? p : "exiting"));

  useEffect(() => {
    if (phase !== "entering") return;
    const id = requestAnimationFrame(() => setPhase("open"));
    return () => cancelAnimationFrame(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== "exiting") return;
    const id = setTimeout(() => setPhase("closed"), 150);
    return () => clearTimeout(id);
  }, [phase]);

  useEffect(() => {
    if (phase === "closed") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [phase]);

  if (!current) return null;

  return (
    <>
      <div className={`${wrapClassName ?? ""} ${styles.trigger}`} onClick={() => setPhase("entering")}>
        <img src={current.src} alt={current.alt} className={className} />
      </div>

      {phase !== "closed" && (
        <div
          className={`${styles.overlay} ${phase === "open" ? styles.overlayVisible : ""} ${phase === "exiting" ? styles.overlayExiting : ""}`}
          onClick={close}
        >
          <div className={styles.content} onClick={(e) => e.stopPropagation()}>
            <img
              src={current.src}
              alt={current.alt}
              className={`${styles.fullImg} ${phase === "open" ? styles.fullImgVisible : ""} ${phase === "exiting" ? styles.fullImgExiting : ""}`}
            />
            {variants.length > 1 && (
              <div className={styles.toggle} role="tablist" aria-label="Image variants">
                {variants.map((variant, index) => (
                  <button
                    key={variant.label ?? index}
                    type="button"
                    role="tab"
                    aria-selected={index === activeIndex}
                    className={`${styles.toggleBtn} ${index === activeIndex ? styles.toggleBtnActive : ""}`}
                    onClick={() => onSelect?.(index)}
                  >
                    {variant.label ?? index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
