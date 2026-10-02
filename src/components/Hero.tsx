"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Clock from "./Clock";

/**
 * The hero is the name and nothing else. It is set in a variable Didone, so the
 * strokes can swell from hairline to heavy. After a single sweep on load, the
 * weight follows the pointer like ink spreading under it. Touch screens get a
 * slow travelling swell instead.
 */

const WORDS = ["Vishwath", "Narayana"];

// Without per-letter kerning, close these pairs by hand (in em).
const KERN: Record<string, number> = {
  Vi: -0.045,
  wa: -0.025,
  ya: -0.02,
  Na: -0.01,
};

const BASE = 430; // resting weight
const SWELL = 400; // extra weight directly under the pointer
const MAX = 900;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const nameBlock = useRef<HTMLDivElement>(null);
  const name = useRef<HTMLHeadingElement>(null);
  const meta = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionEl = section.current;
    const nameBlockEl = nameBlock.current;
    const nameEl = name.current;
    const metaEl = meta.current;
    if (!sectionEl || !nameBlockEl || !nameEl || !metaEl) return;

    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none)").matches;

    const chars = Array.from(nameEl.querySelectorAll<HTMLElement>("[data-char]"));
    const wraps = nameEl.querySelectorAll<HTMLElement>("[data-wrap]");
    const words = nameEl.querySelectorAll<HTMLElement>("[data-word]");
    const weights = chars.map(() => (reduce ? 500 : BASE));
    chars.forEach((c, i) => {
      c.style.fontWeight = String(weights[i]);
    });

    let time = 0;
    let visible = true;
    let sigma = 140;
    const sweep = { value: reduce ? 1 : 0 };
    const pointer = { x: 0, y: 0, sx: 0, sy: 0, power: 0, target: 0 };

    const measure = () => {
      sigma = parseFloat(getComputedStyle(nameEl).fontSize) * 0.5;
    };
    measure();

    const tick = () => {
      if (!visible) return;
      const dt = Math.min(gsap.ticker.deltaRatio(60) / 60, 0.05);
      time += dt;

      const follow = 1 - Math.exp(-dt * 9);
      pointer.sx += (pointer.x - pointer.sx) * follow;
      pointer.sy += (pointer.y - pointer.sy) * follow;
      pointer.power += (pointer.target - pointer.power) * (1 - Math.exp(-dt * 4));

      // Read every position first, then write every weight: one layout per frame.
      const rects = chars.map((c) => c.getBoundingClientRect());
      const count = chars.length;
      const ease = 1 - Math.exp(-dt * 8);

      for (let i = 0; i < count; i++) {
        let target = BASE;

        // A slow swell travelling through the letters. Stronger where there is no pointer.
        const wave = 0.5 + 0.5 * Math.sin(time * (touch ? 0.9 : 0.8) - i * 0.5);
        target += (touch ? 240 : 55) * wave;

        // The one orchestrated moment: a heavy pass sweeping left to right once.
        if (sweep.value > 0 && sweep.value < 1) {
          const centre = sweep.value * (count + 6) - 3;
          const d = i - centre;
          target += 380 * Math.exp(-(d * d) / (2 * 1.6 * 1.6));
        }

        if (pointer.power > 0.002) {
          const r = rects[i];
          const dx = r.left + r.width / 2 - pointer.sx;
          const dy = (r.top + r.height / 2 - pointer.sy) * 0.7;
          target += SWELL * pointer.power * Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
        }

        weights[i] += (clamp(target, 400, MAX) - weights[i]) * ease;
      }

      for (let i = 0; i < count; i++) {
        chars[i].style.fontWeight = weights[i].toFixed(1);
      }
    };
    if (!reduce) gsap.ticker.add(tick);

    const visibility = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    visibility.observe(sectionEl);

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(sectionEl);

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (pointer.target === 0) {
        pointer.sx = pointer.x;
        pointer.sy = pointer.y;
      }
      pointer.target = 1;
    };
    const onLeave = () => {
      pointer.target = 0;
    };
    if (!reduce) {
      sectionEl.addEventListener("pointermove", onMove);
      sectionEl.addEventListener("pointerleave", onLeave);
    }

    const gsapCtx = gsap.context(() => {
      if (reduce) return;

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(
        words,
        { yPercent: 118, skewY: 5 },
        { yPercent: 0, skewY: 0, duration: 1.6, stagger: 0.14 },
        0.2,
      )
        .fromTo(metaEl, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1.2 }, 1.1)
        // Once the letters are in, let heavy strokes spread past the mask.
        .set(wraps, { overflow: "visible" }, 1.9)
        .to(sweep, { value: 1, duration: 2.6, ease: "power1.inOut" }, 1.5);

      gsap.to(nameBlockEl, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionEl);

    return () => {
      gsap.ticker.remove(tick);
      gsapCtx.revert();
      visibility.disconnect();
      resizeObserver.disconnect();
      sectionEl.removeEventListener("pointermove", onMove);
      sectionEl.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section ref={section} className="relative h-svh min-h-[620px] overflow-hidden">
      <div ref={nameBlock} className="absolute inset-x-0 bottom-0 px-5 pb-6 md:px-10 md:pb-9">
        <h1
          ref={name}
          aria-label="Vishwath Narayana"
          className="display font-living text-[min(19vw,31svh)] [font-synthesis:none]"
        >
          {WORDS.map((word, wi) => (
            <span
              key={word}
              data-wrap
              aria-hidden
              className={`block overflow-hidden pb-[0.18em] -mb-[0.18em] ${wi > 0 ? "md:pl-[6vw]" : ""}`}
            >
              <span data-word className="inline-block whitespace-nowrap will-change-transform">
                {[...word].map((ch, ci) => {
                  const kern = ci > 0 ? KERN[word[ci - 1] + ch] : undefined;
                  return (
                    <span
                      key={ci}
                      data-char
                      className="inline-block"
                      style={kern ? { marginLeft: `${kern}em` } : undefined}
                    >
                      {ch}
                    </span>
                  );
                })}
              </span>
            </span>
          ))}
        </h1>

        <div ref={meta} className="mt-6 flex items-end justify-between gap-6 md:mt-9">
          <p className="max-w-[26ch] text-base leading-snug md:max-w-none md:text-xl">
            Data engineer, photographer and writer.
          </p>
          <p className="shrink-0 text-right font-mono text-xs text-muted md:text-sm">
            <span className="hidden sm:inline">Warangal </span>
            <Clock />
          </p>
        </div>
      </div>
    </section>
  );
}
