"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Crop from "./Crop";

type Pic = { src: string; alt: string };
type Chapter = { chapter: string; text: string };

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Three chapters that light up word by word as you scroll, beside a photograph that changes
 * with each one. On small screens each photo sits above its chapter instead.
 */
export default function Story({ chapters, pics }: { chapters: Chapter[]; pics: Pic[] | null }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      el.querySelectorAll<HTMLElement>("[data-para]").forEach((p) => {
        const words = p.querySelectorAll<HTMLElement>("[data-w]");
        gsap.fromTo(
          words,
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.08,
            scrollTrigger: { trigger: p, start: "top 80%", end: "bottom 55%", scrub: true },
          },
        );
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number(e.target.getAttribute("data-i")));
      },
      { rootMargin: "-40% 0px -45% 0px" },
    );
    el.querySelectorAll("[data-chapter]").forEach((p) => io.observe(p));

    return () => {
      io.disconnect();
      mm.revert();
    };
  }, []);

  return (
    <div
      ref={root}
      className={`grid px-5 py-16 md:gap-20 md:px-10 md:py-24 ${pics ? "md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]" : "md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]"}`}
    >
      {pics && (
        <div className="hidden md:block">
          <div className="sticky top-28">
            <Crop>
              <div className="relative aspect-[3/4] overflow-hidden bg-line">
                {pics.map((p, i) => (
                  <div
                    key={p.src}
                    className="absolute inset-0 transition-[opacity,scale] duration-[1.1s] [transition-timing-function:var(--ease-out)]"
                    style={{ opacity: active === i ? 1 : 0, scale: active === i ? "1" : "1.06" }}
                  >
                    <Image src={p.src} alt={p.alt} fill sizes="34vw" className="object-cover" />
                  </div>
                ))}
              </div>
            </Crop>
            <div className="mt-5 flex justify-between font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted">
              <span>
                fig. {pad(active + 2)} &middot; {chapters[active]?.chapter}
              </span>
              <span>
                {pad(active + 1)} / {pad(chapters.length)}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className={`space-y-24 md:space-y-[22svh] md:py-[6svh] ${pics ? "" : "md:col-start-2"}`}>
        {chapters.map((c, i) => (
          <div key={c.chapter} data-chapter data-i={i}>
            {pics && (
              <Crop className="mb-10 md:hidden">
                <div className="relative aspect-[4/5]">
                  <Image src={pics[i].src} alt={pics[i].alt} fill sizes="100vw" className="object-cover" />
                </div>
              </Crop>
            )}
            <p className="flex items-baseline gap-4 font-mono text-xs uppercase tracking-[0.1em] text-muted">
              <span className="text-fg">{pad(i + 1)}</span>
              <span className="h-px w-10 self-center bg-line" aria-hidden />
              {c.chapter}
            </p>
            <p data-para className="display mt-6 max-w-[22ch] text-[clamp(1.9rem,3.4vw,3.4rem)] !leading-[1.12] md:max-w-none">
              <span className="sr-only">{c.text}</span>
              <span aria-hidden>
                {c.text.split(" ").map((w, j) => (
                  <span key={j} data-w className="inline-block pr-[0.28em]">
                    {w}
                  </span>
                ))}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
