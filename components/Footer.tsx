"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Footer.module.css";

const A_BODY = "M52.9701 115.581C52.9275 115.779 52.038 117.606 50.8104 119.473C50.2799 120.28 49.7214 120.744 48.9676 120.991C48.7019 121.078 48.3102 121.016 48.043 120.932C47.7759 120.847 47.6321 120.679 47.532 120.491C47.4319 120.304 47.3799 120.103 47.3594 118.438C47.3389 116.772 47.3516 113.648 47.5628 110.879C47.774 108.11 48.1833 105.791 48.7628 102.805C49.3423 99.8181 50.0796 96.2336 50.5012 94.2755C51.8979 87.7877 54.1628 81.4902 56.0118 75.1166C56.2314 74.3598 56.4489 73.5976 56.6599 72.8417C57.9312 68.2895 58.9226 64.1084 59.7678 60.6075C60.613 57.1067 63.4529 47.4674 63.8629 46.1319C65.2254 40.6609 67.7329 29.8631 69.0927 23.9546C70.4525 18.046 70.5449 17.343 70.8445 15.9464C71.144 14.5498 71.6479 12.4807 71.9578 10.1874C72.596 5.46442 72.347 2.78696 72.0644 2.58701C71.4 2.11703 70.3699 2.5337 69.6926 2.8873C68.7926 3.35721 68.3595 4.11887 67.4885 5.08106C66.2282 6.47339 65.3958 7.70723 65.1052 8.14206C63.9434 9.88018 62.0281 13.444 61.2502 15.3244C60.1655 17.9464 59.6989 18.6198 57.882 21.7464C56.2992 24.4699 53.3979 29.5147 51.8298 32.2081C50.2616 34.9014 50.1204 35.0938 47.9768 39.1331C45.8332 43.1725 41.6914 51.0528 39.5241 55.1962C37.2734 59.4987 36.989 60.0898 36.4221 61.14C35.0475 63.6864 34.5978 64.6431 34.1907 65.424C34.0876 65.6218 33.988 65.8728 33.0796 67.5581C32.1711 69.2435 30.463 72.3585 28.3152 76.3202C26.1674 80.2819 23.6317 84.9959 22.1428 87.7095C20.3287 91.016 19.2823 92.4184 18.1419 93.8542C16.6759 95.6998 14.5386 96.3826 13.3928 96.5791C11.7386 96.8627 10.8177 96.1469 9.35194 95.2041C8.06829 94.3785 6.80605 92.4759 5.49348 90.4618C4.75955 89.3355 3.57888 86.3955 2.88942 84.3047C2.73592 83.8392 2.45832 82.0424 2.13011 78.5323C1.95186 76.626 1.9945 74.447 2.03904 72.9941C2.08359 71.5412 2.19129 70.8756 2.58007 69.3943C2.96885 67.913 3.63546 65.6361 4.19146 63.929C4.74746 62.2219 5.17266 61.1535 5.79767 59.8649C7.998 55.3285 9.3313 53.9416 10.1637 52.9071C10.9984 51.8697 13.204 50.3064 15.5045 48.961C16.2857 48.5042 18.0272 47.9321 20.2116 47.1425C22.1521 46.4411 24.2396 46.8431 24.8954 47.0385C25.4432 47.2017 26.1064 47.4188 26.7459 47.6578C28.0367 48.1402 29.2549 48.8817 30.0602 49.9998C30.1938 50.1931 30.28 50.3365 30.3688 50.4842";

const A_BAR =
  "M13.1827 60.5917C13.2042 60.5917 15.6051 60.5917 19.3576 60.5715C20.9848 60.5628 21.8169 60.4577 24.8924 60.3905C27.406 60.3357 31.8543 60.2359 34.6927 60.2328C39.968 60.227 40.6651 60.5629 42.4796 60.828C44.0222 61.0533 46.8256 61.4742 49.0199 61.7233C52.7038 62.1416 54.8525 62.1876 55.9548 62.3229C56.8682 62.435 58.9267 62.6987 62.3413 63.0874C64.1128 63.289 65.9868 63.2492 68.2375 63.0112C70.4882 62.7731 73.065 62.274 75.3576 61.6891C77.6502 61.1043 79.5806 60.4489 81.5695 59.7736";

const L_PATH =
  "M116.003 6.47474C116.003 4.68611 115.611 3.00168 115.338 2.25799C115.217 1.92801 113.838 1.97474 113.527 2.07038C113.217 2.16601 113.162 2.25799 112.257 4.18952C112.045 4.64267 111.618 5.33499 110.301 8.0577C108.985 10.7804 106.762 15.4976 104.834 19.8502C100.338 28.9758 84.4434 85.7324 82.9959 93.7095C81.5484 101.687 81.4929 104.533 81.5109 106.254C81.5342 108.488 82.1087 110.19 82.7996 112.17C83.2216 113.379 83.6295 113.888 83.9208 114.163C84.9169 115.105 87.3582 114.439 91.4422 113.018C92.9448 112.495 95.2583 110.833 98.3516 108.682C99.5938 107.818 100.13 107.358 101.085 106.682C101.97 106.055 103.193 105.241 105.232 103.883L105.914 103.429C108.242 101.879 111.434 99.7537 114.042 98.1373C116.721 96.4776 118.683 95.4212 120.032 94.7309C122.034 93.7059 123.319 93.2423 124.37 92.882C125.223 92.5899 127.699 92.1471 131.079 91.5525C134.102 91.224 135.956 91.1771 138.116 91.1284C138.585 91.1029 138.745 91.0517 138.938 90.9352";

// durations in seconds — total ≈ 1.7s
const D1 = 0.8; // A body
const D2 = 0.5; // A crossbar
const D3 = 0.7; // L

export default function Footer() {
  const ref1 = useRef<SVGPathElement>(null);
  const ref2 = useRef<SVGPathElement>(null);
  const ref3 = useRef<SVGPathElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [animate, setAnimate] = useState(false);
  const [lengths, setLengths] = useState({ p1: 2800, p2: 600, p3: 1600 });

  useEffect(() => {
    setLengths({
      p1: ref1.current?.getTotalLength() ?? 2800,
      p2: ref2.current?.getTotalLength() ?? 600,
      p3: ref3.current?.getTotalLength() ?? 1600,
    });
  }, []);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const pathStyle = (len: number, delay: number) => ({
    strokeDasharray: len,
    strokeDashoffset: animate ? 0 : len,
    transition: animate
      ? `stroke-dashoffset ${delay === 0 ? D1 : delay === D1 ? D2 : D3}s ease ${delay}s`
      : "none",
  });

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.links}>
          <a href="mailto:a.lav.dsgnr@gmail.com" className={styles.link} data-cuelume-hover="tick">Email</a>
          <a href="https://www.linkedin.com/in/anastasiia-lavrentii-207937238/" target="_blank" rel="noopener noreferrer" className={styles.link} data-cuelume-hover="tick">LinkedIn</a>
          <a href="/resume.pdf" className={styles.link} data-cuelume-hover="tick">Resume</a>
        </div>
        <svg
          className={styles.signature}
          viewBox="0 0 141 124"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* A body — draws first */}
          <path
            ref={ref1}
            d={A_BODY}
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={pathStyle(lengths.p1, 0)}
          />
          {/* A crossbar — draws second */}
          <path
            ref={ref2}
            d={A_BAR}
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={pathStyle(lengths.p2, D1)}
          />
          {/* L — draws last */}
          <path
            ref={ref3}
            d={L_PATH}
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={pathStyle(lengths.p3, D1 + D2)}
          />
        </svg>
      </div>
    </footer>
  );
}
