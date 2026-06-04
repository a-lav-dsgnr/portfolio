import { Fragment } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import styles from "./page.module.css";
import ImageLightbox from "@/components/ImageLightbox";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: `${project.name} — Anastasiia Lavrentii` };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <article className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>{project.name}</h1>
        <dl className={styles.meta}>
          <div className={styles.metaRow}>
            <dt className={styles.metaKey}>Industry</dt>
            <dd className={styles.metaValue}>{project.industry}</dd>
          </div>
          {project.featureTypes.length > 0 && (
            <div className={styles.metaRow}>
              <dt className={styles.metaKey}>Type</dt>
              <dd className={styles.metaValue}>
                {project.featureTypes.join(" · ")}
              </dd>
            </div>
          )}
          <div className={styles.metaRow}>
            <dt className={styles.metaKey}>Year</dt>
            <dd className={styles.metaValue}>{project.year}</dd>
          </div>
        </dl>
      </header>

      {/* Hero image */}
      {project.heroImage && (
        <ImageLightbox
          src={project.heroImage}
          alt={`${project.name} hero`}
          className={styles.heroImg}
          wrapClassName={styles.heroWrap}
        />
      )}

      {/* Content blocks */}
      {project.blocks.map((block) => (
        <section key={block.heading} className={styles.block}>
          <div className={styles.blockInner}>
            {block.heading && <h2 className={styles.blockHeading}>{block.heading}</h2>}
            <div className={styles.blockBody}>
              {block.sections.map((section, i) => {
                if (section.type === "text") {
                  return (
                    <p key={i} className={styles.bodyText}>
                      {section.content}
                    </p>
                  );
                }

                if (section.type === "bullets") {
                  return (
                    <div key={i}>
                      {section.intro && (
                        <p className={styles.bodyText}>{section.intro}</p>
                      )}
                      <ul className={styles.bulletList}>
                        {section.items.map((item, j) => (
                          <li key={j} className={styles.bulletItem}>
                            {item.bold && <strong>{item.bold}</strong>}
                            {item.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }

                if (section.type === "image") {
                  return (
                    <div key={i} className={styles.imageWrap}>
                      <img src={section.src} alt={section.alt} className={styles.image} />
                    </div>
                  );
                }

                if (section.type === "subsection") {
                  const paragraphs = Array.isArray(section.content)
                    ? section.content
                    : [section.content];
                  return (
                    <Fragment key={i}>
                      {paragraphs.map((paragraph, j) => (
                        <p key={j} className={styles.bodyText}>
                          {j === 0 && (
                            <>
                              <strong>{section.title}</strong>{" "}
                            </>
                          )}
                          {paragraph}
                        </p>
                      ))}
                    </Fragment>
                  );
                }

                return null;
              })}
            </div>
          </div>
        </section>
      ))}
    </article>
  );
}
