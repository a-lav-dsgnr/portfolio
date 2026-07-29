import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact — Anastasiia Lavrentii",
};

const links = [
  {
    label: "Email",
    href: "mailto:lav.dsgnr@gmail.com",
    display: "lav.dsgnr@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anastasiia-lavrentii-207937238/",
    display: "linkedin.com/in/anastasiia-lavrentii-207937238",
  },
  {
    label: "Resume",
    href: "/resume.pdf",
    display: "Download PDF",
  },
];

export default function Contact() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Contact</h1>
        <p className={styles.subtitle}>
          Open to new opportunities and collaborations. Say hello.
        </p>
      </header>

      <div className={styles.linkList}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={styles.linkItem}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={
              link.href.startsWith("http") ? "noopener noreferrer" : undefined
            }
          >
            <span className={styles.linkLabel}>{link.label}</span>
            <span className={styles.linkDisplay}>{link.display}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
