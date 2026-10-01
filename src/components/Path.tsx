"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const chapters = [
  {
    when: "First",
    title: "Design",
    body: "I started in Figma, drawing wireframes and prototypes and learning why one screen feels right and another does not. At Poditivity I led UI and UX work and shot the content too.",
  },
  {
    when: "Next",
    title: "Full-stack",
    body: "Then I built what I had drawn. FileDrive is a team file platform with role-based access. The chat app is real time. Both run on React, Node and Socket.io.",
  },
  {
    when: "Now",
    title: "Data",
    body: "Now I work on what sits underneath. A data lake for NYC taxi trips on AWS takes each month from raw to curated to aggregated, using S3, Glue, PySpark and Athena.",
  },
];

export default function Path() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const rootEl = root.current;
    if (!rootEl) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const rules = rootEl.querySelectorAll("[data-rule]");
      const cols = rootEl.querySelectorAll("[data-col]");
      gsap.set(rules, { scaleX: 0, transformOrigin: "left" });
      gsap.set(cols, { opacity: 0, y: 24 });

      ScrollTrigger.batch(cols, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.14 }),
      });
      ScrollTrigger.batch(rules, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { scaleX: 1, duration: 1.4, ease: "expo.out", stagger: 0.14 }),
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="px-5 py-28 md:px-10 md:py-48">
      <h2 className="display max-w-[12em] text-balance text-[clamp(2.6rem,6vw,6.2rem)]">
        Design, then code, then data.
      </h2>

      <div className="mt-20 grid gap-14 md:mt-32 md:grid-cols-3 md:gap-10">
        {chapters.map((c) => (
          <article key={c.title}>
            <div data-rule className="h-px w-full bg-fg" />
            <div data-col className="pt-5">
              <p className="text-sm text-muted">{c.when}</p>
              <h3 className="display mt-10 text-[clamp(2.4rem,4vw,4.2rem)] md:mt-16">{c.title}</h3>
              <p className="mt-5 max-w-[36ch] text-base text-muted md:text-[1.05rem]">{c.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
