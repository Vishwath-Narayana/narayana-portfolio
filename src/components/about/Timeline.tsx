import type { Year } from "@/data/about";

/** One short row per year. The detail lives in the sections below. */
export default function Timeline({ years }: { years: Year[] }) {
  return (
    <ol className="border-t border-line">
      {years.map((y) => (
        <li
          key={y.year}
          data-reveal
          className="grid items-baseline gap-2 border-b border-line py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-16 md:py-8"
        >
          <p className="display text-5xl md:text-7xl">{y.year}</p>
          <div>
            <h3 className="text-lg md:text-xl">{y.title}</h3>
            <p className="mt-2 max-w-[54ch] text-base leading-relaxed text-muted">{y.lines[0]}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
