import { Fragment } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, type CaptionPart } from "@/data/projects";
import styles from "./page.module.css";
import ImageLightbox from "@/components/ImageLightbox";
import BeforeAfter from "@/components/BeforeAfter";
import ImageCarousel from "@/components/ImageCarousel";
import VideoLightbox from "@/components/VideoLightbox";
import StaticImage from "@/components/StaticImage";
import { imageSize } from "@/lib/imageSize";

type Props = { params: Promise<{ slug: string }> };

/* The file's intrinsic pixel size, read once at build time, so next/image can
   reserve the right height before the image loads — this is what stops the
   page from jumping. Falls back to 0/0 when the file can't be read, which
   StaticImage treats as "unknown" and renders a plain <img> instead. */
function sizeOf(src: string): { width: number; height: number } {
  const size = imageSize(src);
  return { width: size?.width ?? 0, height: size?.height ?? 0 };
}

function sized<T extends { src: string }>(img: T): T & { width: number; height: number } {
  return { ...img, ...sizeOf(img.src) };
}

function Caption({ parts }: { parts: CaptionPart[] }) {
  return (
    <p className={styles.caption}>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          part
        ) : (
          <a key={i} href={part.href} target="_blank" rel="noopener noreferrer">
            {part.text}
          </a>
        )
      )}
    </p>
  );
}

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
          {...sizeOf(project.heroImage)}
          className={styles.heroImg}
          wrapClassName={styles.heroWrap}
        />
      )}

      {/* Content blocks */}
      {project.blocks.map((block) => {
        /* A leading bare illustration is hoisted above the heading so it reads
           as part of the section, not as a figure inside its body. */
        const lead = block.sections[0];
        const leadImage = lead?.type === "image" && lead.bare ? lead : null;
        const bodySections = leadImage ? block.sections.slice(1) : block.sections;
        return (
        <section key={block.heading} className={styles.block}>
          <div className={styles.blockInner}>
            {leadImage && (
              <StaticImage
                src={leadImage.src}
                alt={leadImage.alt}
                className={`${styles.bareImage} ${styles.leadImage}`}
                sizes="(max-width: 600px) 100vw, 560px"
                {...sizeOf(leadImage.src)}
              />
            )}
            {block.heading && <h2 className={styles.blockHeading}>{block.heading}</h2>}
            <div className={styles.blockBody}>
              {(() => {
                const items = [];
                let idx = 0;
                while (idx < bodySections.length) {
                  const section = bodySections[idx];
                  const next = bodySections[idx + 1];

                  if (
                    (section.type === "image" ||
                      section.type === "video" ||
                      section.type === "carousel") &&
                    next?.type === "subsection"
                  ) {
                    const paragraphs = Array.isArray(next.content) ? next.content : [next.content];
                    items.push(
                      <div key={idx} className={styles.imageGroup}>
                        {section.type === "carousel" ? (
                          <ImageCarousel images={section.images.map(sized)} />
                        ) : section.type === "image" ? (
                          <ImageLightbox
                            src={section.src}
                            alt={section.alt}
                            className={styles.image}
                            wrapClassName={styles.imageWrap}
                            {...sizeOf(section.src)}
                          />
                        ) : (
                          <VideoLightbox
                            src={section.src}
                            alt={section.alt}
                            className={styles.image}
                            wrapClassName={styles.imageWrap}
                            poster={section.poster}
                            scale={section.scale}
                          />
                        )}
                        {section.type === "video" && section.caption && (
                          <p className={styles.caption}>{section.caption}</p>
                        )}
                        {section.type === "image" && section.caption && (
                          <Caption parts={section.caption} />
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

                  if (section.type === "banner") {
                    items.push(
                      <aside key={idx} className={styles.banner} role="note">
                        <svg
                          className={styles.bannerIcon}
                          viewBox="0 0 16 16"
                          fill="none"
                          aria-hidden="true"
                        >
                          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" />
                          <path d="M8 7.25v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                          <circle cx="8" cy="4.75" r="0.9" fill="currentColor" />
                        </svg>
                        <p className={styles.bannerText}>{section.text}</p>
                      </aside>
                    );
                  } else if (section.type === "text") {
                    items.push(<p key={idx} className={styles.bodyText}>{section.content}</p>);
                  } else if (section.type === "bullets") {
                    items.push(
                      <div key={idx} className={styles.bulletGroup}>
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
                      <BeforeAfter
                        key={idx}
                        before={sized(section.before)}
                        after={sized(section.after)}
                      />
                    );
                  } else if (section.type === "image") {
                    items.push(
                      section.bare ? (
                        <StaticImage
                          key={idx}
                          src={section.src}
                          alt={section.alt}
                          className={styles.bareImage}
                          sizes="(max-width: 600px) 100vw, 560px"
                          {...sizeOf(section.src)}
                        />
                      ) : (
                        <ImageLightbox
                          key={idx}
                          src={section.src}
                          alt={section.alt}
                          className={styles.image}
                          wrapClassName={styles.imageWrap}
                          {...sizeOf(section.src)}
                        />
                      )
                    );
                  } else if (section.type === "carousel") {
                    items.push(<ImageCarousel key={idx} images={section.images.map(sized)} />);
                  } else if (section.type === "video") {
                    items.push(
                      <div key={idx} className={styles.imageGroup}>
                        <VideoLightbox
                          src={section.src}
                          alt={section.alt}
                          className={styles.image}
                          wrapClassName={styles.imageWrap}
                          poster={section.poster}
                          scale={section.scale}
                        />
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
        );
      })}
    </article>
  );
}
