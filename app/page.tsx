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
              src="/avatar1.jpg"
              alt="Anastasiia Lavrentii"
              fill
              className={styles.photoImg}
              sizes="80px"
            />
          </div>
          <div className={styles.identity}>
            <span className={styles.name}>Anastasiia Lavrentii</span>
            <span className={styles.role}>Product Designer</span>
          </div>
        </div>
        <p className={styles.bio}>
          5+ years across fintech, SaaS, real estate, and food tech, building
          products that pair strong user experience with clear business
          outcomes. I work end to end, from research to production-ready UI,
          and lately I&apos;ve been weaving AI into my process to prototype
          faster and tighten the loop between design and engineering.
        </p>
        <p className={styles.bio}>
          Always up for a good conversation — drop me an{" "}
          <a href="mailto:a.lav.dsgnr@gmail.com" className={styles.inlineLink}>
            <span>email</span>
            <span className={styles.linkArrow} aria-hidden="true">↗</span>
          </a>
          , take a look at my{" "}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.inlineLink}
          >
            <span>resume</span>
            <span className={styles.linkArrow} aria-hidden="true">↗</span>
          </a>
          , or find me on{" "}
          <a
            href="https://www.linkedin.com/in/anastasiia-lavrentii-207937238/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.inlineLink}
          >
            <span>linkedIn</span>
            <span className={styles.linkArrow} aria-hidden="true">↗</span>
          </a>
          .
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
