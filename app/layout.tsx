import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CuelumeBind from "@/components/CuelumeBind";

const siteTitle = "Anastasiia Lavrentii — Product Designer";
const siteDescription =
  "Product designer crafting digital products with intention and care.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ana-lav.vercel.app"),
  title: siteTitle,
  description: siteDescription,
  // Explicit link-preview tags: without them, messengers guess and pick
  // a random heading and photo from the page.
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Anastasiia Lavrentii",
    title: siteTitle,
    description: siteDescription,
    images: [{ url: "/og.jpg", width: 1200, height: 801, alt: siteTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* A reload should start at the top, not wherever the browser
            remembers. Runs before paint so it beats scroll restoration. */}
        <Script id="reset-scroll-on-reload" strategy="beforeInteractive">
          {"(function(){var n=performance.getEntriesByType('navigation')[0];" +
            "if('scrollRestoration' in history&&(!n||n.type==='reload')){" +
            "history.scrollRestoration='manual';window.scrollTo(0,0);}})();"}
        </Script>
        <CuelumeBind />
        <Nav />
        <main className="container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
