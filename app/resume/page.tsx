import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Resume — Anastasiia Lavrentii",
  description:
    "Senior Product Designer, 5+ years in complex B2B (fintech, SaaS). Turns dense expert workflows into usable interfaces and scalable design systems.",
};

const contacts = [
  {
    label: "linkedin.com/in/anastasiia-lavrentii",
    href: "https://www.linkedin.com/in/anastasiia-lavrentii-207937238/",
  },
  { label: "lav.dsgnr@gmail.com", href: "mailto:lav.dsgnr@gmail.com" },
];

const summary =
  "Senior Product Designer, 5+ years in complex B2B (fintech, SaaS). Turns dense expert workflows into usable interfaces and scalable design systems. Recently focused on AI-native, agentic UX, including shipped work that cut manual inbox handling by 61%.";

type Role = {
  title: string;
  company: string;
  dates: string;
  client?: string;
  bullets: string[];
  otherProjects?: string[];
};

const experience: Role[] = [
  {
    title: "Senior Product Designer",
    company: "Glow Design Agency",
    dates: "Mar 2023 – Present",
    client: "Lendflow, August 2024 – Present",
    bullets: [
      "Own end-to-end design of the core interfaces funding advisors and underwriters work in on a B2B embedded-lending platform, from independent research and prototyping through UI. Most of the job is making dense underwriting workflows usable.",
      "Designed a command interface for invoking AI agents, including one specifically for email, cutting manual inbox handling by 61% and first-response time by 67%.",
      "Built interactive, AI-assisted prototypes in Claude and Cursor to walk stakeholders through complex flows, which got alignment and sign-off faster.",
      "Modernized a legacy design system with developers by adding reusable components and tokens, which removed inconsistencies and sped up UI delivery.",
      "Redesigned the lender offer review flow, cutting review time for funding advisors.",
      "Work daily with CEO, PMs, and engineers to align on strategy and settle technical trade-offs early.",
    ],
    otherProjects: [
      "Redesigned booking and onboarding flows, which improved usability and lifted conversion at the main drop-off points.",
      "Combined user research (interviews, usability tests, card sorting) with behavioral analytics from FullStory and PostHog to surface pain points and validate design decisions.",
    ],
  },
  {
    title: "UX/UI Designer",
    company: "AppCake",
    dates: "Jun 2022 – Feb 2023",
    bullets: [
      "Designed cross-platform mobile apps (iOS, Android, Unity) across utilities, game-guide, and health categories.",
      "Redesigned subscription-onboarding screens and store assets that contributed to a 7.5% increase in user engagement.",
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
      "Designed social-media marketing creatives that increased sales conversions",
    ],
  },
];

const skillColumns: string[][] = [
  [
    "Product Strategy & business impact",
    "Design Systems",
    "Complex & data-dense workflow design",
    "User Research (B2B / expert users)",
    "Usability Testing",
    "Interactive prototyping (incl. AI-assisted)",
  ],
  [
    "Data-driven design & impact measurement (A/B testing, product metrics)",
    "Information Architecture",
    "Systems Thinking",
    "Visual & interaction design",
    "Cross-functional collaboration & stakeholder management",
    "AI-assisted design workflows",
  ],
];

type ToolGroup = { label: string; items: string[] };

const toolColumns: ToolGroup[][] = [
  [
    { label: "Design", items: ["Figma", "FigJam", "Miro"] },
    { label: "AI", items: ["Claude", "Claude Code", "Cursor"] },
  ],
  [
    { label: "Analytics", items: ["FullStory", "PostHog"] },
    { label: "Collaboration & dev", items: ["GitHub", "Notion"] },
  ],
];

type Course = {
  name: string;
  issuer: string;
  dates: string;
};

const courses: Course[] = [
  { name: "Product Design Process", issuer: "noticelittlethings", dates: "Nov 2025" },
  { name: "Usability Testing Workshop", issuer: "noticelittlethings", dates: "Apr 2025" },
  { name: "Product Design Course", issuer: "Projector Institute", dates: "Jun 2023 – Oct 2023" },
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
          download="Anastasiia-Lavrentii-CV.pdf"
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
        <section className={styles.row}>
          <div className={styles.rowLead}>
            <h2 className={styles.groupLabel}>Summary</h2>
          </div>
          <p className={styles.skills}>{summary}</p>
        </section>

        {experience.map((job) => (
          <article key={job.company} className={styles.row}>
            <div className={styles.rowLead}>
              <h2 className={styles.jobTitle}>
                {job.title}, {job.company}
              </h2>
              <p className={styles.jobDates}>{job.dates}</p>
            </div>
            <div className={styles.rowContent}>
              {job.client && <p className={styles.clientLine}>{job.client}</p>}
              <ul className={styles.bullets}>
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              {job.otherProjects && (
                <div className={styles.subGroup}>
                  <h3 className={styles.subGroupLabel}>Other Projects</h3>
                  <ul className={styles.bullets}>
                    {job.otherProjects.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </article>
        ))}

        <div className={styles.divider} />

        <section className={styles.row}>
          <div className={styles.rowLead}>
            <h2 className={styles.groupLabel}>Skills</h2>
          </div>
          <div className={styles.group}>
            {skillColumns.map((col, i) => (
              <ul key={i} className={styles.bullets}>
                {col.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            ))}
          </div>
        </section>

        <section className={styles.row}>
          <div className={styles.rowLead}>
            <h2 className={styles.groupLabel}>Tools</h2>
          </div>
          <div className={styles.group}>
            {toolColumns.map((col, i) => (
              <div key={i} className={styles.toolCol}>
                {col.map((group) => (
                  <p key={group.label} className={styles.skills}>
                    <span className={styles.toolGroupLabel}>{group.label}:</span>{" "}
                    {group.items.join(", ")}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.row}>
          <div className={styles.rowLead}>
            <h2 className={styles.groupLabel}>Courses &amp; Certification</h2>
          </div>
          <div className={styles.courses}>
            {courses.map((c) => (
              <div key={c.name} className={styles.courseRow}>
                <span>
                  {c.name} · {c.issuer}
                </span>
                <span className={styles.courseDates}>{c.dates}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
