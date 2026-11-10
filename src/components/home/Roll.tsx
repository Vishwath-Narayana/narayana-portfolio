"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TransitionLink } from "../Transition";

export type RollFrame = {
  id: string;
  src: string;
  blur: string;
  title: string;
  meta: string;
};

/**
 * A strip of the roll on the home page. On wide screens the section pins and the strip
 * slides sideways as you scroll, each picture drifting inside its frame. On phones it is
 * a plain swipeable row.
 */
export default function Roll({ frames, total }: { frames: RollFrame[]; total: number }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const rootEl = root.current;
    const trackEl = track.current;
    if (!rootEl || !trackEl) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => Math.max(0, trackEl.scrollWidth - window.innerWidth + 80);
      const scrollTrigger = {
        trigger: rootEl,
        start: "top top",
        end: () => `+=${distance()}`,
        scrub: 0.6,
        invalidateOnRefresh: true,
      };

      gsap.to(trackEl, { x: () => -distance(), ease: "none", scrollTrigger: { ...scrollTrigger, pin: true } });

      trackEl.querySelectorAll<HTMLElement>("[data-drift]").forEach((img) => {
        gsap.fromTo(img, { xPercent: -6 }, { xPercent: 6, ease: "none", scrollTrigger: { ...scrollTrigger, scrub: true } });
      });

      const bar = rootEl.querySelector<HTMLElement>("[data-progress]");
      if (bar) gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { ...scrollTrigger, scrub: true } });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      aria-label="Selected photographs"
      className="relative flex flex-col justify-center overflow-hidden py-24 md:h-svh md:py-0"
    >
      <div className="flex items-end justify-between gap-6 px-5 md:px-10">
        <div>
          <p className="font-mono text-xs text-muted md:text-sm">From the roll</p>
          <h2 className="display mt-3 text-[clamp(2.4rem,5vw,5.2rem)]">Ordinary light.</h2>
        </div>
        <TransitionLink href="/frame" className="link-line shrink-0 pb-0.5 text-sm md:text-base">
          All {total} frames
        </TransitionLink>
      </div>

      <ul
        ref={track}
        className="mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mt-14 md:snap-none md:gap-5 md:overflow-visible md:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {frames.map((f, i) => (
          <li key={f.id} className="w-[68vw] shrink-0 snap-start sm:w-[42vw] md:w-[clamp(15rem,24vw,25rem)]">
            <TransitionLink href={`/frame/${f.id}`} className="group block" aria-label={`Open ${f.title}`}>
              <div className="relative aspect-[3/4] overflow-hidden bg-line">
                <div data-drift className="absolute inset-y-0 -inset-x-[8%]">
                  <Image
                    src={f.src}
                    alt={f.title}
                    fill
                    sizes="(min-width: 768px) 28vw, 70vw"
                    placeholder="blur"
                    blurDataURL={f.blur}
                    className="object-cover transition-transform duration-[1.2s] [transition-timing-function:var(--ease-out)] group-hover:scale-[1.05]"
                  />
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-4 text-sm">
                <span className="truncate">
                  <span className="mr-3 font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  {f.title}
                </span>
                <span className="hidden shrink-0 font-mono text-xs text-muted lg:inline">{f.meta}</span>
              </div>
            </TransitionLink>
          </li>
        ))}
      </ul>

      <div aria-hidden className="mx-5 mt-10 hidden h-px bg-line md:mx-10 md:block">
        <div data-progress className="h-px origin-left bg-fg" />
      </div>
    </section>
  );
}
