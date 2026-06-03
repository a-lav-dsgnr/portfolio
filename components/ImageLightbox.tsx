"use client";

import { useState, useEffect } from "react";
import styles from "./ImageLightbox.module.css";

type Props = {
  src: string;
  alt: string;
  className?: string;
  wrapClassName?: string;
};

export default function ImageLightbox({ src, alt, className, wrapClassName }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className={`${wrapClassName ?? ""} ${styles.trigger}`} onClick={() => setOpen(true)}>
        <img src={src} alt={alt} className={className} />
      </div>

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)}>
          <img src={src} alt={alt} className={styles.fullImg} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}
