import type { Year } from "@/data/about";

/** One row per year: the year large on the left, what happened on the right. */
export default function Timeline({ years }: { years: Year[] }) {
  return (
    <ol className="border-t border-line">
      {years.map((y) => (
        <li
          key={y.year}
          data-reveal
          className="grid gap-4 border-b border-line py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-16 md:py-12"
        >
          <p className="display text-6xl md:text-8xl">{y.year}</p>
          <div>
            <h3 className="text-xl md:text-2xl">{y.title}</h3>
            <div className="mt-4 max-w-[54ch] space-y-3 text-base leading-relaxed text-muted md:text-lg">
              {y.lines.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
