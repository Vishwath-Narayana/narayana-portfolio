import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import FrameMotion from "@/components/FrameMotion";
import Timeline from "@/components/about/Timeline";
import { intro, offTheClock, quiet, years } from "@/data/about";

export const metadata: Metadata = {
  title: "About",
  description: "A computer science student who moved from design to full-stack to data engineering.",
};

export default function Page() {
  // The resume link appears as soon as a PDF is placed at public/resume.pdf.
  const hasResume = fs.existsSync(path.join(process.cwd(), "public", "resume.pdf"));

  return (
    <>
      <FrameMotion />
      <section className="px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44">
        <p data-reveal className="text-sm text-muted">
          About
        </p>
        <h1 data-reveal className="display mt-4 max-w-[14em] text-balance text-[clamp(2.4rem,5.4vw,5.6rem)] !leading-[1.04]">
          I start with the person using the thing, then build down to the data.
        </h1>
        <div data-reveal className="mt-10 max-w-[54ch] space-y-5 text-base leading-relaxed md:mt-14 md:text-lg">
          <p>{intro}</p>
          {hasResume && (
            <p>
              <a href="/resume.pdf" className="link-line pb-0.5" download>
                Download my resume
              </a>
            </p>
          )}
        </div>
      </section>

      <section className="px-5 md:px-10" aria-label="Four years at KITS">
        <p data-reveal className="mb-6 text-sm text-muted md:mb-0">
          Four years
        </p>
        <Timeline years={years} />
        <p className="max-w-[60ch] border-t border-line py-8 text-sm leading-relaxed text-muted">{quiet}</p>
      </section>

      <section className="px-5 pb-28 pt-20 md:px-10 md:pb-44 md:pt-32">
        <h2 data-reveal className="display text-[clamp(2rem,4.4vw,4.4rem)] !leading-[1.04]">
          Off the clock
        </h2>
        <ul className="mt-10 border-t border-line md:mt-16">
          {offTheClock.map((o) => (
            <li
              key={o.href + o.cta}
              data-reveal
              className="grid gap-3 border-b border-line py-7 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:gap-16 md:py-9"
            >
              <p className="max-w-[40ch] text-lg md:text-2xl">{o.line}</p>
              <p className="md:self-center">
                <Link href={o.href} className="link-line pb-0.5 text-base">
                  {o.cta}
                </Link>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
