import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import FrameMotion from "@/components/FrameMotion";
import Story from "@/components/about/Story";
import { currently, fieldNotes, identity, inShort, pics, story } from "@/data/about";
import { photos } from "@/data/photos";

export const metadata: Metadata = {
  title: "About",
  description: "A computer science student who moved from design to full-stack to data engineering.",
};

const pick = (id: string) => {
  const p = photos.find((x) => x.id === id);
  if (!p) throw new Error(`About page: photo ${id} not found`);
  return p;
};

export default function Page() {
  // The resume link appears as soon as a PDF is placed at public/resume.pdf.
  const hasResume = fs.existsSync(path.join(process.cwd(), "public", "resume.pdf"));
  const hero = pick(pics.hero);
  const storyPics = pics.story.map((id) => {
    const p = pick(id);
    return { src: p.src, width: p.width, height: p.height, blur: p.blur, alt: p.title };
  });

  return (
    <>
      <FrameMotion />

      <section className="grid items-end gap-12 px-5 pb-16 pt-32 md:grid-cols-[minmax(0,1.7fr)_minmax(0,0.8fr)] md:gap-16 md:px-10 md:pb-28 md:pt-40">
        <div>
          <p data-reveal className="text-sm text-muted">
            About
          </p>
          <h1 data-reveal className="display mt-4 text-balance text-[clamp(2.8rem,7vw,8rem)] !leading-[1.0]">
            I used to design interfaces. Now I design the pipes underneath them.
          </h1>
          <p data-reveal className="mt-10 max-w-[44ch] text-base leading-relaxed text-muted md:mt-14 md:text-lg">
            {identity}
          </p>
        </div>
        <div data-reveal className="relative aspect-[2/3] w-full max-w-sm md:max-w-none">
          <Image
            src={hero.src}
            alt={hero.title}
            fill
            priority
            sizes="(min-width: 768px) 28vw, 80vw"
            placeholder="blur"
            blurDataURL={hero.blur}
            className="object-cover"
          />
        </div>
      </section>

      <section className="border-t border-line">
        <p data-reveal className="px-5 pt-8 text-sm text-muted md:px-10">
          How I got here
        </p>
        <Story paragraphs={story} pics={storyPics} />
      </section>

      <section className="flip px-5 py-20 md:px-10 md:py-32">
        <div className="flex items-baseline justify-between gap-6">
          <h2 data-reveal className="text-sm opacity-60">
            Currently
          </h2>
          <p data-reveal className="font-mono text-xs opacity-60">
            {currently.when}
          </p>
        </div>
        <dl className="mt-10 md:mt-16">
          {currently.lines.map((l) => (
            <div
              key={l.label}
              data-reveal
              className="grid gap-2 border-t border-current/20 py-7 md:grid-cols-[minmax(0,0.8fr)_minmax(0,2.4fr)] md:gap-16 md:py-10"
            >
              <dt className="text-sm opacity-60 md:pt-3">{l.label}</dt>
              <dd className="display text-[clamp(1.8rem,3.8vw,3.8rem)] !leading-[1.1]">{l.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-32">
        <h2 data-reveal className="text-sm text-muted">
          Field notes
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-12 md:mt-12 md:grid-cols-4 md:gap-x-5">
          {fieldNotes.map((n, i) => {
            const p = pick(pics.notes[i]);
            return (
              <li key={n.text} data-thumb className="group">
                <Link href={n.href ?? "/frame"} className="block">
                  <span className="relative block aspect-[3/4] overflow-hidden">
                    <Image
                      src={p.src}
                      alt={p.title}
                      fill
                      sizes="(min-width: 768px) 24vw, 48vw"
                      placeholder="blur"
                      blurDataURL={p.blur}
                      className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out)] group-hover:scale-[1.04]"
                    />
                  </span>
                  <span className="mt-4 block text-base leading-snug md:text-lg">{n.text}</span>
                  <span className="link-line mt-3 inline-block pb-0.5 text-sm">{n.cta}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="border-t border-line px-5 py-16 md:px-10 md:py-28">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
          <h2 data-reveal className="text-sm text-muted">
            In short
          </h2>
          <div>
            <ul>
              {inShort.map((t) => (
                <li key={t} data-reveal className="border-b border-line py-5 text-lg leading-snug first:pt-0 md:text-2xl">
                  {t}
                </li>
              ))}
            </ul>
            <p data-reveal className="mt-10 flex flex-wrap gap-x-10 gap-y-3 text-base">
              {hasResume && (
                <a href="/resume.pdf" className="link-line pb-0.5" download>
                  Full resume (PDF)
                </a>
              )}
              <Link href="/build" className="link-line pb-0.5">
                What I have built
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-28 pt-4 md:px-10 md:pb-44">
        <p data-reveal className="max-w-[60ch] text-sm leading-relaxed text-muted">
          Set in Instrument Serif and Geist. Built with Next.js, GSAP and Lenis. Photographs are mine.
        </p>
      </section>
    </>
  );
}
