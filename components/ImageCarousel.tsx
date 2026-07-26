"use client";

import { useState } from "react";
import styles from "./ImageCarousel.module.css";
import Lightbox from "./Lightbox";

type CarouselImage = { src: string; alt: string };

export default function ImageCarousel({ images }: { images: CarouselImage[] }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.row}>
      {images.map((image, index) => {
        const isActive = index === active;
        /* The expanded slide opens the lightbox; the strips only expand. */
        const activate = () => (isActive ? setOpen(true) : setActive(index));

        return (
          <div
            key={image.src}
            className={`${styles.slide} ${isActive ? styles.slideActive : ""}`}
            role="button"
            tabIndex={0}
            aria-label={isActive ? `Open ${image.alt}` : `Show ${image.alt}`}
            onClick={activate}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                activate();
              }
            }}
          >
            <div className={styles.imageWrap}>
              <img src={image.src} alt={image.alt} className={styles.image} />
            </div>
          </div>
        );
      })}

      {/* Mounted here rather than inside the active slide, so stepping through
          images with the arrows doesn't unmount the lightbox. */}
      {open && (
        <Lightbox
          images={images}
          index={active}
          onSelect={setActive}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
