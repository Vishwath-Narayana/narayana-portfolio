"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Crop from "./Crop";

/** The portrait in crop marks. As the page scrolls, the picture drifts slowly inside its frame. */
export default function Portrait({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const f = frame.current;
    const i = inner.current;
    if (!f || !i) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        i,
        { yPercent: -4, scale: 1.08 },
        { yPercent: 4, scale: 1.08, ease: "none", scrollTrigger: { trigger: f, start: "top bottom", end: "bottom top", scrub: true } },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <figure>
      <Crop>
        <div ref={frame} className="relative aspect-[4/5] w-full overflow-hidden bg-line">
          <div ref={inner} className="absolute inset-0">
            <Image src={src} alt={alt} fill priority sizes="(min-width: 768px) 34vw, 90vw" className="object-cover object-top" />
          </div>
        </div>
      </Crop>
      <figcaption className="mt-5 flex justify-between font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted">
        <span>fig. 01</span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}
