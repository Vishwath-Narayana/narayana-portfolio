import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import FrameMotion from "@/components/FrameMotion";
import Timeline from "@/components/about/Timeline";
import { activities, certifications, education, experience, intro, offTheClock, skills, years } from "@/data/about";

export const metadata: Metadata = {
  title: "About",
  description: "A computer science student who moved from design to full-stack to data engineering.",
};

/** A quiet label on the left, the content on the right. */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-6 border-t border-line py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-16 md:py-14">
      <h2 data-reveal className="text-sm text-muted">
        {label}
      </h2>
      <div data-reveal>{children}</div>
    </div>
  );
}

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

      <section className="px-5 pb-16 md:px-10 md:pb-24">
        <Row label="Experience">
          <p className="text-lg md:text-xl">
            {experience.role}, {experience.org}
          </p>
          <p className="mt-2 font-mono text-sm text-muted">
            {experience.place}, {experience.period}
          </p>
          <ul className="mt-6 max-w-[54ch] space-y-3 text-base leading-relaxed">
            {experience.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </Row>

        <Row label="Education">
          <p className="text-lg md:text-xl">{education.school}</p>
          <p className="mt-2 text-muted">{education.degree}</p>
          <p className="mt-2 font-mono text-sm text-muted">
            {education.period}, {education.note}
          </p>
        </Row>

        <Row label="Certifications">
          <ul className="space-y-6">
            {certifications.map((c) => (
              <li key={c.name}>
                <p className="text-lg md:text-xl">{c.name}</p>
                {"detail" in c && c.detail && <p className="mt-1 max-w-[54ch] text-muted">{c.detail}</p>}
              </li>
            ))}
          </ul>
        </Row>

        <Row label="Leadership and activities">
          <ul className="space-y-7">
            {activities.map((a) => (
              <li key={a.role + a.org}>
                <p className="text-lg md:text-xl">{a.role}</p>
                <p className="mt-1 text-muted">{a.org}</p>
                <p className="mt-2 max-w-[54ch]">{a.note}</p>
              </li>
            ))}
          </ul>
        </Row>

        <Row label="What I work with">
          <dl className="space-y-5">
            {skills.map((s) => (
              <div key={s.label} className="grid gap-1 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-6">
                <dt className="text-sm text-muted">{s.label}</dt>
                <dd>{s.items}</dd>
              </div>
            ))}
          </dl>
        </Row>

        <div className="border-t border-line" />
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
