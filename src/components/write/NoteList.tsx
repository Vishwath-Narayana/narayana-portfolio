"use client";

import { useState } from "react";
import { TransitionLink } from "../Transition";

export type NoteRow = { slug: string; title: string; summary: string; tag: string; minutes: number; date: string; dateLabel: string };

const pad = (n: number) => String(n).padStart(2, "0");

/** Every note as a numbered row, with the topics above as filters. */
export default function NoteList({ notes }: { notes: NoteRow[] }) {
  const tags = [...new Set(notes.map((n) => n.tag).filter(Boolean))];
  const [tag, setTag] = useState<string | null>(null);
  const shown = tag ? notes.filter((n) => n.tag === tag) : notes;

  return (
    <>
      <div data-reveal role="group" aria-label="Filter by topic" className="mt-10 flex flex-wrap gap-2 md:mt-14">
        {[null, ...tags].map((t) => {
          const on = tag === t;
          const count = t ? notes.filter((n) => n.tag === t).length : notes.length;
          return (
            <button
              key={t ?? "all"}
              type="button"
              aria-pressed={on}
              onClick={() => setTag(t)}
              className={`rounded-full border px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.1em] transition-colors duration-300 ${
                on ? "border-fg bg-fg text-bg" : "border-line text-muted hover:border-fg hover:text-fg"
              }`}
            >
              {t ?? "All"} <span className="opacity-50">{pad(count)}</span>
            </button>
          );
        })}
      </div>

      <ul className="dim-siblings mt-10 border-t border-line md:mt-14" aria-live="polite">
        {shown.map((n) => (
          <li key={n.slug} data-reveal className="border-b border-line transition-opacity duration-300">
            <TransitionLink
              href={`/write/${n.slug}`}
              className="group relative grid gap-3 py-8 md:grid-cols-[minmax(0,0.7fr)_minmax(0,2.4fr)_minmax(0,1fr)] md:items-baseline md:gap-10 md:py-12"
            >
              <p className="flex gap-4 font-mono text-xs text-muted md:flex-col md:gap-1 md:text-sm">
                <span>No. {pad(notes.indexOf(n) + 1)}</span>
                <time dateTime={n.date}>{n.dateLabel}</time>
              </p>
              <div className="transition-transform duration-700 [transition-timing-function:var(--ease-out)] md:group-hover:translate-x-3">
                <h2 className="display text-balance text-[clamp(1.9rem,3.6vw,3.6rem)]">{n.title}</h2>
                <p className="mt-3 max-w-[46ch] text-base text-muted">{n.summary}</p>
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted md:pr-8 md:text-right">
                {n.tag} &middot; {n.minutes} min
              </p>
              {/* Sits outside the flow, so the meta column never shifts. */}
              <span
                aria-hidden
                className="absolute right-0 top-1/2 hidden -translate-x-2 -translate-y-1/2 text-xl opacity-0 transition-[opacity,translate] duration-500 [transition-timing-function:var(--ease-out)] group-hover:translate-x-0 group-hover:opacity-100 md:block"
              >
                &rarr;
              </span>
            </TransitionLink>
          </li>
        ))}
      </ul>
    </>
  );
}
