import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import FrameMotion from "@/components/FrameMotion";
import { TransitionLink } from "@/components/Transition";
import Story from "@/components/about/Story";
import Portrait from "@/components/about/Portrait";
import CountUp from "@/components/about/CountUp";
import Crop from "@/components/about/Crop";
import { aboutPics, currently, facts, identity, path as journey, someday, stats, story } from "@/data/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Vishwath Narayana Thoutam: a final-year computer science student at KITS Warangal who moved from design to full-stack to data engineering.",
};

const EMAIL = "vishwathnarayanathm19@gmail.com";
const pad = (n: number) => String(n).padStart(2, "0");

/** Reads a picture from public/about. Returns null when the file is not there, so the page works without it. */
function load(file: string, alt: string) {
  const abs = path.join(process.cwd(), "public", "about", file);
  if (!fs.existsSync(abs)) return null;
  return { src: `/about/${file}`, alt };
}

/** A small mono label used to open every section. */
function Label({ n, children }: { n: string; children: string }) {
  return (
    <p data-reveal className="flex items-baseline gap-4 font-mono text-xs uppercase tracking-[0.1em] text-muted md:text-sm">
      <span className="text-fg">{n}</span>
      <span aria-hidden className="h-px w-10 self-center bg-line" />
      {children}
    </p>
  );
}

export default function Page() {
  // The resume link appears as soon as a PDF is placed at public/resume.pdf.
  const hasResume = fs.existsSync(path.join(process.cwd(), "public", "resume.pdf"));
  const portrait = load(aboutPics.portrait.file, aboutPics.portrait.alt);
  const storyPics = aboutPics.story.map((s) => load(s.file, s.alt));
  const hasStoryPics = storyPics.every(Boolean);
  const moments = aboutPics.moments
    .map((m) => {
      const pic = load(m.file, m.alt);
      return pic ? { ...pic, caption: m.caption } : null;
    })
    .filter((m) => m !== null);

  const contacts = [
    { label: "Email", href: `mailto:${EMAIL}`, primary: true },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/vishwath-t-3563702a0" },
    { label: "GitHub", href: "https://github.com/Vishwath-Narayana" },
    ...(hasResume ? [{ label: "Resume (PDF)", href: "/resume.pdf" }] : []),
  ];

  return (
    <>
      <FrameMotion />

      {/* Hero: who, in one line, the four facts, and how to reach me. */}
      <section
        className={`grid items-end gap-14 px-5 pb-20 pt-32 md:gap-16 md:px-10 md:pb-28 md:pt-40 ${
          portrait ? "md:grid-cols-[minmax(0,1.6fr)_minmax(0,0.9fr)]" : ""
        }`}
      >
        <div>
          <p data-reveal className="font-mono text-xs uppercase tracking-[0.1em] text-muted md:text-sm">
            About &middot; Vishwath Narayana Thoutam
          </p>
          <h1 data-reveal className="display mt-5 max-w-[14em] text-balance text-[clamp(2.8rem,6.4vw,7.4rem)] !leading-[1.0]">
            I used to design interfaces. Now I design the pipes underneath them.
          </h1>
          <p data-reveal className="mt-10 max-w-[48ch] text-base leading-relaxed text-muted md:mt-12 md:text-lg">
            {identity}
          </p>

          <dl data-reveal className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-5 md:mt-12 md:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted">{f.label}</dt>
                <dd className="mt-1.5 text-sm md:text-base">{f.text}</dd>
              </div>
            ))}
          </dl>

          <div data-reveal className="mt-10 flex flex-wrap gap-3">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                {...(c.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                {...(c.href.endsWith(".pdf") ? { download: true } : {})}
                className={`group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-colors duration-300 ${
                  c.primary ? "border-fg bg-fg text-bg hover:bg-transparent hover:text-fg" : "border-line hover:border-fg"
                }`}
              >
                {c.label}
                <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  &#8599;
                </span>
              </a>
            ))}
          </div>
        </div>

        {portrait && (
          <div data-reveal className="mx-auto w-full max-w-sm md:max-w-none">
            <Portrait src={portrait.src} alt={portrait.alt} caption="Warangal, India" />
          </div>
        )}
      </section>

      {/* At a glance: the numbers, counting up. */}
      <section aria-label="At a glance" className="grid grid-cols-2 border-y border-line md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            data-reveal
            className={`px-5 py-10 md:px-10 md:py-14 ${i % 2 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line md:border-t-0" : ""} ${
              i === 2 ? "md:border-l" : ""
            }`}
          >
            <p className="display text-[clamp(3.2rem,6vw,6.4rem)] leading-none">
              <CountUp value={s.value} decimals={s.decimals ?? 0} plain={s.plain} />
            </p>
            <p className="mt-4 max-w-[18ch] font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted md:text-xs">{s.label}</p>
          </div>
        ))}
      </section>

      {/* How I got here. */}
      <section className="pt-20 md:pt-28">
        <div className="px-5 md:px-10">
          <Label n="01">How I got here</Label>
        </div>
        <Story chapters={story} pics={hasStoryPics ? (storyPics as { src: string; alt: string }[]) : null} />
      </section>

      {/* The path: education, work, leadership, recognition. */}
      <section className="border-t border-line px-5 py-20 md:px-10 md:py-28">
        <Label n="02">The path so far</Label>
        <h2 data-reveal className="display mt-6 max-w-[16em] text-balance text-[clamp(2.2rem,4.4vw,4.6rem)] !leading-[1.04]">
          A degree, an internship, and four years with the CSE Association.
        </h2>

        <div className="mt-14 space-y-14 md:mt-20 md:space-y-20">
          {journey.map((g) => (
            <div key={g.group} className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] md:gap-16">
              <h3 data-reveal className="font-mono text-xs uppercase tracking-[0.1em] text-muted md:sticky md:top-28 md:self-start md:text-sm">
                {g.group}
              </h3>
              <ol className="border-t border-line">
                {g.entries.map((e) => (
                  <li
                    key={e.role + e.when}
                    data-reveal
                    className="grid gap-2 border-b border-line py-6 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-10 md:py-8"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted md:pt-2">{e.when}</p>
                    <div>
                      <p className="display text-[clamp(1.6rem,2.4vw,2.4rem)] !leading-[1.1]">{e.role}</p>
                      <p className="mt-1.5 text-base">{e.where}</p>
                      {e.note && <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-muted md:text-base">{e.note}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* Moments: extra photographs, shown only when the files exist. */}
      {moments.length > 0 && (
        <section className="border-t border-line px-5 py-20 md:px-10 md:py-28">
          <Label n="03">Moments</Label>
          <ul className={`mt-12 grid gap-6 md:mt-16 md:gap-8 ${moments.length > 2 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2"}`}>
            {moments.map((m, i) => (
              <li key={m.src} data-reveal className={i % 2 ? "md:mt-16" : ""}>
                <Crop>
                  <div className="relative aspect-[4/5] overflow-hidden bg-line">
                    <Image src={m.src} alt={m.alt} fill sizes="(min-width: 768px) 24vw, 50vw" className="object-cover" />
                  </div>
                </Crop>
                <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted">
                  fig. {pad(i + 5)} &middot; {m.caption}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Now and next. */}
      <section className="border-t border-line px-5 py-20 md:px-10 md:py-28">
        <div className="flex items-baseline justify-between gap-6">
          <Label n={moments.length > 0 ? "04" : "03"}>Now and next</Label>
          <p data-reveal className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
            {currently.when}
          </p>
        </div>
        <dl className="mt-12 grid border-l border-t border-line md:mt-16 md:grid-cols-2">
          {[...currently.lines, { label: "Someday", text: "" }].map((l) => (
            <div key={l.label} data-reveal className="border-b border-r border-line p-6 md:p-10">
              <dt className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted">{l.label}</dt>
              <dd className="display mt-4 text-[clamp(1.7rem,2.6vw,2.7rem)] !leading-[1.12]">
                {l.label === "Someday"
                  ? someday.map((x, i) => (
                      <span key={x.text}>
                        <TransitionLink href={x.href} className="link-line">
                          {x.text}
                        </TransitionLink>
                        {i < someday.length - 1 ? ". " : "."}
                      </span>
                    ))
                  : l.text}
              </dd>
            </div>
          ))}
        </dl>

        <div data-reveal className="mt-14 flex flex-wrap items-baseline justify-between gap-6 md:mt-20">
          <p className="display max-w-[22ch] text-[clamp(1.8rem,3vw,3rem)] !leading-[1.1]">
            The work itself lives on the Build page.
          </p>
          <TransitionLink
            href="/build"
            className="group inline-flex items-center gap-3 border-b border-fg pb-1 text-base md:text-lg"
          >
            See what I have built
            <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1.5">
              &rarr;
            </span>
          </TransitionLink>
        </div>
      </section>
    </>
  );
}
