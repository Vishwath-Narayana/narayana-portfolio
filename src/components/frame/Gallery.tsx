"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { chapters, photos, exposure, hasSettings, monthYear, type Photo } from "@/data/photos";
import { getLenis } from "@/lib/lenis";
import Aperture from "./Aperture";

const isWide = (p: Photo) => p.width / p.height > 1.2;

type Row = { kind: "wide" | "single" | "pair"; items: Photo[] };

/** Lay a chapter out in rows: landscapes alone and wide, portraits in staggered pairs. */
function toRows(list: Photo[]): Row[] {
  const rows: Row[] = [];
  for (let i = 0; i < list.length; i++) {
    const p = list[i];
    if (isWide(p)) rows.push({ kind: "wide", items: [p] });
    else if (list[i + 1] && !isWide(list[i + 1])) rows.push({ kind: "pair", items: [p, list[++i]] });
    else rows.push({ kind: "single", items: [p] });
  }
  return rows;
}

function chapterFacts(list: Photo[]) {
  const cameras = Array.from(new Set(list.map((p) => p.camera).filter(Boolean)));
  const years = list.filter((p) => p.takenExact).map((p) => new Date(p.taken).getFullYear());
  const span = years.length ? (Math.min(...years) === Math.max(...years) ? `${years[0]}` : `${Math.min(...years)} to ${Math.max(...years)}`) : null;
  return [`${list.length} photographs`, span, cameras.length ? `shot on ${cameras.join(", ")}` : null].filter(Boolean).join("  /  ");
}

const BRACKETS = [
  "left-0 top-0 border-l border-t -translate-x-1 -translate-y-1 group-hover:translate-x-3 group-hover:translate-y-3",
  "right-0 top-0 border-r border-t translate-x-1 -translate-y-1 group-hover:-translate-x-3 group-hover:translate-y-3",
  "bottom-0 left-0 border-b border-l -translate-x-1 translate-y-1 group-hover:translate-x-3 group-hover:-translate-y-3",
  "bottom-0 right-0 border-b border-r translate-x-1 translate-y-1 group-hover:-translate-x-3 group-hover:-translate-y-3",
];

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)), []);
  const indexOf = (p: Photo) => photos.indexOf(p);

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
  const chapter = current ? chapters.find((c) => c.id === current.chapter) : null;

  const plate = (p: Photo, extra = "") => {
    const line = exposure(p);
    return (
      <figure key={p.id} data-plate className={`group ${extra}`}>
        <button
          type="button"
          onClick={() => setOpen(indexOf(p))}
          aria-label={`Open ${p.title}`}
          className="relative block w-full cursor-zoom-in border border-line p-2.5 text-left md:p-4"
        >
          <div data-mask className="relative overflow-hidden" style={{ aspectRatio: `${p.width} / ${p.height}` }}>
            <Image
              data-img
              src={p.src}
              alt={p.title}
              fill
              sizes="(min-width: 768px) 46vw, 100vw"
              placeholder="blur"
              blurDataURL={p.blur}
              className="object-cover"
            />
            {BRACKETS.map((c) => (
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
          {hasSettings(p) ? (
            <p className="flex items-center gap-2 font-mono text-xs text-muted md:text-[0.8rem]">
              {p.aperture && <Aperture f={p.aperture} />}
              {line}
            </p>
          ) : (
            <p className="font-mono text-xs text-muted/70 md:text-[0.8rem]">Settings not recorded</p>
          )}
        </figcaption>
      </figure>
    );
  };

  return (
    <section className="pb-24 md:pb-40">
      {/* The whole roll as a contact sheet. Hover one and the rest step back. */}
      <div className="px-5 md:px-10">
        <p data-reveal className="text-sm text-muted">
          The roll
        </p>
        <ul className="dim-siblings mt-5 grid grid-cols-8 gap-1.5 md:grid-cols-[repeat(16,minmax(0,1fr))] md:gap-2">
          {photos.map((p, i) => (
            <li key={p.id} data-thumb className="transition-opacity duration-500">
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Open ${p.title}`}
                className="relative block aspect-[3/4] w-full overflow-hidden"
              >
                <Image
                  src={p.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 6vw, 12vw"
                  placeholder="blur"
                  blurDataURL={p.blur}
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {chapters.map((c, ci) => {
        const list = photos.filter((p) => p.chapter === c.id);
        const rows = toRows(list);
        return (
          <div key={c.id} className="mt-28 px-5 md:mt-52 md:px-10">
            <div data-draw className="h-px w-full bg-fg" />
            <div className="mt-6 grid gap-3 md:mt-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] md:gap-16">
              <h2 data-reveal className="display text-[clamp(2.4rem,5vw,5rem)]">
                {c.name}
              </h2>
              <div>
                <p data-reveal className="max-w-[40ch] text-base md:text-lg">
                  {c.line}
                </p>
                <p data-reveal className="mt-3 font-mono text-xs text-muted md:text-sm">
                  {chapterFacts(list)}
                </p>
              </div>
            </div>

            <div className="mt-16 space-y-20 md:mt-28 md:space-y-40">
              {rows.map((row, ri) => {
                const flip = (ri + ci) % 2 === 1;
                if (row.kind === "wide")
                  return (
                    <Fragment key={row.items[0].id}>
                      {plate(row.items[0], flip ? "md:ml-[22%] md:w-[78%]" : "md:w-[78%]")}
                    </Fragment>
                  );
                if (row.kind === "single")
                  return (
                    <Fragment key={row.items[0].id}>
                      {plate(row.items[0], flip ? "md:ml-[12%] md:w-[40%]" : "md:ml-[48%] md:w-[40%]")}
                    </Fragment>
                  );
                const [a, b] = row.items;
                return (
                  <div key={a.id} className="grid gap-20 md:grid-cols-12 md:gap-0">
                    {plate(a, `md:col-span-5 md:col-start-1 ${flip ? "md:mt-40" : ""}`)}
                    {plate(b, `md:col-span-5 md:col-start-8 ${flip ? "" : "md:mt-40"}`)}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

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
                key={current.id}
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
                  {[current.place, chapter?.name, current.takenExact ? monthYear(current.taken) : null]
                    .filter(Boolean)
                    .join(", ")}
                </p>
                {current.note && <p className="mt-3 max-w-[40ch] text-sm">{current.note}</p>}
              </div>
              {hasSettings(current) || current.camera ? (
                <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm sm:grid-cols-3 md:grid-cols-4">
                  {(
                    [
                      ["Camera", current.camera],
                      ["Lens", current.lens],
                      ["Focal length", current.focal ? `${current.focal} mm${current.focalEq ? " equiv." : ""}` : null],
                      ["Aperture", current.aperture ? `f/${current.aperture}` : null],
                      ["Shutter", current.shutter ? (current.shutter.endsWith("s") ? current.shutter : `${current.shutter} s`) : null],
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
              ) : (
                <p className="self-end text-sm text-muted">No camera data was saved with this photo.</p>
              )}
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
