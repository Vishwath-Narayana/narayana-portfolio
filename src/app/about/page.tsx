import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import FrameMotion from "@/components/FrameMotion";
import Timeline from "@/components/about/Timeline";
import { projects } from "@/data/build";
import { activities, certifications, education, experience, intro, offTheClock, skills, years } from "@/data/about";

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

      <section className="px-5 pb-16 md:px-10 md:pb-24" aria-label="Four years at KITS">
        <p data-reveal className="mb-6 text-sm text-muted">
          Four years
        </p>
        <Timeline years={years} />
      </section>

      <section className="grid gap-16 px-5 pb-20 md:grid-cols-2 md:gap-20 md:px-10 md:pb-32">
        <div className="space-y-14">
          <div data-reveal>
            <h2 className="text-sm text-muted">Experience</h2>
            <p className="mt-4 text-lg md:text-xl">
              {experience.role}, {experience.org}
            </p>
            <p className="mt-1 font-mono text-sm text-muted">
              {experience.place}, {experience.period}
            </p>
            <ul className="mt-4 max-w-[54ch] space-y-2 text-base leading-relaxed text-muted">
              {experience.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>

          <div data-reveal>
            <h2 className="text-sm text-muted">Leadership and activities</h2>
            <ul className="mt-4 space-y-5">
              {activities.map((a) => (
                <li key={a.role + a.org}>
                  <p className="text-base md:text-lg">
                    {a.role}<span className="text-muted">, {a.org}</span>
                  </p>
                  <p className="mt-1 max-w-[54ch] text-sm leading-relaxed text-muted">{a.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-14">
          <div data-reveal>
            <h2 className="text-sm text-muted">Education</h2>
            <p className="mt-4 text-lg md:text-xl">{education.school}</p>
            <p className="mt-1 text-muted">{education.degree}</p>
            <p className="mt-1 font-mono text-sm text-muted">
              {education.period}, {education.note}
            </p>
          </div>

          <div data-reveal>
            <h2 className="text-sm text-muted">Certifications</h2>
            <ul className="mt-4 space-y-3 text-base">
              {certifications.map((c) => (
                <li key={c.name}>
                  {c.name}
                  {"detail" in c && c.detail && <span className="block text-sm text-muted">{c.detail}</span>}
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal>
            <h2 className="text-sm text-muted">What I work with</h2>
            <dl className="mt-4 space-y-3 text-sm leading-relaxed">
              {skills.map((s) => (
                <div key={s.label} className="grid gap-x-4 sm:grid-cols-[7.5rem_minmax(0,1fr)]">
                  <dt className="text-muted">{s.label}</dt>
                  <dd>{s.items}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-10 md:pb-32">
        <h2 data-reveal className="text-sm text-muted">
          Selected work
        </h2>
        <ul className="mt-4 border-t border-line">
          {projects.map((p) => (
            <li key={p.name} data-reveal className="border-b border-line">
              <Link
                href="/build"
                className="grid gap-1 py-6 transition-[padding] duration-500 [transition-timing-function:var(--ease-out)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-16 md:py-8 md:hover:pl-3"
              >
                <span className="display text-3xl md:text-5xl">{p.name}</span>
                <span className="max-w-[54ch] self-center text-muted">{p.kind}. {p.stack.slice(0, 4).join(", ")}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-5 pb-28 md:px-10 md:pb-44">
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
