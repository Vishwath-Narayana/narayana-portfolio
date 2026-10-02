import { projects } from "@/data/build";

/** Each project is a spread: name, story and stack stay put on the left while the detail scrolls on the right. */
export default function Projects() {
  return (
    <section className="px-5 py-20 md:px-10 md:py-32">
      <h2 data-reveal className="display max-w-[14em] text-balance text-[clamp(2rem,3.8vw,3.8rem)]">
        What I have built.
      </h2>

      <div className="mt-12 md:mt-20">
        {projects.map((p) => (
          <article key={p.name} className="pb-16 md:pb-28">
            <div data-draw className="h-px w-full bg-fg" />

            <div className="grid gap-10 pt-7 md:grid-cols-2 md:gap-16 md:pt-9">
              <header className="md:sticky md:top-24 md:self-start">
                <p data-reveal className="text-sm text-muted">
                  {p.kind}
                </p>
                <h3 data-reveal className="display mt-3 text-balance text-[clamp(2.4rem,4.8vw,4.8rem)]">
                  {p.name}
                </h3>
                <p data-reveal className="mt-6 max-w-[36ch] text-lg leading-snug md:text-xl">
                  {p.about}
                </p>

                <div className="mt-8 md:mt-10">
                  <p data-reveal className="text-sm text-muted">
                    Built with
                  </p>
                  <p data-reveal className="mt-3 max-w-[46ch] font-mono text-xs leading-loose md:text-sm">
                    {p.stack.join("  /  ")}
                  </p>
                </div>

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

              <div className="space-y-10 md:space-y-12">
                <div data-flow>
                  <div className="relative">
                    <div aria-hidden className="absolute inset-x-0 top-[5px] h-px bg-line" />
                    <div aria-hidden data-flow-track className="absolute inset-x-0 top-[5px] h-px bg-fg" />
                    <ol className="relative flex justify-between gap-2">
                      {p.shape.map((part) => (
                        <li key={part} data-flow-node className="flex flex-col items-start gap-3 last:items-end">
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
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
