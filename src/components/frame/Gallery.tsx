"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Aperture from "./Aperture";
import { chapters, exposure, photos, type Photo } from "@/data/photos";

type View = "sheet" | "index";

const pad = (n: number) => String(n).padStart(2, "0");

const cameras = new Set(photos.map((p) => p.camera).filter(Boolean));
const focals = photos.map((p) => p.focal).filter((f): f is number => f !== null);
const byChapter = chapters.map((c) => ({ ...c, photos: photos.filter((p) => p.chapter === c.id) }));

/**
 * The roll, two ways. As a contact sheet, chapter by chapter, with the settings
 * shown on hover. Or as an index: the same photos read as rows of data, with the
 * picture following the cursor.
 */
export default function Gallery() {
  const [view, setView] = useState<View>("sheet");

  return (
    <section className="px-5 pb-24 md:px-10 md:pb-40">
      <div className="flex flex-col gap-6 border-t border-line pt-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p data-reveal className="text-sm text-muted">
            The roll
          </p>
          <p data-reveal className="mt-2 font-mono text-xs md:text-sm">
            {photos.length} frames &middot; {chapters.length} chapters &middot; {cameras.size} cameras on record
            {focals.length > 0 && (
              <>
                {" "}
                &middot; {Math.min(...focals)} to {Math.max(...focals)} mm
              </>
            )}
          </p>
        </div>

        <div data-reveal role="group" aria-label="View" className="flex gap-1 self-start rounded-full border border-line p-1 text-sm md:self-auto">
          {(["sheet", "index"] as View[]).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={`rounded-full px-4 py-1.5 transition-colors duration-300 ${
                view === v ? "bg-fg text-bg" : "text-muted hover:text-fg"
              }`}
            >
              {v === "sheet" ? "Contact sheet" : "Index"}
            </button>
          ))}
        </div>
      </div>

      {view === "sheet" ? <Sheet /> : <Index />}
    </section>
  );
}

function Sheet() {
  return (
    <div className="mt-12 space-y-20 md:mt-20 md:space-y-32">
      {byChapter.map((c, ci) => (
        <div key={c.id} className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,3.2fr)] md:gap-12">
          <header className="md:sticky md:top-28 md:self-start">
            <p data-reveal className="font-mono text-xs text-muted md:text-sm">
              Chapter {pad(ci + 1)}
            </p>
            <h2 data-reveal className="display mt-2 text-[clamp(2.4rem,4vw,4.2rem)]">
              {c.name}
            </h2>
            <p data-reveal className="mt-3 max-w-[28ch] text-base text-muted">
              {c.line}
            </p>
            <p data-reveal className="mt-4 font-mono text-xs text-muted">
              {c.photos.length} frames
            </p>
          </header>

          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 xl:grid-cols-4">
            {c.photos.map((p) => (
              <li key={p.id} data-thumb>
                <Thumb p={p} n={photos.indexOf(p) + 1} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Thumb({ p, n }: { p: Photo; n: number }) {
  const settings = exposure(p);
  return (
    <Link href={`/frame/${p.id}`} aria-label={`Open ${p.title}`} className="group relative block aspect-[4/5] overflow-hidden bg-line">
      <Image
        src={p.src}
        alt={p.title}
        fill
        sizes="(min-width: 1280px) 18vw, (min-width: 768px) 24vw, 50vw"
        placeholder="blur"
        blurDataURL={p.blur}
        className="object-cover transition-transform duration-[1.1s] [transition-timing-function:var(--ease-out)] group-hover:scale-[1.06]"
      />
      <div
        aria-hidden
        className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/75 via-black/10 to-black/30 p-3 text-[#fafafa] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <span className="font-mono text-[0.7rem]">{pad(n)}</span>
        <span>
          <span className="display block text-[1.35rem] leading-tight">{p.title}</span>
          <span className="mt-1.5 flex items-center gap-2 font-mono text-[0.68rem] opacity-80">
            {p.aperture && <Aperture f={p.aperture} className="shrink-0" />}
            {settings || "No settings recorded"}
          </span>
        </span>
      </div>
    </Link>
  );
}

function Index() {
  const [active, setActive] = useState<Photo | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const move = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);

  useEffect(() => {
    const el = preview.current;
    if (!el) return;
    move.current = {
      x: gsap.quickTo(el, "x", { duration: 0.55, ease: "power3" }),
      y: gsap.quickTo(el, "y", { duration: 0.55, ease: "power3" }),
    };
  }, []);

  const cols = "grid grid-cols-[2.2rem_minmax(0,1fr)_auto] gap-x-4 md:grid-cols-[3rem_minmax(0,2.2fr)_minmax(0,1fr)_minmax(0,1.3fr)_4.5rem_4.5rem_5rem_4.5rem] md:gap-x-6";

  return (
    <div
      className="relative mt-12 md:mt-20"
      onMouseMove={(e) => {
        move.current?.x(e.clientX + 24);
        move.current?.y(e.clientY - 120);
      }}
      onMouseLeave={() => setActive(null)}
    >
      <div className={`${cols} border-b border-line pb-3 font-mono text-[0.7rem] uppercase tracking-wider text-muted`}>
        <span>No.</span>
        <span>Title</span>
        <span className="hidden md:block">Chapter</span>
        <span className="hidden md:block">Camera</span>
        <span className="hidden md:block">Focal</span>
        <span className="hidden md:block">Aperture</span>
        <span className="hidden md:block">Shutter</span>
        <span className="text-right md:text-left">ISO</span>
      </div>

      <ul className="dim-siblings">
        {photos.map((p, i) => (
          <li key={p.id} className="border-b border-line transition-opacity duration-300">
            <Link
              href={`/frame/${p.id}`}
              onMouseEnter={() => setActive(p)}
              onFocus={() => setActive(p)}
              className={`${cols} items-baseline py-4 font-mono text-xs md:text-[0.8rem]`}
            >
              <span className="text-muted">{pad(i + 1)}</span>
              <span className="display truncate text-[1.35rem] md:text-[1.6rem]">{p.title}</span>
              <span className="hidden text-muted md:block">{chapters.find((c) => c.id === p.chapter)?.name}</span>
              <span className="hidden truncate md:block">{p.camera ?? "—"}</span>
              <span className="hidden md:block">{p.focal ? `${p.focal}mm` : "—"}</span>
              <span className="hidden md:block">{p.aperture ? `f/${p.aperture}` : "—"}</span>
              <span className="hidden md:block">{p.shutter ?? "—"}</span>
              <span className="text-right md:text-left">{p.iso ?? "—"}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[17rem] transition-[opacity,scale] duration-300 md:block"
        style={{ opacity: active ? 1 : 0, scale: active ? "1" : "0.92" }}
      >
        {active && (
          <div className="relative aspect-[4/5] overflow-hidden shadow-2xl">
            <Image
              key={active.id}
              src={active.src}
              alt=""
              fill
              sizes="18rem"
              placeholder="blur"
              blurDataURL={active.blur}
              className="object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}
