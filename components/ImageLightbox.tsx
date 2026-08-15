"use client";

import { useState } from "react";
import styles from "./ImageLightbox.module.css";
import Lightbox, { type LightboxImage } from "./Lightbox";
import StaticImage from "./StaticImage";

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
        {variants.length > 1 ? (
          /* Multiple variants (Before/After): stack them so the wrap keeps the
             image's height, and cross-fade between them when the active index
             changes instead of hard-cutting the src. */
          <div className={styles.stack}>
            {variants.map((variant, i) => (
              <StaticImage
                key={variant.src}
                src={variant.src}
                alt={i === index ? variant.alt : ""}
                /* The first layer always stays opaque as a backdrop; only the
                   layers above it fade. That keeps the composite fully opaque
                   through the whole cross-fade, so the wrap's grey background
                   never flashes through mid-transition. */
                className={`${className ?? ""} ${styles.layer} ${
                  i === 0 || i === index ? styles.layerShown : ""
                }`}
                width={variant.width}
                height={variant.height}
                sizes="(max-width: 600px) 100vw, 560px"
              />
            ))}
          </div>
        ) : (
          <StaticImage
            src={current.src}
            alt={current.alt}
            className={className}
            width={current.width}
            height={current.height}
            sizes="(max-width: 600px) 100vw, 560px"
          />
        )}
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
