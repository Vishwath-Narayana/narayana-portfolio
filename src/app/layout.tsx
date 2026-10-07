import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/caveat/latin-500.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "@fontsource-variable/bodoni-moda/wght.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { TransitionProvider } from "@/components/Transition";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Vishwath Narayana — Data engineer, photographer, writer",
    template: "%s — Vishwath Narayana",
  },
  description:
    "Vishwath Narayana Thoutam builds data pipelines and web products, photographs ordinary light, and writes about technology and daily life.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark light",
};

// Runs before paint so the saved theme never flashes the wrong way round.
const themeScript = `try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <TransitionProvider>
          <SmoothScroll />
          <Nav />
          <main>{children}</main>
          <Footer />
        </TransitionProvider>
      </body>
    </html>
  );
}
