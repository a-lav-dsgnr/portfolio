"use client";

import { useState } from "react";
import styles from "./BeforeAfter.module.css";
import ImageLightbox from "./ImageLightbox";

type BeforeAfterProps = {
  before: { src: string; alt: string; width?: number; height?: number };
  after: { src: string; alt: string; width?: number; height?: number };
};

export default function BeforeAfter({ before, after }: BeforeAfterProps) {
  const [view, setView] = useState<"before" | "after">("before");
  const activeIndex = view === "before" ? 0 : 1;

  return (
    <div className={styles.wrap}>
      <ImageLightbox
        images={[
          { ...before, label: "Before" },
          { ...after, label: "After" },
        ]}
        activeIndex={activeIndex}
        onSelect={(index) => setView(index === 0 ? "before" : "after")}
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
