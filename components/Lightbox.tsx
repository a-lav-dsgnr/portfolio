"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./Lightbox.module.css";

export type LightboxImage = {
  src: string;
  alt: string;
  label?: string;
  width?: number;
  height?: number;
  /* "video" swaps the <img> for a <video> with controls. Defaults to image. */
  kind?: "image" | "video";
  /* First-frame image shown for a video before it can play. */
  poster?: string;
};

type Props = {
  images: LightboxImage[];
  index: number;
  onSelect: (index: number) => void;
  /* Called once the exit transition has finished — the parent unmounts us then. */
  onClose: () => void;
};

type Phase = "entering" | "open" | "exiting";

export default function Lightbox({ images, index, onSelect, onClose }: Props) {
  const [phase, setPhase] = useState<Phase>("entering");
  /* Kept in a ref so an inline onClose from the parent can't restart the exit
     timer on every render. */
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const current = images[index] ?? images[0];
  const hasMany = images.length > 1;

  const close = () => setPhase((p) => (p === "exiting" ? p : "exiting"));
  const go = (next: number) => onSelect((next + images.length) % images.length);

  useEffect(() => {
    if (phase !== "entering") return;
    const id = requestAnimationFrame(() => setPhase("open"));
    return () => cancelAnimationFrame(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== "exiting") return;
    const id = setTimeout(() => onCloseRef.current(), 150);
    return () => clearTimeout(id);
  }, [phase]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (!hasMany) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(index - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(index + 1);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, hasMany, images.length, onSelect]);

  if (!current) return null;

  return (
    <div
      className={`${styles.overlay} ${phase === "open" ? styles.overlayVisible : ""} ${phase === "exiting" ? styles.overlayExiting : ""}`}
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label={current.alt || "Image viewer"}
    >
      <button
        type="button"
        className={`${styles.iconBtn} ${styles.closeBtn}`}
        aria-label="Close image"
        onClick={(e) => {
          e.stopPropagation();
          close();
        }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {hasMany && (
        <>
          <button
            type="button"
            className={`${styles.iconBtn} ${styles.prevBtn}`}
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              go(index - 1);
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            className={`${styles.iconBtn} ${styles.nextBtn}`}
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              go(index + 1);
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {current.kind === "video" ? (
          <video
            key={current.src}
            src={current.src}
            poster={current.poster}
            className={`${styles.fullImg} ${phase === "open" ? styles.fullImgVisible : ""} ${phase === "exiting" ? styles.fullImgExiting : ""}`}
            controls
            autoPlay
            loop
            /* Muted so autoPlay is never blocked — these clips are silent UI
               recordings; the user can unmute from the controls. */
            muted
            playsInline
            aria-label={current.alt}
          />
        ) : (
          <img
            src={current.src}
            alt={current.alt}
            className={`${styles.fullImg} ${phase === "open" ? styles.fullImgVisible : ""} ${phase === "exiting" ? styles.fullImgExiting : ""}`}
          />
        )}
      </div>
    </div>
  );
}
