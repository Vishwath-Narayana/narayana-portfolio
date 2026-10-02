import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import FrameMotion from "@/components/FrameMotion";
import { currently, fieldNotes, identity, inShort, story } from "@/data/about";

export const metadata: Metadata = {
  title: "About",
  description: "A computer science student who moved from design to full-stack to data engineering.",
};

/** A small label on the left, the content on the right. Stacks on mobile. */
function Block({ label, aside, children }: { label: string; aside?: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-5 border-t border-line px-5 py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-16 md:px-10 md:py-16">
      <div data-reveal>
        <h2 className="text-sm text-muted">{label}</h2>
        {aside && <p className="mt-1 font-mono text-xs text-muted">{aside}</p>}
      </div>
      <div data-reveal>{children}</div>
    </section>
  );
}

export default function Page() {
  // The resume link appears as soon as a PDF is placed at public/resume.pdf.
  const hasResume = fs.existsSync(path.join(process.cwd(), "public", "resume.pdf"));

  return (
    <>
      <FrameMotion />
      <section className="px-5 pb-20 pt-32 md:px-10 md:pb-32 md:pt-44">
        <p data-reveal className="text-sm text-muted">
          About
        </p>
        <h1 data-reveal className="display mt-4 max-w-[12em] text-balance text-[clamp(2.6rem,6.4vw,7rem)] !leading-[1.02]">
          I used to design interfaces. Now I design the pipes underneath them.
        </h1>
        <p data-reveal className="mt-10 max-w-[48ch] text-base leading-relaxed text-muted md:mt-14 md:text-lg">
          {identity}
        </p>
      </section>

      <Block label="How I got here">
        <div className="max-w-[54ch] space-y-5 text-lg leading-relaxed md:text-xl">
          {story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Block>

      <Block label="Currently" aside={currently.when}>
        <dl className="max-w-[54ch] space-y-4">
          {currently.lines.map((l) => (
            <div key={l.label} className="grid gap-x-6 sm:grid-cols-[7rem_minmax(0,1fr)]">
              <dt className="text-muted">{l.label}</dt>
              <dd>{l.text}</dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block label="Field notes">
        <ul>
          {fieldNotes.map((n) => (
            <li key={n.text} className="grid gap-2 border-b border-line py-5 first:pt-0 last:border-b-0 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:gap-10">
              <p className="max-w-[40ch] text-lg md:text-xl">{n.text}</p>
              {n.href && (
                <p className="md:self-center">
                  <Link href={n.href} className="link-line pb-0.5 text-base">
                    {n.cta}
                  </Link>
                </p>
              )}
            </li>
          ))}
        </ul>
      </Block>

      <Block label="In short">
        <ul className="max-w-[54ch] space-y-3 text-base leading-relaxed">
          {inShort.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-base">
          {hasResume && (
            <a href="/resume.pdf" className="link-line pb-0.5" download>
              Full resume (PDF)
            </a>
          )}
          <Link href="/build" className="link-line pb-0.5">
            What I have built
          </Link>
        </p>
      </Block>

      <section className="border-t border-line px-5 py-10 pb-28 md:px-10 md:pb-44">
        <p data-reveal className="max-w-[60ch] text-sm leading-relaxed text-muted">
          Set in Instrument Serif and Geist. Black and white, like most of my photographs. Built with Next.js, GSAP and Lenis.
        </p>
      </section>
    </>
  );
}
