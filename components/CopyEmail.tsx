"use client";
import { useState } from "react";
import styles from "./CopyEmail.module.css";

const EMAIL = "a.lav.dsgnr@gmail.com";

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button className={styles.btn} onClick={handleCopy}>
      {copied ? "Copied!" : EMAIL}
    </button>
  );
}
