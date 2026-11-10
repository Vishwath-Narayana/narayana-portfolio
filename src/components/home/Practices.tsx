"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TransitionLink } from "../Transition";

export type PracticePhoto = { id: string; src: string; blur: string; title: string };
export type PracticePost = { slug: string; title: string; date: string; tag: string };

type Props = {
  projects: string[];
  photos: PracticePhoto[];
  photoCount: number;
  posts: PracticePost[];
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The three things I do, one screen each. On wide screens the scene stays put while you
 * scroll and each practice takes its turn, so the three sentences above become three
 * chapters. On phones the chapters simply stack.
 *
 * Nothing is pinned with GSAP: the stage is CSS sticky, and ScrollTrigger only reports
 * progress, so React keeps sole ownership of the DOM.
 */
export default function Practices({ projects, photos, photoCount, posts }: Props) {
  const root = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // Below md the chapters stack, so every chapter counts as "up".
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      setDesktop(true);
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setActive(Math.min(2, Math.floor(self.progress * 3)));
          if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
        },
      });
      return () => {
        st.kill();
        setDesktop(false);
      };
    });

    return () => mm.revert();
  }, []);

  const chapters = [
    {
      key: "build",
      href: "/build",
      title: "Build",
      line: "I move data from raw to useful.",
      text: "Pipelines on AWS that take raw files to tables people can query, and the web products that sit on top of them.",
      count: `${projects.length} projects`,
      cta: "See the work",
      visual: <PipelineVisual projects={projects} />,
    },
    {
      key: "frame",
      href: "/frame",
      title: "Frame",
      line: "I photograph what light does to ordinary places.",
      text: "Skies before dark, rails at first light, small things up close. Kept in series, with the settings each was taken at.",
      count: `${photoCount} photographs`,
      cta: "Open the roll",
      visual: <PhotoVisual photos={photos} on={!desktop || active === 1} />,
    },
    {
      key: "write",
      href: "/write",
      title: "Write",
      line: "I write down what I notice before I forget it.",
      text: "Short notes on technology, the night sky and the places I want to see.",
      count: `${posts.length} notes`,
      cta: "Read the notes",
      visual: <NotesVisual posts={posts} />,
    },
  ];

  return (
    <section ref={root} aria-label="What I do" className="relative border-t border-line md:h-[330svh]">
      <div className="md:sticky md:top-0 md:flex md:h-svh md:flex-col md:overflow-hidden">
        {/* Stage header: what this is, and how far through it you are. */}
        <div className="flex items-center justify-between gap-6 px-5 pt-16 md:px-10 md:pt-28">
          <p className="font-mono text-xs text-muted md:text-sm">What I do</p>
          <div className="hidden items-center gap-4 font-mono text-xs md:flex md:text-sm">
            {chapters.map((c, i) => (
              <span
                key={c.key}
                className={`transition-colors duration-500 ${active === i ? "text-fg" : "text-muted"}`}
              >
                {pad(i + 1)} {c.title}
              </span>
            ))}
          </div>
        </div>
        <div aria-hidden className="mx-5 mt-4 hidden h-px bg-line md:mx-10 md:block">
          <div ref={bar} className="h-px origin-left bg-fg" style={{ transform: "scaleX(0)" }} />
        </div>

        <div className="relative md:flex-1">
          {chapters.map((c, i) => {
            const on = active === i;
            return (
              <article
                key={c.key}
                className={`grid gap-10 px-5 py-16 md:absolute md:inset-0 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:items-center md:gap-16 md:px-10 md:py-10 ${
                  i > 0 ? "border-t border-line md:border-0" : ""
                } ${on ? "md:pointer-events-auto" : "md:pointer-events-none"}`}
              >
                <div>
                  <p
                    className={`font-mono text-xs text-muted transition-all duration-700 [transition-timing-function:var(--ease-out)] md:text-sm ${
                      on ? "md:translate-y-0 md:opacity-100" : "md:translate-y-4 md:opacity-0"
                    }`}
                  >
                    {pad(i + 1)} &mdash; {c.count}
                  </p>
                  {/* The title rises out of a mask when its chapter comes up. */}
                  <h2 className="mt-3 overflow-hidden pb-[0.08em]">
                    <span
                      className={`display block text-[clamp(5rem,15vw,15rem)] transition-transform duration-[1.1s] [transition-timing-function:var(--ease-out)] ${
                        on ? "md:translate-y-0" : i < active ? "md:-translate-y-[105%]" : "md:translate-y-[105%]"
                      }`}
                    >
                      {c.title}
                    </span>
                  </h2>
                  <div
                    className={`transition-all delay-150 duration-700 [transition-timing-function:var(--ease-out)] ${
                      on ? "md:translate-y-0 md:opacity-100" : "md:translate-y-6 md:opacity-0"
                    }`}
                  >
                    <p className="display mt-6 max-w-[20ch] text-[clamp(1.6rem,2.4vw,2.4rem)] !leading-[1.1]">
                      {c.line}
                    </p>
                    <p className="mt-4 max-w-[44ch] text-base text-muted md:text-lg">{c.text}</p>
                    <TransitionLink
                      href={c.href}
                      tabIndex={on ? undefined : -1}
                      className="group mt-8 inline-flex items-center gap-3 border-b border-fg pb-1 text-base md:text-lg"
                    >
                      {c.cta}
                      <span
                        aria-hidden
                        className="transition-transform duration-500 [transition-timing-function:var(--ease-out)] group-hover:translate-x-1.5"
                      >
                        &rarr;
                      </span>
                    </TransitionLink>
                  </div>
                </div>

                <div
                  className={`transition-all delay-100 duration-[900ms] [transition-timing-function:var(--ease-out)] ${
                    on ? "md:translate-y-0 md:opacity-100" : i < active ? "md:-translate-y-10 md:opacity-0" : "md:translate-y-10 md:opacity-0"
                  }`}
                >
                  {c.visual}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Raw files falling through the layers of the lake, one packet at a time. */
function PipelineVisual({ projects }: { projects: string[] }) {
  const stages = [
    ["Raw", "Monthly trip files land in S3"],
    ["Curated", "Cleaned and validated in PySpark"],
    ["Aggregated", "Rolled up, ready for analysis"],
    ["Athena", "Queried in plain SQL"],
  ];
  return (
    <div className="border border-line p-6 md:p-8">
      <div className="flex items-baseline justify-between font-mono text-xs text-muted">
        <span>pipeline</span>
        <span>NYC Taxi Data Lake</span>
      </div>
      <div className="relative mt-8 pl-8">
        <div aria-hidden className="absolute bottom-3 left-[3px] top-3 w-px bg-line" />
        <span aria-hidden className="flow-drop" />
        <ol className="space-y-7">
          {stages.map(([name, note], i) => (
            <li key={name} className="relative">
              <span aria-hidden className="absolute -left-8 top-[0.45rem] size-[7px] rounded-full border border-fg bg-bg" />
              <p className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-muted">{pad(i + 1)}</span>
                <span className="display text-[clamp(1.6rem,2.2vw,2.2rem)] leading-none">{name}</span>
              </p>
              <p className="mt-1 text-sm text-muted">{note}</p>
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-8 border-t border-line pt-4 font-mono text-xs text-muted">{projects.join("  /  ")}</p>
    </div>
  );
}

/** A few prints from the roll, fanned out when their chapter is up. */
function PhotoVisual({ photos, on }: { photos: PracticePhoto[]; on: boolean }) {
  const spread = [
    { r: -6, x: -20, y: 7 },
    { r: 5, x: 18, y: -4 },
    { r: -1.5, x: 0, y: 0 },
  ];
  return (
    <div className="relative mx-auto aspect-[4/5] w-[min(62vw,22rem)] md:w-[min(26vw,24rem)]">
      {photos.slice(0, 3).map((p, i) => {
        const s = spread[i];
        return (
          <div
            key={p.id}
            className="absolute inset-0 bg-bg p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-line transition-transform duration-[1.2s] [transition-timing-function:var(--ease-out)]"
            style={{
              transform: on
                ? `translate(${s.x}%, ${s.y}%) rotate(${s.r}deg)`
                : `translate(0, 0) rotate(${s.r / 3}deg)`,
              zIndex: i,
            }}
          >
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={p.src}
                alt={i === 2 ? p.title : ""}
                fill
                sizes="(min-width: 768px) 28vw, 78vw"
                placeholder="blur"
                blurDataURL={p.blur}
                className="object-cover"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** The latest notes, as an index card. */
function NotesVisual({ posts }: { posts: PracticePost[] }) {
  return (
    <div className="border border-line">
      <div className="flex items-baseline justify-between px-6 py-4 font-mono text-xs text-muted md:px-8">
        <span>latest</span>
        <span>{posts.length} notes</span>
      </div>
      <ul>
        {posts.slice(0, 4).map((p) => (
          <li key={p.slug} className="border-t border-line">
            <TransitionLink
              href={`/write/${p.slug}`}
              className="group flex items-baseline justify-between gap-6 px-6 py-5 md:px-8"
            >
              <span className="display text-[clamp(1.5rem,2vw,2rem)] leading-tight transition-transform duration-500 [transition-timing-function:var(--ease-out)] group-hover:translate-x-1.5">
                {p.title}
              </span>
              <span className="shrink-0 font-mono text-xs text-muted">{p.tag}</span>
            </TransitionLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
