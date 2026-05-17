import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Work — Anastasiia Lavrentii",
};

const projects = [
  {
    name: "Project One",
    description:
      "Brief description of the project, the problem it solved, and your role in shaping the design.",
    tags: ["Product Design", "Mobile"],
    year: "2024",
  },
  {
    name: "Project Two",
    description:
      "Brief description of the project, the problem it solved, and your role in shaping the design.",
    tags: ["UX Research", "Design System"],
    year: "2024",
  },
  {
    name: "Project Three",
    description:
      "Brief description of the project, the problem it solved, and your role in shaping the design.",
    tags: ["Mobile", "iOS"],
    year: "2023",
  },
  {
    name: "Project Four",
    description:
      "Brief description of the project, the problem it solved, and your role in shaping the design.",
    tags: ["Web", "B2B"],
    year: "2023",
  },
];

export default function Work() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Work</h1>
        <p className={styles.subtitle}>
          Selected projects from the past few years.
        </p>
      </header>

      <div className={styles.projectList}>
        {projects.map((project) => (
          <div key={project.name} className={styles.project}>
            <div className={styles.projectMeta}>
              <span className={styles.projectYear}>{project.year}</span>
            </div>
            <div className={styles.projectContent}>
              <h2 className={styles.projectName}>{project.name}</h2>
              <p className={styles.projectDescription}>{project.description}</p>
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
