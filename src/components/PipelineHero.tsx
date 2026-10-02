"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Clock from "./Clock";

/**
 * The hero is signal cleaning, drawn as one sheet of lines.
 * On the left the lines ripple together, loose and unsettled (raw).
 * They calm down in the middle (curated) and finish dead straight (aggregated).
 * The pointer pushes the sheet gently apart, like a hand moving through water.
 */

const STAGES = [
  { label: "raw", at: 0 },
  { label: "curated", at: 0.42 },
  { label: "aggregated", at: 0.72 },
];

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const smooth = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

function readForeground(): [number, number, number] {
  const value = getComputedStyle(document.documentElement).getPropertyValue("--fg").trim();
  // The CSS minifier may shorten #000000 to #000, so accept both forms.
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(value);
  if (!m) return [250, 250, 250];
  const hex = m[1].length === 3 ? [...m[1]].map((c) => c + c).join("") : m[1];
  const n = parseInt(hex, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export default function PipelineHero() {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const stages = useRef<HTMLDivElement>(null);
  const nameBlock = useRef<HTMLDivElement>(null);
  const name = useRef<HTMLHeadingElement>(null);
  const meta = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionEl = section.current;
    const canvasEl = canvas.current;
    const stagesEl = stages.current;
    const nameBlockEl = nameBlock.current;
    const nameEl = name.current;
    const metaEl = meta.current;
    if (!sectionEl || !canvasEl || !stagesEl || !nameBlockEl || !nameEl || !metaEl) return;

    const ctx2d = canvasEl.getContext("2d");
    if (!ctx2d) return;
    const ctx: CanvasRenderingContext2D = ctx2d;

    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let bandTop = 0;
    let bandHeight = 0;
    let lineCount = 0;
    let amp = 24;
    let alphas: number[] = [];
    let color = readForeground();
    let time = reduce ? 7 : 0;
    let visible = true;
    const intro = { value: reduce ? 1 : 0 };
    const mouse = { x: 0, y: 0, sx: 0, sy: 0, power: 0, target: 0 };

    const measure = () => {
      const rect = sectionEl.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasEl.width = Math.round(width * dpr);
      canvasEl.height = Math.round(height * dpr);
      canvasEl.style.width = `${width}px`;
      canvasEl.style.height = `${height}px`;

      const compact = width < 768;
      bandTop = compact ? 112 : 128;
      const bottom = nameBlockEl.offsetTop - (compact ? 28 : 56);
      bandHeight = Math.max(160, bottom - bandTop);

      stagesEl.style.top = `${bandTop}px`;
      stagesEl.style.height = `${bandHeight}px`;

      lineCount = compact ? 22 : 40;
      amp = clamp(bandHeight * 0.085, 16, 38);
      // A little variation in brightness gives the sheet depth.
      alphas = Array.from({ length: lineCount }, (_, i) => {
        const h = Math.sin(i * 12.9898) * 43758.5453;
        return 0.3 + 0.55 * (h - Math.floor(h));
      });
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const [r, g, b] = color;
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, `rgba(${r},${g},${b},0)`);
      gradient.addColorStop(0.08, `rgba(${r},${g},${b},1)`);
      gradient.addColorStop(0.92, `rgba(${r},${g},${b},1)`);
      gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.lineJoin = "round";

      const step = width < 768 ? 8 : 5;
      const t = time;

      for (let i = 0; i < lineCount; i++) {
        const f = i / (lineCount - 1);
        const y0 = bandTop + f * bandHeight;
        const envelope = 0.55 + 0.45 * Math.sin(f * Math.PI);
        // Lines draw in from the left, top lines first.
        const reveal = width * clamp(intro.value * 1.5 - f * 0.5, 0, 1);
        if (reveal < 2) continue;

        ctx.globalAlpha = alphas[i];
        ctx.beginPath();
        for (let x = 0; x <= reveal; x += step) {
          const u = x / width;
          // Loose on the left, settled in the middle, dead straight on the right.
          const settle = mix(1, 0.2, smooth(0.14, 0.42, u)) * (1 - smooth(0.5, 0.74, u));
          const a = amp * envelope * settle;
          const w1 = Math.sin(x * 0.0055 + t * 0.5 + i * 0.1);
          const w2 = Math.sin(x * 0.0125 - t * 0.35 + i * 0.17);
          const jitter = Math.sin(x * 0.034 + t * 1.1 + i * 0.55) * (1 - smooth(0.08, 0.34, u)) * 0.2;
          let y = y0 + a * (0.62 * w1 + 0.38 * w2 + jitter);

          if (mouse.power > 0.001) {
            const dx = x - mouse.sx;
            const dy = y - mouse.sy;
            const push =
              (dy / (Math.abs(dy) + 30)) *
              36 *
              mouse.power *
              Math.exp(-(dx * dx) / (2 * 120 * 120)) *
              Math.exp(-(dy * dy) / (2 * 150 * 150));
            y += push;
          }

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    measure();
    if (reduce) draw();

    const tick = () => {
      if (!visible) return;
      const dt = Math.min(gsap.ticker.deltaRatio(60) / 60, 0.05);
      time += dt;
      const k = Math.min(1, dt * 6);
      mouse.sx += (mouse.x - mouse.sx) * k;
      mouse.sy += (mouse.y - mouse.sy) * k;
      mouse.power += (mouse.target - mouse.power) * Math.min(1, dt * 3.5);
      draw();
    };
    if (!reduce) gsap.ticker.add(tick);

    const resizeObserver = new ResizeObserver(() => {
      measure();
      if (reduce) draw();
    });
    resizeObserver.observe(sectionEl);

    const visibility = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    visibility.observe(sectionEl);

    const onMove = (e: PointerEvent) => {
      const rect = sectionEl.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      if (mouse.target === 0) {
        mouse.sx = mouse.x;
        mouse.sy = mouse.y;
      }
      mouse.target = 1;
    };
    const onLeave = () => {
      mouse.target = 0;
    };
    sectionEl.addEventListener("pointermove", onMove);
    sectionEl.addEventListener("pointerleave", onLeave);

    // Follow the theme: the lines take the foreground colour.
    const themeObserver = new MutationObserver(() => {
      color = readForeground();
      if (reduce) draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const gsapCtx = gsap.context(() => {
      const labels = stagesEl.querySelectorAll("[data-label]");
      const ticks = stagesEl.querySelectorAll("[data-tick]");
      const words = nameEl.querySelectorAll("[data-word]");

      if (reduce) return;

      // The single orchestrated moment of the page load.
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.to(intro, { value: 1, duration: 3.2, ease: "power2.inOut" }, 0)
        .fromTo(
          words,
          { yPercent: 118, skewY: 5 },
          { yPercent: 0, skewY: 0, duration: 1.6, stagger: 0.12 },
          0.5,
        )
        .fromTo(
          ticks,
          { scaleY: 0 },
          { scaleY: 1, duration: 1, stagger: 0.12, transformOrigin: "top" },
          1,
        )
        .fromTo(
          labels,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.12 },
          1.1,
        )
        .fromTo(metaEl, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1.1 }, 1.4);

      gsap.to(nameBlockEl, {
        yPercent: -14,
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
      resizeObserver.disconnect();
      visibility.disconnect();
      themeObserver.disconnect();
      sectionEl.removeEventListener("pointermove", onMove);
      sectionEl.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const words = ["Vishwath", "Narayana"];

  return (
    <section ref={section} className="relative h-svh min-h-[620px] overflow-hidden">
      <canvas ref={canvas} aria-hidden className="absolute inset-0" />

      {/* Stage names: where the lines change state. */}
      <div ref={stages} aria-hidden className="pointer-events-none absolute inset-x-0">
        {STAGES.map((s, i) => (
          <div key={s.label} className="absolute inset-y-0" style={{ left: `${s.at * 100}%` }}>
            <div
              data-tick
              className={`absolute -top-3 h-2 w-px bg-muted ${i === 0 ? "left-5 md:left-10" : "left-0"}`}
            />
            <span
              data-label
              className={`absolute -top-8 whitespace-nowrap font-mono text-xs text-muted ${
                i === 0 ? "left-5 md:left-10" : "left-2"
              }`}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div ref={nameBlock} className="absolute inset-x-0 bottom-0 px-5 pb-6 md:px-10 md:pb-9">
        <h1 ref={name} aria-label="Vishwath Narayana" className="display text-[25vw] md:text-[14.4vw]">
          {words.map((word, i) => (
            <span
              key={word}
              aria-hidden
              className={`-mb-[0.14em] block overflow-hidden pb-[0.14em] md:inline-block ${
                i > 0 ? "md:ml-[0.2em]" : ""
              }`}
            >
              <span data-word className="inline-block will-change-transform">
                {word}
              </span>
            </span>
          ))}
        </h1>

        <div ref={meta} className="mt-5 flex items-end justify-between gap-6 md:mt-8">
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
