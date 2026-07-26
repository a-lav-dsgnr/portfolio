"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { projects } from "@/data/projects";
import styles from "./Nav.module.css";

/** Same order the homepage lists projects in. */
const ordered = [...projects].sort((a, b) => Number(b.year) - Number(a.year));

/** Section to scroll to once the homepage mounts after a cross-page click. */
const PENDING_SECTION = "nav:pending-section";

function ArrowLeft() {
  return (
    <svg
      className={styles.icon}
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

function ArrowRight() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 8h9" />
      <path d="M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Never leave a #hash in the URL — otherwise every reload jumps to that
     section. Section links scroll manually instead. */
  useEffect(() => {
    const stripHash = () => {
      if (!window.location.hash) return;
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    };
    stripHash();
    window.addEventListener("hashchange", stripHash);
    return () => window.removeEventListener("hashchange", stripHash);
  }, [pathname]);

  /* Coming home from a case study: scroll to the section we were asked for. */
  useEffect(() => {
    if (!isHome) return;
    const target = sessionStorage.getItem(PENDING_SECTION);
    if (!target) return;
    sessionStorage.removeItem(PENDING_SECTION);
    requestAnimationFrame(() => {
      document.getElementById(target)?.scrollIntoView({ block: "start" });
    });
  }, [isHome]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    sessionStorage.setItem(PENDING_SECTION, id);
    router.push("/");
  };

  const slug = pathname?.startsWith("/work/") ? pathname.slice("/work/".length) : null;
  const current = slug ? ordered.findIndex((p) => p.slug === slug) : -1;

  if (current !== -1) {
    const next = ordered[(current + 1) % ordered.length];

    return (
      <header className={styles.header}>
        <div className={`container ${styles.inner} ${scrolled ? styles.bordered : ""}`}>
          <Link
            href="/#work"
            className={styles.navButton}
            data-cuelume-hover="tick"
            onClick={(e) => scrollToSection(e, "work")}
          >
            <ArrowLeft />
            <span>Back</span>
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className={styles.navButton}
            data-cuelume-hover="tick"
          >
            <span>Next project</span>
            <ArrowRight />
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner} ${scrolled ? styles.bordered : ""}`}>
        <Link href="/" className={styles.name}>
          ana.lav
        </Link>
        <nav className={styles.nav}>
          <a href={isHome ? "#work" : "/#work"} onClick={(e) => scrollToSection(e, "work")}>
            Work
          </a>
          <a href={isHome ? "#about" : "/#about"} onClick={(e) => scrollToSection(e, "about")}>
            About
          </a>
        </nav>
      </div>
    </header>
  );
}
