"use client";

import { useEffect, useRef, useState } from "react";
import type { Year } from "@/data/about";

/**
 * Left: one giant year that rolls as you scroll. Right: what happened that year.
 * On small screens the year sits above each entry instead.
 */
export default function Timeline({ years }: { years: Year[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number(e.target.getAttribute("data-i")));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-16">
      <div className="hidden md:block" aria-hidden="true">
        <div className="sticky top-24 h-[1em] overflow-hidden text-[clamp(6rem,15vw,15rem)] leading-none">
          <div
            className="transition-transform duration-[900ms] [transition-timing-function:var(--ease-out)] motion-reduce:transition-none"
            style={{ transform: `translateY(-${(active * 100) / years.length}%)` }}
          >
            {years.map((y) => (
              <div key={y.year} className="display h-[1em] leading-none">
                {y.year}
              </div>
            ))}
          </div>
        </div>
      </div>

      <ol>
        {years.map((y, i) => (
          <li
            key={y.year}
            data-i={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="flex min-h-[52svh] flex-col justify-center border-t border-line py-12 md:min-h-[70svh] md:border-t-0"
          >
            <p className="display text-6xl md:hidden">{y.year}</p>
            <h3 className="mt-4 text-xl md:mt-0 md:text-2xl">{y.title}</h3>
            <div className="mt-5 max-w-[48ch] space-y-4 text-base leading-relaxed text-muted md:text-lg">
              {y.lines.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
