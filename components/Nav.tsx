import Link from "next/link";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.name}>
          ana.lav
        </Link>
        <nav className={styles.nav}>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
