import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Resume — Anastasiia Lavrentii",
  description:
    "Senior Product Designer with 5+ years across fintech, SaaS, real estate, and food tech.",
};

const contacts = [
  {
    label: "linkedin.com/in/anastasiia-lavrentii",
    href: "https://www.linkedin.com/in/anastasiia-lavrentii-207937238/",
  },
  { label: "lav.dsgnr@gmail.com", href: "mailto:lav.dsgnr@gmail.com" },
];

type Role = {
  title: string;
  company: string;
  dates: string;
  bullets: string[];
};

const experience: Role[] = [
  {
    title: "Senior Product Designer",
    company: "Lendflow",
    dates: "Jun 2024 – Present",
    bullets: [
      "Designed product experiences for an embedded credit infrastructure connecting and automating lending for brands and lenders, across web for three distinct user roles",
      "Built a unified deal tracking system spanning deal analysis and communications, replacing scattered, disconnected views used by operational teams, capital partners, and borrowers",
      "Designed the interface for AI agent workflows, moving repetitive manual steps inside the product and reducing the need to switch between tools for funding advisors and underwriters",
      "Scaled a design system adopted across product teams, and integrated AI into the design process to validate ideas before engineering involvement",
    ],
  },
  {
    title: "Senior Product Designer",
    company: "Glow Design Agency",
    dates: "Mar 2023 – Jun 2024",
    bullets: [
      "Designed onboarding and activation flows for a proptech product, replacing a multi-step signup with a single guided flow across web and mobile",
      "Redesigned the search and booking flow end to end, removing redundant steps between finding a listing and confirming a booking",
      "Built enterprise admin tools giving internal teams a single interface for processes previously handled through manual, disconnected steps",
      "Conducted interviews and usability testing to validate design decisions before development",
      "Used AI tools to build prototypes and test solutions before committing engineering time",
    ],
  },
  {
    title: "UX/UI Designer",
    company: "AppCake",
    dates: "Jun 2022 – Feb 2023",
    bullets: [
      "Built cross-platform mobile applications for iOS, Android, and Unity, and redesigned apps across utilities, game guides, and health categories",
      "Created App Store and Google Play assets, including feature banners, app screenshots, subscription onboarding screens, and application icons",
      "Contributed to a 7.5% improvement in user engagement",
    ],
  },
  {
    title: "UX/UI Designer",
    company: "Adept",
    dates: "Oct 2021 – Jun 2022",
    bullets: [
      "Shipped B2B and B2C foodtech products, managing end-to-end UX from discovery to launch",
      "Redesigned a web-based coffee ordering app and developed internal admin tools, reducing order handling time by 12% and increasing operational visibility",
      "Built inventory-aware ordering and marketplace integrations that reduced product waste by 8%",
      "Contributed to the creation and scaling of a shared design system, improving cross-product consistency",
    ],
  },
  {
    title: "UX/UI Designer",
    company: "ULTIMA",
    dates: "Mar 2021 – Oct 2021",
    bullets: [
      "Developed marketing creatives for social networks that increased sales conversions",
    ],
  },
];

const abilities = [
  "Wireframing & Prototyping",
  "Usability Testing",
  "Design Systems",
  "Product Strategy",
  "User Research",
  "Analytics",
  "Information Architecture",
  "A/B Testing",
  "Mobile Design",
  "Cross-Functional Collaboration",
];

const tools = [
  "Figma",
  "Cursor",
  "FigJam",
  "Miro",
  "Github",
  "FullStory",
  "Notion",
  "Claude Code",
  "Claude",
];

function ArrowLeft() {
  return (
    <svg
      className={styles.navIcon}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12.5 8h-9" />
      <path d="M7 3.5 2.5 8 7 12.5" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      className={styles.navIcon}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 2.5v8" />
      <path d="M4.5 7 8 10.5 11.5 7" />
      <path d="M2.5 13.5h11" />
    </svg>
  );
}

export default function Resume() {
  return (
    <div className={styles.page} data-page="resume">
      {/* ── TOP BAR ── */}
      <div className={styles.topBar}>
        <Link href="/" className={styles.navButton} data-cuelume-hover="tick">
          <ArrowLeft />
          <span>Back to Portfolio</span>
        </Link>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.navButton}
          data-cuelume-hover="tick"
        >
          <DownloadIcon />
          <span>Download PDF</span>
        </a>
      </div>

      {/* ── HEADER ── */}
      <header className={styles.header}>
        <div className={styles.identityText}>
          <h1 className={styles.name}>Anastasiia Lavrentii</h1>
          <p className={styles.role}>Senior Product Designer</p>
          <p className={styles.location}>Wrocław, Poland</p>
        </div>
        <ul className={styles.contacts}>
          {contacts.map((c) => (
            <li key={c.href}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={styles.contactLink}
                data-cuelume-hover="tick"
              >
                <span className={styles.linkArrow} aria-hidden="true">
                  ↗
                </span>
                <span>{c.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </header>

      {/* ── BODY ── */}
      <div className={styles.body}>
        {experience.map((job) => (
          <article key={job.company} className={styles.row}>
            <div className={styles.rowLead}>
              <h2 className={styles.jobTitle}>
                {job.title}, {job.company}
              </h2>
              <p className={styles.jobDates}>{job.dates}</p>
            </div>
            <ul className={styles.bullets}>
              {job.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </article>
        ))}

        <div className={styles.divider} />

        <section className={styles.row}>
          <div className={styles.rowLead}>
            <h2 className={styles.groupLabel}>Abilities</h2>
          </div>
          <p className={styles.skills}>{abilities.join(", ")}</p>
        </section>

        <section className={styles.row}>
          <div className={styles.rowLead}>
            <h2 className={styles.groupLabel}>Design &amp; Prototyping</h2>
          </div>
          <p className={styles.skills}>{tools.join(", ")}</p>
        </section>
      </div>
    </div>
  );
}
