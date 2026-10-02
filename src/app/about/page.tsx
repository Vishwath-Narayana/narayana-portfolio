import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import FrameMotion from "@/components/FrameMotion";
import { certifications, education, experience, intro, leadership } from "@/data/about";

export const metadata: Metadata = {
  title: "About",
  description: "A computer science student who moved from design to full-stack to data engineering.",
};

/** Section layout: a quiet label on the left, the content on the right. */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-6 border-t border-line py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] md:gap-16 md:py-14">
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
      <section className="px-5 pb-24 pt-32 md:px-10 md:pb-40 md:pt-44">
        <p data-reveal className="text-sm text-muted">
          About
        </p>
        <h1 data-reveal className="display mt-4 max-w-[14em] text-balance text-[clamp(2.4rem,5.4vw,5.6rem)] !leading-[1.04]">
          I start with the person using the thing, then build down to the data.
        </h1>

        <div className="mt-20 md:mt-32">
          <Row label="Who I am">
            <div className="max-w-[54ch] space-y-5 text-base leading-relaxed md:text-lg">
              {intro.map((t) => (
                <p key={t}>{t}</p>
              ))}
              {hasResume && (
                <p>
                  <a href="/resume.pdf" className="link-line pb-0.5" download>
                    Download my resume
                  </a>
                </p>
              )}
            </div>
          </Row>

          <Row label="Education">
            <p className="text-lg md:text-xl">{education.school}</p>
            <p className="mt-1 text-muted">{education.degree}</p>
            <p className="mt-3 font-mono text-sm text-muted">
              {education.period}, {education.note}
            </p>
          </Row>

          <Row label="Experience">
            <p className="text-lg md:text-xl">
              {experience.role}, {experience.org}
            </p>
            <p className="mt-3 font-mono text-sm text-muted">
              {experience.place}, {experience.period}
            </p>
            <ul className="mt-6 max-w-[54ch] space-y-3 text-base leading-relaxed">
              {experience.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </Row>

          <Row label="Leadership">
            <ul className="space-y-8">
              {leadership.map((r) => (
                <li key={r.role + r.org + (r.when ?? "")}>
                  <p className="text-lg md:text-xl">{r.role}</p>
                  <p className="mt-1 text-muted">
                    {r.org}
                    {r.when && `, ${r.when}`}
                  </p>
                  {r.note && <p className="mt-2 max-w-[54ch] text-base">{r.note}</p>}
                </li>
              ))}
            </ul>
          </Row>

          <Row label="Certifications">
            <ul className="max-w-[54ch] space-y-4 text-base leading-relaxed">
              {certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Row>
        </div>
      </section>
    </>
  );
}
