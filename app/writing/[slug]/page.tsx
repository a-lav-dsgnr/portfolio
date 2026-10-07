import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { writing, type InlinePart } from "@/data/writing";
import ImageLightbox from "@/components/ImageLightbox";
import { imageSize } from "@/lib/imageSize";
import styles from "./page.module.css";

type Props = { params: Promise<{ slug: string }> };

function Inline({ parts }: { parts: InlinePart[] }) {
  return (
    <>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          part
        ) : (
          <a key={i} href={part.href} target="_blank" rel="noopener noreferrer">
            {part.text}
          </a>
        )
      )}
    </>
  );
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export async function generateStaticParams() {
  return writing.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = writing.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} — Anastasiia Lavrentii`,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = writing.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <article className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{article.title}</h1>
        <p className={styles.meta}>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden="true"> · </span>
          {article.readingTime}
        </p>
      </header>

      <div className={styles.body}>
        {article.blocks.map((block, i) => {
          if (block.type === "heading") {
            return (
              <h2 key={i} className={styles.heading}>
                {block.text}
              </h2>
            );
          }
          if (block.type === "image") {
            const size = imageSize(block.src);
            return (
              <figure key={i} className={styles.figure}>
                <ImageLightbox
                  src={block.src}
                  alt={block.alt}
                  width={size?.width ?? 0}
                  height={size?.height ?? 0}
                  className={styles.image}
                  wrapClassName={styles.imageWrap}
                  // The first image sits above the fold.
                  priority={i < 2}
                />
                {block.caption && (
                  <figcaption className={styles.caption}>{block.caption}</figcaption>
                )}
              </figure>
            );
          }
          return (
            <p key={i} className={styles.paragraph}>
              <Inline parts={block.content} />
            </p>
          );
        })}
      </div>
    </article>
  );
}
