"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Optional first-frame image shown before the video is ready. */
  poster?: string;
  /** Visual-only zoom, matches the previous inline transform. */
  scale?: number;
};

/* A video that doesn't touch the network until it's about to be seen.

   The original markup gave every <video> `autoPlay` with the browser's default
   preload, so opening a case study kicked off a parallel download of every clip
   at once — several megabytes competing with the images for bandwidth. Nothing
   here re-encodes or downscales the file: the same src is served untouched, so
   quality is identical. We only change WHEN it loads and whether it plays while
   off-screen.

   - `src` is withheld until the wrapper scrolls within one viewport of the
     screen (rootMargin), so clips far down the page cost nothing up front.
   - Once loaded, the clip plays only while visible and pauses when it scrolls
     away, so background tabs of video don't keep decoding. */
export default function LazyVideo({ src, alt, className, poster, scale }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Once true, the src is attached and never removed — no reload on re-entry.
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setLoad(true);

        // Play only while on screen; pause when it leaves to stop decoding.
        const video = videoRef.current;
        if (!video) return;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      // Start loading a viewport early so it's ready by the time it's in view.
      { rootMargin: "100% 0px", threshold: 0.01 }
    );

    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef}>
      <video
        ref={videoRef}
        src={load ? src : undefined}
        poster={poster}
        className={className}
        loop
        muted
        playsInline
        // Only fetch metadata/first frame; the browser streams the rest as it plays.
        preload={load ? "metadata" : "none"}
        aria-label={alt}
        style={scale ? { transform: `scale(${scale})` } : undefined}
      />
    </div>
  );
}
