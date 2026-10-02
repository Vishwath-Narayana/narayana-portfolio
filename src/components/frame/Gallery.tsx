"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { photos, exposure, type Photo } from "@/data/photos";
import { getLenis } from "@/lib/lenis";
import Aperture from "./Aperture";

/** Where each photo sits on the page: by shape, alternating sides, so the column never reads as a grid. */
const placement = {
  landscape: ["md:ml-0 md:w-[66%]", "md:ml-[30%] md:w-[66%]"],
  portrait: ["md:ml-[52%] md:w-[38%]", "md:ml-[8%] md:w-[38%]"],
  square: ["md:ml-[16%] md:w-[52%]", "md:ml-[34%] md:w-[52%]"],
} as const;

function shape(p: Photo) {
  const r = p.width / p.height;
  return r > 1.2 ? "landscape" : r < 0.88 ? "portrait" : "square";
}

function when(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)), []);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open !== null && !el.open) {
      returnTo.current = document.activeElement as HTMLElement | null;
      el.showModal();
      getLenis()?.stop();
    }
    if (open === null && el.open) {
      el.close();
      getLenis()?.start();
      returnTo.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const current = open !== null ? photos[open] : null;
  const counters = { landscape: 0, portrait: 0, square: 0 };

  return (
    <section className="px-5 pb-24 md:px-10 md:pb-40">
      <div className="space-y-20 md:space-y-36">
        {photos.map((p, i) => {
          const s = shape(p);
          const place = placement[s][counters[s]++ % 2];
          const line = exposure(p);
          return (
            <figure key={p.file} data-plate className={`group ${place}`}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Open ${p.title}`}
                className="relative block w-full cursor-zoom-in border border-line p-2.5 text-left md:p-4"
              >
                <div
                  data-mask
                  className="relative overflow-hidden"
                  style={{ aspectRatio: `${p.width} / ${p.height}` }}
                >
                  <Image
                    data-img
                    src={p.src}
                    alt={p.title}
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    placeholder="blur"
                    blurDataURL={p.blur}
                    className="object-cover"
                  />
                  {/* autofocus brackets that settle onto the photo */}
                  {(
                    [
                      "left-0 top-0 border-l border-t group-hover:translate-x-3 group-hover:translate-y-3 -translate-x-1 -translate-y-1",
                      "right-0 top-0 border-r border-t group-hover:-translate-x-3 group-hover:translate-y-3 translate-x-1 -translate-y-1",
                      "bottom-0 left-0 border-b border-l group-hover:translate-x-3 group-hover:-translate-y-3 -translate-x-1 translate-y-1",
                      "bottom-0 right-0 border-b border-r group-hover:-translate-x-3 group-hover:-translate-y-3 translate-x-1 translate-y-1",
                    ] as const
                  ).map((c) => (
                    <span
                      key={c}
                      aria-hidden
                      className={`pointer-events-none absolute size-5 border-white opacity-0 mix-blend-difference transition-[opacity,transform] duration-700 [transition-timing-function:var(--ease-out)] group-hover:opacity-100 ${c}`}
                    />
                  ))}
                </div>
              </button>

              <figcaption data-caption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <p className="text-base">
                  {p.title}
                  {p.place && <span className="text-muted">, {p.place}</span>}
                </p>
                {line && (
                  <p className="flex items-center gap-2 font-mono text-xs text-muted md:text-[0.8rem]">
                    {p.aperture && <Aperture f={p.aperture} />}
                    {line}
                  </p>
                )}
              </figcaption>
            </figure>
          );
        })}
      </div>

      <dialog
        ref={dialog}
        onClose={close}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        aria-label={current?.title ?? "Photo"}
        className="m-0 h-svh max-h-none w-screen max-w-none bg-bg p-0 text-fg backdrop:bg-black/80"
      >
        {current && (
          <div className="flex h-full flex-col px-5 py-5 md:px-10 md:py-8">
            <div className="flex items-center justify-between text-sm">
              <button type="button" onClick={close} className="link-line pb-0.5">
                Close
              </button>
              <div className="flex gap-6">
                <button type="button" onClick={() => step(-1)} className="link-line pb-0.5">
                  Previous
                </button>
                <button type="button" onClick={() => step(1)} className="link-line pb-0.5">
                  Next
                </button>
              </div>
            </div>

            <div className="relative my-5 min-h-0 flex-1 md:my-8">
              <Image
                key={current.file}
                src={current.src}
                alt={current.title}
                fill
                sizes="100vw"
                placeholder="blur"
                blurDataURL={current.blur}
                className="object-contain"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
              <div>
                <p className="display text-3xl md:text-5xl">{current.title}</p>
                <p className="mt-2 text-sm text-muted">
                  {[current.place, when(current.taken)].filter(Boolean).join(", ")}
                </p>
                {current.note && <p className="mt-3 max-w-[40ch] text-sm">{current.note}</p>}
              </div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm sm:grid-cols-3 md:grid-cols-4">
                {(
                  [
                    ["Camera", current.camera],
                    ["Lens", current.lens],
                    ["Focal length", current.focal ? `${current.focal} mm` : null],
                    ["Aperture", current.aperture ? `f/${current.aperture}` : null],
                    ["Shutter", current.shutter ? `${current.shutter} s`.replace("s s", "s") : null],
                    ["ISO", current.iso ? String(current.iso) : null],
                  ] as const
                )
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-muted">{k}</dt>
                      <dd className="mt-0.5 font-mono text-[0.8rem]">{v}</dd>
                    </div>
                  ))}
              </dl>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
