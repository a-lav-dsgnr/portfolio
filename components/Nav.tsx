"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner} ${scrolled ? styles.bordered : ""}`}>
        <Link href="/" className={styles.name}>
          ana.lav
        </Link>
        <nav className={styles.nav}>
          <a href={isHome ? "#work" : "/#work"}>Work</a>
          <a href={isHome ? "#about" : "/#about"}>About</a>
        </nav>
      </div>
    </header>
  );
}
