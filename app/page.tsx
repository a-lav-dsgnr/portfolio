import styles from "./page.module.css";
import Link from "next/link";
import CopyEmail from "@/components/CopyEmail";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <div className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.avatar}>
          <span className={styles.avatarInitials}>AL</span>
        </div>
        <div className={styles.identity}>
          <span className={styles.name}>Anastasiia Lavrentii</span>
          <span className={styles.role}>Product Designer</span>
        </div>
        <p className={styles.bio}>
          I design digital products that feel intuitive and human. Currently
          open to new opportunities — you can reach me at{" "}
          <a href="mailto:a.lav.dsgnr@gmail.com">a.lav.dsgnr@gmail.com</a>,
          see my work on <a href="#work">selected projects</a>, or download
          my <a href="/resume.pdf">resume</a>.
        </p>
      </section>

      {/* ── WORK ── */}
      <section id="work" className={styles.section}>
        <h2 className={styles.sectionTitle}>Selected Work</h2>
        <div className={styles.projectList}>
          {projects.map((p) => (
            <Link key={p.slug} href={`/work/${p.slug}`} className={styles.projectItem}>
              <div>
                <span className={styles.projectName}>{p.name}</span>
                <span className={styles.projectRole}>{p.featureTypes.join(" · ")}</span>
              </div>
              <span className={styles.projectYear}>{p.year}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className={styles.section}>
        <h2 className={styles.sectionTitle}>About</h2>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutText}>
            <p>
              I&apos;m Anastasiia, a Product Designer based in [City].
              I care deeply about the details that make an experience feel
              right — even when users don&apos;t notice them.
            </p>
            <p>
              My process sits at the intersection of user research, systems
              thinking, and visual craft. Previously worked with [brands].
            </p>
          </div>
          <div className={styles.photoGrid}>
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className={styles.photoSlot} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className={styles.section}>
        <h2 className={styles.sectionTitle}>Contact</h2>
        <div className={styles.contactBlock}>
          <p className={styles.contactSubtitle}>
            Feel free to reach out through any of these channels.
          </p>
          <div className={styles.contactLinks}>
            <a href="mailto:a.lav.dsgnr@gmail.com" className={styles.contactLink}>
              Email
            </a>
            <a
              href="https://linkedin.com/in/your-handle"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              LinkedIn
            </a>
            <a href="/resume.pdf" className={styles.contactLink}>
              Resume
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
