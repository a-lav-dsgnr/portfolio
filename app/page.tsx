import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import CopyEmail from "@/components/CopyEmail";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <div className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroTop}>
          <div className={styles.avatar}>
            <Image
              src="/avatar1.jpeg"
              alt="Anastasiia Lavrentii"
              fill
              className={styles.photoImg}
              sizes="52px"
            />
          </div>
          <div className={styles.identity}>
            <span className={styles.name}>Anastasiia Lavrentii</span>
            <span className={styles.role}>Product Designer</span>
          </div>
        </div>
        <p className={styles.bio}>
          I design digital products that feel intuitive and human. Currently
          open to new opportunities.
        </p>
        <p className={styles.bio}>
          Feel free to reach me out through any of these channels.
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
              I&apos;m a designer and a person who gets caught up in the
              details — the small interactions most people never notice, but
              always feel. I believe it&apos;s exactly those small parts that
              create something whole — something that stays with you and makes
              you come back.
            </p>
            <p>
              My process sits at the intersection of user research, systems
              thinking, and visual craft. Lately I&apos;ve been genuinely
              excited about AI in design — exploring it, working with it, and
              sharing what I find through workshops.
            </p>
            <p>
              Outside of work, I draw to clear my head, swim to reset, and
              read to switch off. These small rituals keep me sharp — and I
              think that&apos;s what makes me someone who gets switched on
              fast, whether it&apos;s a good problem or a conversation worth
              having.
            </p>
          </div>
          <div className={styles.photoGrid}>
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className={styles.photoSlot}>
                <Image
                  src={`/photo-${n}.jpg`}
                  alt=""
                  fill
                  className={styles.photoImg}
                  sizes="(max-width: 600px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
