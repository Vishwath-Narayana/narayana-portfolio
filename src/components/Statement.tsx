"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TEXT =
  "I move data from raw to useful. I photograph what light does to ordinary places. I write down what I notice before I forget it.";

/** Opposite-theme panel. The sentence is read in by scrolling: words fill in one by one. */
export default function Statement() {
  const root = useRef<HTMLElement>(null);
  const body = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const rootEl = root.current;
    const bodyEl = body.current;
    if (!rootEl || !bodyEl) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const words = bodyEl.querySelectorAll("[data-w]");
      gsap.set(words, { opacity: 0.14 });
      gsap.to(words, {
        opacity: 1,
        ease: "none",
        stagger: 0.18,
        scrollTrigger: {
          trigger: bodyEl,
          start: "top 78%",
          end: "bottom 48%",
          scrub: 0.6,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="flip px-5 py-32 md:px-10 md:py-56">
      <p ref={body} className="display max-w-[17em] text-[clamp(2.4rem,6.6vw,7rem)] !leading-[1.02]">
        <span className="sr-only">{TEXT}</span>
        <span aria-hidden>
          {TEXT.split(" ").map((word, i) => (
            <span key={i} data-w>
              {word}{" "}
            </span>
          ))}
        </span>
      </p>
    </section>
  );
}
