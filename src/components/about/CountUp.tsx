"use client";

import { useEffect, useRef, useState } from "react";

/** A number that counts up from zero the first time it is seen. Reduced motion shows it straight away. */
export default function CountUp({ value, decimals = 0, plain = false }: { value: number; decimals?: number; plain?: boolean }) {
  const el = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  const fmt = (n: number) => (plain ? String(Math.round(n)) : n.toFixed(decimals));

  useEffect(() => {
    const node = el.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Years count up from a little before, so 2027 does not spin through two thousand numbers.
    const from = plain ? value - 6 : 0;
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1400);
          const eased = 1 - Math.pow(1 - t, 4);
          setShown(from + (value - from) * eased);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        setShown(from);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, plain]);

  return (
    <span ref={el} className="tabular-nums">
      {fmt(shown)}
    </span>
  );
}
