"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SENTENCES = [
  "I move data from raw to useful.",
  "I photograph what light does to ordinary places.",
  "I write down what I notice before I forget it.",
];

/**
 * The three sentences, read in by scrolling: words fill in one by one. Each carries the
 * number of the chapter that follows, so the statement doubles as a table of contents.
 */
export default function Statement() {
  const body = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const bodyEl = body.current;
    if (!bodyEl) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const words = bodyEl.querySelectorAll("[data-w]");
      gsap.set(words, { opacity: 0.14 });
      gsap.to(words, {
        opacity: 1,
        ease: "none",
        stagger: 0.18,
        scrollTrigger: { trigger: bodyEl, start: "top 80%", end: "bottom 55%", scrub: 0.6 },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="px-5 py-32 md:px-10 md:py-48">
      <p className="font-mono text-xs text-muted md:text-sm">In short</p>
      <p ref={body} className="display mt-8 max-w-[17em] text-[clamp(2.4rem,6.6vw,7rem)] !leading-[1.02] md:mt-12">
        <span className="sr-only">{SENTENCES.join(" ")}</span>
        <span aria-hidden>
          {SENTENCES.map((s, si) => (
            <span key={si}>
              {s.split(" ").map((word, i) => (
                <span key={i} data-w>
                  {word}
                  {i < s.split(" ").length - 1 ? " " : ""}
                </span>
              ))}
              <sup data-w className="ml-[0.15em] align-[1.6em] font-mono text-[0.14em] tracking-normal">
                {String(si + 1).padStart(2, "0")}
              </sup>{" "}
            </span>
          ))}
        </span>
      </p>
    </section>
  );
}
