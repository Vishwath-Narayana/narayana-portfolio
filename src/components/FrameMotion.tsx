"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Fades in the intro text and staggers the contact-sheet thumbnails as they enter.
 */
export default function FrameMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      gsap.set(reveals, { opacity: 0, y: 28 });
      ScrollTrigger.batch(reveals, {
        start: "top 90%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1.2, ease: "expo.out", stagger: 0.1 }),
      });

      const rules = gsap.utils.toArray<HTMLElement>("[data-draw]");
      gsap.set(rules, { scaleX: 0, transformOrigin: "left" });
      ScrollTrigger.batch(rules, {
        start: "top 94%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { scaleX: 1, duration: 1.5, ease: "expo.out", stagger: 0.12 }),
      });

      const thumbs = gsap.utils.toArray<HTMLElement>("[data-thumb]");
      gsap.set(thumbs, { opacity: 0, y: 12 });
      ScrollTrigger.batch(thumbs, {
        start: "top 95%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.035, clearProps: "transform,opacity" }),
      });
    });

    return () => mm.revert();
  }, []);

  return null;
}
