import { journey } from "@/data/build";

/** The journey as one line down the page with three stops on it. */
export default function Journey() {
  return (
    <section className="px-5 py-24 md:px-10 md:py-40">
      <h2 data-reveal className="display max-w-[11em] text-balance text-[clamp(2.6rem,6vw,6.2rem)]">
        I started by drawing it. Now I build what it runs on.
      </h2>

      <div data-line-root className="relative mt-20 md:mt-32 md:pl-[24vw]">
        {/* the line */}
        <div aria-hidden className="absolute bottom-0 left-[3px] top-2 w-px bg-line md:left-[calc(24vw-24px)]" />
        <div
          aria-hidden
          data-line
          className="absolute bottom-0 left-[3px] top-2 w-px bg-fg md:left-[calc(24vw-24px)]"
        />

        <ol className="space-y-24 pl-8 md:space-y-40 md:pl-0">
          {journey.map((stage) => (
            <li key={stage.name} className="relative">
              <span
                aria-hidden
                className="absolute -left-[33px] top-[0.9rem] size-[7px] rounded-full bg-fg md:-left-[27px] md:top-[1.6rem]"
              />
              <p data-reveal className="text-sm text-muted">
                {stage.period}
              </p>
              <h3 data-reveal className="display mt-3 text-[clamp(3rem,8vw,8rem)]">
                {stage.name}
              </h3>
              <p data-reveal className="mt-6 max-w-[52ch] text-base leading-relaxed md:mt-8 md:text-lg">
                {stage.text}
              </p>
              <p data-reveal className="mt-6 max-w-[52ch] font-mono text-xs leading-relaxed text-muted md:text-sm">
                {stage.tools.join("  /  ")}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
