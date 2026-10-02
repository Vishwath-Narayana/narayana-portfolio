"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Each photo is unveiled like a print coming up in the developer: the frame wipes open from the
 * top while the picture settles from a slight zoom. It then drifts a little against the scroll.
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

      gsap.utils.toArray<HTMLElement>("[data-plate]").forEach((plate) => {
        const mask = plate.querySelector<HTMLElement>("[data-mask]");
        const img = plate.querySelector<HTMLElement>("[data-img]");
        const caption = plate.querySelector<HTMLElement>("[data-caption]");
        if (!mask || !img) return;

        gsap.set(mask, { clipPath: "inset(0% 0% 100% 0%)" });
        gsap.set(img, { scale: 1.35 });
        if (caption) gsap.set(caption, { opacity: 0, y: 14 });

        gsap
          .timeline({ scrollTrigger: { trigger: plate, start: "top 82%", once: true } })
          .to(mask, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" }, 0)
          .to(img, { scale: 1.12, duration: 2.2, ease: "expo.out" }, 0)
          .to(caption, { opacity: 1, y: 0, duration: 1, ease: "expo.out" }, 0.9);

        gsap.fromTo(
          img,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: { trigger: plate, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });

    return () => mm.revert();
  }, []);

  return null;
}
