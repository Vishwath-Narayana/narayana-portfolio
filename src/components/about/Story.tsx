"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Pic = { src: string; alt: string };

/**
 * Large paragraphs that light up word by word as you scroll, beside a photograph that changes with each one.
 * On small screens each photo sits above its paragraph instead.
 */
export default function Story({ paragraphs, pics }: { paragraphs: string[]; pics: Pic[] | null }) {
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
            scrollTrigger: { trigger: p, start: "top 78%", end: "bottom 52%", scrub: true },
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
    el.querySelectorAll("[data-para]").forEach((p) => io.observe(p));

    return () => {
      io.disconnect();
      mm.revert();
    };
  }, []);

  return (
    <div
      ref={root}
      className={`grid px-5 py-16 md:gap-16 md:px-10 md:py-28 ${pics ? "md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]" : "md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]"}`}
    >
      {pics && (
        <div className="hidden md:block">
          <div className="sticky top-28 h-[72svh] max-h-[46rem]">
            {pics.map((p, i) => (
              <div
                key={p.src}
                className="absolute inset-0 transition-opacity duration-[900ms] [transition-timing-function:var(--ease-out)]"
                style={{ opacity: active === i ? 1 : 0 }}
              >
                <Image src={p.src} alt={p.alt} fill sizes="30vw" className="object-contain object-left" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={`space-y-24 md:space-y-[34svh] md:py-[8svh] ${pics ? "" : "md:col-start-2"}`}>
        {paragraphs.map((t, i) => (
          <div key={t}>
            {pics && (
              <div className="relative mb-8 aspect-[4/3] md:hidden">
                <Image src={pics[i].src} alt={pics[i].alt} fill sizes="100vw" className="object-cover" />
              </div>
            )}
            <p
              data-para
              data-i={i}
              className="display max-w-[22ch] text-[clamp(1.9rem,3.6vw,3.6rem)] !leading-[1.12] md:max-w-none"
            >
              {t.split(" ").map((w, j) => (
                <span key={j} data-w className="inline-block pr-[0.28em]">
                  {w}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
