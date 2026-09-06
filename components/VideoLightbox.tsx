"use client";

import { useState } from "react";
import styles from "./ImageLightbox.module.css";
import Lightbox from "./Lightbox";
import LazyVideo from "./LazyVideo";

type Props = {
  src: string;
  alt: string;
  poster?: string;
  scale?: number;
  className?: string;
  wrapClassName?: string;
};

/* The video counterpart of ImageLightbox: the inline clip stays the muted,
   controls-less LazyVideo used everywhere else, but clicking it opens the shared
   Lightbox overlay with a full-size <video controls> — the same "open it to
   look properly" affordance photos already have. */
export default function VideoLightbox({
  src,
  alt,
  poster,
  scale,
  className,
  wrapClassName,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`${wrapClassName ?? ""} ${styles.trigger}`}
        onClick={() => setOpen(true)}
      >
        <LazyVideo src={src} alt={alt} className={className} poster={poster} scale={scale} />
      </div>

      {open && (
        <Lightbox
          images={[{ src, alt, kind: "video", poster }]}
          index={0}
          onSelect={() => {}}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
