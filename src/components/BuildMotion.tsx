"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll motion for the Build page, driven by data attributes so the sections stay server-rendered.
 *   data-reveal   fades up once
 *   data-draw     a rule that draws left to right once
 *   data-line     a vertical line that grows with scroll, inside the nearest data-line-root
 *   data-flow     a row of nodes joined by a line that draws, then the nodes light up
 */
export default function BuildMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      gsap.set(reveals, { opacity: 0, y: 28 });
      ScrollTrigger.batch(reveals, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 1.2, ease: "expo.out", stagger: 0.1 }),
      });

      const rules = gsap.utils.toArray<HTMLElement>("[data-draw]");
      gsap.set(rules, { scaleX: 0, transformOrigin: "left" });
      ScrollTrigger.batch(rules, {
        start: "top 94%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { scaleX: 1, duration: 1.5, ease: "expo.out", stagger: 0.12 }),
      });

      gsap.utils.toArray<HTMLElement>("[data-line]").forEach((line) => {
        const root = line.closest<HTMLElement>("[data-line-root]") ?? line.parentElement;
        gsap.fromTo(
          line,
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top 70%", end: "bottom 60%", scrub: 0.6 },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-flow]").forEach((flow) => {
        const track = flow.querySelector<HTMLElement>("[data-flow-track]");
        const nodes = flow.querySelectorAll<HTMLElement>("[data-flow-node]");
        if (!track) return;
        gsap.set(track, { scaleX: 0, transformOrigin: "left" });
        gsap.set(nodes, { opacity: 0.25 });
        gsap
          .timeline({ scrollTrigger: { trigger: flow, start: "top 88%", once: true } })
          .to(track, { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, 0)
          .to(nodes, { opacity: 1, duration: 0.6, ease: "power1.out", stagger: 1.6 / Math.max(nodes.length, 1) }, 0.1);
      });
    });

    return () => mm.revert();
  }, []);

  return null;
}
