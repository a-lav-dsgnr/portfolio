import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About — Anastasiia Lavrentii",
};

export default function About() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>About</h1>
      </header>

      <div className={styles.content}>
        <div className={styles.bio}>
          <p>
            I&apos;m Anastasiia, a Product Designer based in [City]. I design
            digital products that feel intuitive and human — from early concept
            to polished interface.
          </p>
          <p>
            My work sits at the intersection of user research, systems thinking,
            and visual craft. I care deeply about the details that make an
            experience feel right, even when users don&apos;t notice them.
          </p>
          <p>
            Currently [open to work / working at Company]. Previously worked
            with [brands/clients].
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Experience</h2>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.listName}>Company Name</span>
                <span className={styles.listMeta}>Product Designer · 2023–Present</span>
              </li>
              <li className={styles.listItem}>
                <span className={styles.listName}>Company Name</span>
                <span className={styles.listMeta}>UX Designer · 2021–2023</span>
              </li>
              <li className={styles.listItem}>
                <span className={styles.listName}>Company Name</span>
                <span className={styles.listMeta}>Junior Designer · 2020–2021</span>
              </li>
            </ul>
          </div>

          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Skills</h2>
            <ul className={styles.list}>
              {[
                "Product Design",
                "UX Research",
                "Design Systems",
                "Prototyping",
                "Figma",
                "User Testing",
              ].map((skill) => (
                <li key={skill} className={styles.skillItem}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
