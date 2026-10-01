"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Clock from "./Clock";

/**
 * The hero is his Raw -> Curated -> Aggregated data lake, drawn as motion.
 * Noise drifts in from the left, snaps onto lanes at the first gate, and
 * merges into long clean lines at the second. Touching the raw data
 * scatters it; once it is curated it holds its line.
 */

const GATE_1 = 0.34; // raw -> curated
const GATE_2 = 0.63; // curated -> aggregated
const FINE_LANES = 20;
const COARSE_LANES = 6;

type Particle = {
  x: number;
  ny: number; // 0..1 position inside the band
  speed: number;
  phase: number;
  freq: number;
  amp: number;
  r: number; // random 0..1, shapes streak length
  r2: number; // random 0..1, shapes brightness
  ox: number;
  oy: number;
};

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
  const gates = useRef<HTMLDivElement>(null);
  const nameBlock = useRef<HTMLDivElement>(null);
  const name = useRef<HTMLHeadingElement>(null);
  const meta = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionEl = section.current;
    const canvasEl = canvas.current;
    const gatesEl = gates.current;
    const nameBlockEl = nameBlock.current;
    const nameEl = name.current;
    const metaEl = meta.current;
    if (!sectionEl || !canvasEl || !gatesEl || !nameBlockEl || !nameEl || !metaEl) return;

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
    let particles: Particle[] = [];
    let color = readForeground();
    let time = 0;
    let visible = true;
    const intro = { value: reduce ? 1 : 0 };
    const mouse = { x: -9999, y: -9999 };

    const spawn = (p: Particle, x: number) => {
      p.x = x;
      p.ny = Math.random();
      p.speed = 38 + Math.random() * 70;
      p.phase = Math.random() * Math.PI * 2;
      p.freq = 0.5 + Math.random() * 1.1;
      p.amp = 6 + Math.random() * 20;
      p.r = Math.random();
      p.r2 = Math.random();
      p.ox = 0;
      p.oy = 0;
    };

    const measure = () => {
      const rect = sectionEl.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, width < 768 ? 1.5 : 2);
      canvasEl.width = Math.round(width * dpr);
      canvasEl.height = Math.round(height * dpr);
      canvasEl.style.width = `${width}px`;
      canvasEl.style.height = `${height}px`;

      const compact = width < 768;
      bandTop = compact ? 112 : 128;
      const bottom = nameBlockEl.offsetTop - (compact ? 28 : 56);
      bandHeight = Math.max(160, bottom - bandTop);

      gatesEl.style.top = `${bandTop}px`;
      gatesEl.style.height = `${bandHeight}px`;

      const count = Math.round(clamp(width * 0.62, 300, 980));
      if (particles.length !== count) {
        particles = Array.from({ length: count }, () => {
          const p = { x: 0, ny: 0, speed: 0, phase: 0, freq: 0, amp: 0, r: 0, r2: 0, ox: 0, oy: 0 };
          spawn(p, Math.random() * width * 1.05);
          return p;
        });
      }
    };

    const step = (dt: number) => {
      time += dt;
      const interact = mouse.x > -999;

      for (const p of particles) {
        const u = p.x / width;
        const s2 = smooth(GATE_2 - 0.06, GATE_2 + 0.06, u);
        p.x += p.speed * (1 + 1.1 * s2) * dt;

        const len = s2 * (60 + p.r * 220);
        if (p.x - len > width) {
          spawn(p, -Math.random() * 80);
          continue;
        }

        // Raw data can be pushed around. Curated data cannot.
        const s1 = smooth(GATE_1 - 0.06, GATE_1 + 0.06, u);
        let tx = 0;
        let ty = 0;
        if (interact && s1 < 0.95) {
          const y = bandTop + p.ny * bandHeight;
          const dx = p.x - mouse.x;
          const dy = y - mouse.y;
          const d = Math.hypot(dx, dy);
          const radius = 150;
          if (d < radius && d > 0.01) {
            const f = (1 - d / radius) ** 2 * 70 * (1 - s1);
            tx = (dx / d) * f;
            ty = (dy / d) * f;
          }
        }
        const k = Math.min(1, dt * 7);
        p.ox += (tx - p.ox) * k;
        p.oy += (ty - p.oy) * k;
      }
    };

    const levels = 6;
    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      const [cr, cg, cb] = color;

      const dots: number[][] = Array.from({ length: levels }, () => []);
      const lines: number[][] = Array.from({ length: levels }, () => []);

      for (const p of particles) {
        const u = p.x / width;
        const s1 = smooth(GATE_1 - 0.06, GATE_1 + 0.06, u);
        const s2 = smooth(GATE_2 - 0.06, GATE_2 + 0.06, u);

        const raw = bandTop + p.ny * bandHeight + Math.sin(time * p.freq + p.phase) * p.amp * (1 - s1);
        const fine = bandTop + (Math.round(p.ny * (FINE_LANES - 1)) / (FINE_LANES - 1)) * bandHeight;
        const coarse = bandTop + (Math.round(p.ny * (COARSE_LANES - 1)) / (COARSE_LANES - 1)) * bandHeight;
        const y = mix(mix(raw, fine, s1), coarse, s2) + p.oy;
        const x = p.x + p.ox * (1 - s1);

        const len = s1 * (8 + p.r * 14) + s2 * (50 + p.r * 220);
        const head = smooth(-0.02, 0.06, u);
        const tail = 1 - smooth(0.86, 1, u);
        const alpha = clamp((0.34 + 0.42 * p.r2) * mix(1, 1.7, s2), 0, 0.95) * head * tail * intro.value;
        const level = Math.min(levels - 1, Math.floor(alpha * levels));
        if (alpha < 0.02) continue;

        if (len > 3) lines[level].push(x - len, y, x, y);
        else dots[level].push(x, y);
      }

      for (let i = 0; i < levels; i++) {
        const a = (i + 0.5) / levels;
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${a})`;
        ctx.strokeStyle = `rgba(${cr},${cg},${cb},${a})`;

        const d = dots[i];
        if (d.length) {
          ctx.beginPath();
          for (let j = 0; j < d.length; j += 2) ctx.rect(d[j] - 0.75, d[j + 1] - 0.75, 1.5, 1.5);
          ctx.fill();
        }
        const l = lines[i];
        if (l.length) {
          ctx.lineWidth = 1;
          ctx.beginPath();
          for (let j = 0; j < l.length; j += 4) {
            ctx.moveTo(l[j], l[j + 1]);
            ctx.lineTo(l[j + 2], l[j + 3]);
          }
          ctx.stroke();
        }
      }
    };

    measure();

    // Reduced motion: advance the system to a settled moment and draw it once.
    if (reduce) {
      for (let i = 0; i < 240; i++) step(1 / 30);
      draw();
    }

    const tick = () => {
      if (!visible) return;
      const dt = Math.min(gsap.ticker.deltaRatio(60) / 60, 0.05);
      step(dt);
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
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    sectionEl.addEventListener("pointermove", onMove);
    sectionEl.addEventListener("pointerleave", onLeave);

    // Follow the theme: the particles take the foreground colour.
    const themeObserver = new MutationObserver(() => {
      color = readForeground();
      if (reduce) draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const gsapCtx = gsap.context(() => {
      const gateLines = gatesEl.querySelectorAll("[data-gate]");
      const gateLabels = gatesEl.querySelectorAll("[data-label]");
      const words = nameEl.querySelectorAll("[data-word]");

      if (reduce) return;

      // The single orchestrated moment of the page load.
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.to(intro, { value: 1, duration: 2.6, ease: "power2.out" }, 0)
        .fromTo(
          gateLines,
          { scaleY: 0 },
          { scaleY: 1, duration: 1.4, stagger: 0.14, transformOrigin: "top" },
          0.15,
        )
        .fromTo(
          gateLabels,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.14 },
          0.55,
        )
        .fromTo(
          words,
          { yPercent: 118, skewY: 5 },
          { yPercent: 0, skewY: 0, duration: 1.5, stagger: 0.12 },
          0.4,
        )
        .fromTo(metaEl, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1.1 }, 1.2);

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

      {/* Gates: where the data changes state. */}
      <div ref={gates} aria-hidden className="pointer-events-none absolute inset-x-0">
        {[
          { label: "raw", left: "0%", pad: true },
          { label: "curated", left: `${GATE_1 * 100}%`, pad: false },
          { label: "aggregated", left: `${GATE_2 * 100}%`, pad: false },
        ].map((g) => (
          <div key={g.label} className="absolute inset-y-0" style={{ left: g.left }}>
            {!g.pad && <div data-gate className="absolute inset-y-0 left-0 w-px bg-line" />}
            <span
              data-label
              className={`absolute -top-6 whitespace-nowrap font-mono text-xs text-muted ${
                g.pad ? "left-5 md:left-10" : "left-3"
              }`}
            >
              {g.label}
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
