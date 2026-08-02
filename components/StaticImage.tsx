"use client";

import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes: string;
  className?: string;
};

/* One next/image wrapper for every project image.

   When we know the file's intrinsic size we hand it to next/image so it
   reserves an aspect-ratio box before the file loads (no layout shift).

   When we DON'T (imageSize couldn't read/parse the file), we fall back to a
   plain <img> instead of passing width/height of 0 — a 0×0 box has an invalid
   aspect ratio, reserves no space, and reintroduces the very jump we're trying
   to remove.

   next/image is passed the src with its `?v=N` query stripped: Next rejects a
   query on a local src unless images.localPatterns is configured, and the
   optimizer keys on the path anyway. The plain-<img> fallback keeps the query
   so a version bump still busts the browser cache for that image. */
export default function StaticImage({ src, alt, width, height, sizes, className }: Props) {
  const style = { width: "100%", height: "auto" } as const;

  if (!width || !height) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} style={style} />;
  }

  return (
    <Image
      src={src.split("?")[0]}
      alt={alt}
      className={className}
      width={width}
      height={height}
      sizes={sizes}
      style={style}
    />
  );
}
