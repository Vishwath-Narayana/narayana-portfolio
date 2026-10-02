import { journey } from "@/data/build";

/** The journey as one line down the left edge with three stops on it. */
export default function Journey() {
  return (
    <section className="px-5 pb-20 pt-32 md:px-10 md:pb-32 md:pt-44">
      <p data-reveal className="text-sm text-muted">
        Build
      </p>
      <h1 data-reveal className="display mt-4 max-w-[14em] text-balance text-[clamp(2.4rem,4.6vw,4.8rem)]">
        I started by drawing it. Now I build what it runs on.
      </h1>

      <div data-line-root className="relative mt-14 pl-7 md:mt-24 md:pl-10">
        <div aria-hidden className="absolute bottom-0 left-[3px] top-2 w-px bg-line" />
        <div aria-hidden data-line className="absolute bottom-0 left-[3px] top-2 w-px bg-fg" />

        <ol className="space-y-14 md:space-y-24">
          {journey.map((stage) => (
            <li
              key={stage.name}
              className="relative grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] md:gap-16"
            >
              <span aria-hidden className="absolute -left-7 top-[0.55rem] size-[7px] rounded-full bg-fg md:-left-10" />
              <div>
                <p data-reveal className="text-sm text-muted">
                  {stage.period}
                </p>
                <h2 data-reveal className="display mt-2 text-[clamp(2.4rem,5vw,5rem)]">
                  {stage.name}
                </h2>
              </div>
              <div>
                <p data-reveal className="max-w-[54ch] text-base leading-relaxed md:text-lg">
                  {stage.text}
                </p>
                <p data-reveal className="mt-5 max-w-[54ch] font-mono text-xs leading-relaxed text-muted md:text-sm">
                  {stage.tools.join("  /  ")}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
