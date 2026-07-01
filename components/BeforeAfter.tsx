"use client";

import { useState } from "react";
import styles from "./BeforeAfter.module.css";
import ImageLightbox from "./ImageLightbox";

type BeforeAfterProps = {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
};

export default function BeforeAfter({ before, after }: BeforeAfterProps) {
  const [view, setView] = useState<"before" | "after">("before");
  const active = view === "before" ? before : after;

  return (
    <div className={styles.wrap}>
      <ImageLightbox
        src={active.src}
        alt={active.alt}
        className={styles.image}
        wrapClassName={styles.imageWrap}
      />
      <div className={styles.toggle} role="tablist" aria-label="Before and after comparison">
        <button
          type="button"
          role="tab"
          aria-selected={view === "before"}
          className={`${styles.toggleBtn} ${view === "before" ? styles.toggleBtnActive : ""}`}
          onClick={() => setView("before")}
        >
          Before
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={view === "after"}
          className={`${styles.toggleBtn} ${view === "after" ? styles.toggleBtnActive : ""}`}
          onClick={() => setView("after")}
        >
          After
        </button>
      </div>
    </div>
  );
}
