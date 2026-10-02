import { projects } from "@/data/build";

/** Each project is a spread: the name stays put on the left while the detail scrolls on the right. */
export default function Projects() {
  return (
    <section className="px-5 py-24 md:px-10 md:py-40">
      <h2 data-reveal className="display max-w-[11em] text-balance text-[clamp(2.6rem,6vw,6.2rem)]">
        What I have built.
      </h2>

      <div className="mt-16 md:mt-28">
        {projects.map((p) => (
          <article key={p.name} className="relative pb-24 md:pb-44">
            <div data-draw className="h-px w-full bg-fg" />

            <div className="grid gap-10 pt-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-16 md:pt-10">
              <header className="md:sticky md:top-28 md:self-start">
                <p data-reveal className="text-sm text-muted">
                  {p.kind}
                </p>
                <h3 data-reveal className="display mt-4 text-balance text-[clamp(3rem,7.2vw,7.4rem)]">
                  {p.name}
                </h3>
                {(p.live || p.repo) && (
                  <p data-reveal className="mt-8 flex gap-6 text-base">
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer" className="link-line pb-0.5">
                        Live site
                      </a>
                    )}
                    {p.repo && (
                      <a href={p.repo} target="_blank" rel="noreferrer" className="link-line pb-0.5">
                        Source
                      </a>
                    )}
                  </p>
                )}
              </header>

              <div className="space-y-14 md:space-y-16">
                <p data-reveal className="max-w-[34ch] text-xl leading-snug md:text-[1.7rem]">
                  {p.about}
                </p>

                <div data-flow>
                  <div className="relative">
                    <div aria-hidden className="absolute inset-x-0 top-[5px] h-px bg-line" />
                    <div aria-hidden data-flow-track className="absolute inset-x-0 top-[5px] h-px bg-fg" />
                    <ol className="relative flex justify-between gap-2">
                      {p.shape.map((part) => (
                        <li key={part} data-flow-node className="flex flex-col items-start gap-3 first:items-start last:items-end">
                          <span aria-hidden className="size-[11px] rounded-full border border-fg bg-bg" />
                          <span className="font-mono text-xs md:text-[0.8rem]">{part}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <p className="mt-5 text-sm text-muted">{p.shapeNote}</p>
                </div>

                <div>
                  <p data-reveal className="text-sm text-muted">
                    What I did
                  </p>
                  <ul className="mt-4">
                    {p.did.map((item) => (
                      <li
                        key={item}
                        data-reveal
                        className="max-w-[56ch] border-t border-line py-4 text-base leading-relaxed md:text-[1.05rem]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p data-reveal className="text-sm text-muted">
                    Built with
                  </p>
                  <p data-reveal className="mt-3 max-w-[48ch] font-mono text-xs leading-loose md:text-sm">
                    {p.stack.join("  /  ")}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
