import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import FrameMotion from "@/components/FrameMotion";
import Story from "@/components/about/Story";
import { aboutPics, currently, identity, inShort, someday, story } from "@/data/about";

export const metadata: Metadata = {
  title: "About",
  description: "A computer science student who moved from design to full-stack to data engineering.",
};

/** Reads a picture from public/about. Returns null when the file is not there, so the page works without it. */
function load(file: string, alt: string) {
  const abs = path.join(process.cwd(), "public", "about", file);
  if (!fs.existsSync(abs)) return null;
  return { src: `/about/${file}`, alt };
}

export default function Page() {
  // The resume link appears as soon as a PDF is placed at public/resume.pdf.
  const hasResume = fs.existsSync(path.join(process.cwd(), "public", "resume.pdf"));
  const portrait = load(aboutPics.portrait.file, aboutPics.portrait.alt);
  const storyPics = aboutPics.story.map((s) => load(s.file, s.alt));
  const hasStoryPics = storyPics.every(Boolean);

  return (
    <>
      <FrameMotion />

      <section
        className={`grid items-end gap-12 px-5 pb-16 pt-32 md:gap-16 md:px-10 md:pb-28 md:pt-40 ${
          portrait ? "md:grid-cols-[minmax(0,1.7fr)_minmax(0,0.8fr)]" : ""
        }`}
      >
        <div>
          <p data-reveal className="text-sm text-muted">
            About
          </p>
          <h1 data-reveal className="display mt-4 max-w-[14em] text-balance text-[clamp(2.8rem,7vw,8rem)] !leading-[1.0]">
            I used to design interfaces. Now I design the pipes underneath them.
          </h1>
          <p data-reveal className="mt-10 max-w-[44ch] text-base leading-relaxed text-muted md:mt-14 md:text-lg">
            {identity}
          </p>
        </div>
        {portrait && (
          <div data-reveal className="relative aspect-[2/3] w-full max-w-sm md:max-w-none">
            <Image src={portrait.src} alt={portrait.alt} fill priority sizes="(min-width: 768px) 28vw, 80vw" className="object-cover" />
          </div>
        )}
      </section>

      <section className="border-t border-line">
        <p data-reveal className="px-5 pt-8 text-sm text-muted md:px-10">
          How I got here
        </p>
        <Story paragraphs={story} pics={hasStoryPics ? (storyPics as { src: string; alt: string }[]) : null} />
      </section>

      <section className="flip px-5 py-16 md:px-10 md:py-24">
        <div className="flex items-baseline justify-between gap-6">
          <h2 data-reveal className="text-sm opacity-60">
            Currently
          </h2>
          <p data-reveal className="font-mono text-xs opacity-60">
            {currently.when}
          </p>
        </div>
        <dl className="mt-8 md:mt-12">
          {currently.lines.map((l) => (
            <div
              key={l.label}
              data-reveal
              className="grid gap-2 border-t border-current/20 py-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,2.4fr)] md:gap-16 md:py-8"
            >
              <dt className="text-sm opacity-60 md:pt-3">{l.label}</dt>
              <dd className="display max-w-[22em] text-[clamp(1.8rem,3.4vw,3.4rem)] !leading-[1.1]">{l.text}</dd>
            </div>
          ))}
          <div
            data-reveal
            className="grid gap-2 border-t border-current/20 py-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,2.4fr)] md:gap-16 md:py-8"
          >
            <dt className="text-sm opacity-60 md:pt-3">Someday</dt>
            <dd className="display text-[clamp(1.8rem,3.4vw,3.4rem)] !leading-[1.1]">
              {someday.map((x, i) => (
                <span key={x.text}>
                  <Link href={x.href} className="link-line">
                    {x.text}
                  </Link>
                  {i < someday.length - 1 ? ". " : "."}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-24">
        <dl>
          {inShort.map((r) => (
            <div
              key={r.label}
              data-reveal
              className="grid gap-2 border-t border-line py-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,2.4fr)] md:gap-16 md:py-8"
            >
              <dt className="text-sm text-muted md:pt-1">{r.label}</dt>
              <dd className="max-w-[40ch] text-lg leading-snug md:text-2xl">{r.text}</dd>
            </div>
          ))}
          <div
            data-reveal
            className="grid gap-2 border-y border-line py-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,2.4fr)] md:gap-16 md:py-8"
          >
            <dt className="text-sm text-muted">More</dt>
            <dd className="flex flex-wrap gap-x-10 gap-y-3 text-base md:text-lg">
              {hasResume && (
                <a href="/resume.pdf" className="link-line pb-0.5" download>
                  Full resume (PDF)
                </a>
              )}
              <Link href="/build" className="link-line pb-0.5">
                What I have built
              </Link>
            </dd>
          </div>
        </dl>
      </section>
    </>
  );
}
