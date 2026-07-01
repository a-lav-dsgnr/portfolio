import { Fragment } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import styles from "./page.module.css";
import ImageLightbox from "@/components/ImageLightbox";
import BeforeAfter from "@/components/BeforeAfter";

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
              {(() => {
                const items = [];
                let idx = 0;
                while (idx < block.sections.length) {
                  const section = block.sections[idx];
                  const next = block.sections[idx + 1];

                  if ((section.type === "image" || section.type === "video") && next?.type === "subsection") {
                    const paragraphs = Array.isArray(next.content) ? next.content : [next.content];
                    items.push(
                      <div key={idx} className={styles.imageGroup}>
                        <div className={styles.imageWrap}>
                          {section.type === "image" ? (
                            <img src={section.src} alt={section.alt} className={styles.image} />
                          ) : (
                            <video
                              src={section.src}
                              className={styles.image}
                              autoPlay
                              loop
                              muted
                              playsInline
                              aria-label={section.alt}
                              style={section.scale ? { transform: `scale(${section.scale})` } : undefined}
                            />
                          )}
                        </div>
                        {section.type === "video" && section.caption && (
                          <p className={styles.caption}>{section.caption}</p>
                        )}
                        <Fragment>
                          {paragraphs.map((paragraph, j) => (
                            <p key={j} className={styles.bodyText}>
                              {j === 0 && (
                                <><strong>{next.title}</strong>{" "}</>
                              )}
                              {paragraph}
                            </p>
                          ))}
                        </Fragment>
                      </div>
                    );
                    idx += 2;
                    continue;
                  }

                  if (section.type === "text") {
                    items.push(<p key={idx} className={styles.bodyText}>{section.content}</p>);
                  } else if (section.type === "bullets") {
                    items.push(
                      <div key={idx}>
                        {section.intro && <p className={styles.bodyText}>{section.intro}</p>}
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
                  } else if (section.type === "beforeAfter") {
                    items.push(
                      <BeforeAfter key={idx} before={section.before} after={section.after} />
                    );
                  } else if (section.type === "image") {
                    items.push(
                      <div key={idx} className={styles.imageWrap}>
                        <img src={section.src} alt={section.alt} className={styles.image} />
                      </div>
                    );
                  } else if (section.type === "video") {
                    items.push(
                      <div key={idx} className={styles.imageGroup}>
                        <div className={styles.imageWrap}>
                          <video
                            src={section.src}
                            className={styles.image}
                            autoPlay
                            loop
                            muted
                            playsInline
                            aria-label={section.alt}
                            style={section.scale ? { transform: `scale(${section.scale})` } : undefined}
                          />
                        </div>
                        {section.caption && (
                          <p className={styles.caption}>{section.caption}</p>
                        )}
                      </div>
                    );
                  } else if (section.type === "subsection") {
                    const paragraphs = Array.isArray(section.content) ? section.content : [section.content];
                    items.push(
                      <Fragment key={idx}>
                        {paragraphs.map((paragraph, j) => (
                          <p key={j} className={styles.bodyText}>
                            {j === 0 && (
                              <><strong>{section.title}</strong>{" "}</>
                            )}
                            {paragraph}
                          </p>
                        ))}
                      </Fragment>
                    );
                  }
                  idx++;
                }
                return items;
              })()}
            </div>
          </div>
        </section>
      ))}
    </article>
  );
}
