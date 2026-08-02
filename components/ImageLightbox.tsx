"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./ImageLightbox.module.css";
import Lightbox, { type LightboxImage } from "./Lightbox";

type Props = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  images?: LightboxImage[];
  activeIndex?: number;
  onSelect?: (index: number) => void;
  className?: string;
  wrapClassName?: string;
};

export default function ImageLightbox({
  src,
  alt,
  width,
  height,
  images,
  activeIndex = 0,
  onSelect,
  className,
  wrapClassName,
}: Props) {
  const [open, setOpen] = useState(false);
  /* Used only when the caller doesn't own the index (no onSelect), so there is
     never more than one source of truth for which image is showing. */
  const [ownIndex, setOwnIndex] = useState(activeIndex);

  const variants =
    images ?? (src ? [{ src, alt: alt ?? "", width, height }] : []);
  const index = onSelect ? activeIndex : ownIndex;
  const current = variants[index] ?? variants[0];

  if (!current) return null;

  return (
    <>
      <div className={`${wrapClassName ?? ""} ${styles.trigger}`} onClick={() => setOpen(true)}>
        <Image
          src={current.src.split("?")[0]}
          alt={current.alt}
          className={className}
          width={current.width ?? 0}
          height={current.height ?? 0}
          sizes="(max-width: 600px) 100vw, 560px"
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      {open && (
        <Lightbox
          images={variants}
          index={index}
          onSelect={onSelect ?? setOwnIndex}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
