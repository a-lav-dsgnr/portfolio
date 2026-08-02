import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CuelumeBind from "@/components/CuelumeBind";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Anastasiia Lavrentii — Product Designer",
  description:
    "Product designer crafting digital products with intention and care.",
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
        <SpeedInsights />
      </body>
    </html>
  );
}
