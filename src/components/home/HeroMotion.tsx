"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Scroll-linked exit for the hero: the greeting goes first, then the name lifts and dims. */
export default function HeroMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    if (!hero) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const scroll = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
      gsap.to("[data-hero-greet]", { yPercent: -40, opacity: 0, ease: "none", scrollTrigger: { ...scroll, end: "45% top" } });
      gsap.to("[data-hero-name]", { yPercent: -18, opacity: 0.15, ease: "none", scrollTrigger: scroll });
    });

    return () => mm.revert();
  }, []);

  return null;
}
