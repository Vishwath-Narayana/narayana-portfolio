import { layers } from "@/data/build";

/** Skills as a stack, from the screen a person sees down to where the data is kept. */
export default function Skills() {
  return (
    <section className="flip px-5 py-24 md:px-10 md:py-40">
      <h2 data-reveal className="display max-w-[12em] text-balance text-[clamp(2.6rem,6vw,6.2rem)]">
        From the screen to the storage.
      </h2>
      <p data-reveal className="mt-8 max-w-[44ch] text-base text-muted md:text-lg">
        What I work with, listed in the order a request travels: from what you see, down to where the data is kept.
      </p>

      <ul className="dim-siblings mt-16 md:mt-28">
        {layers.map((layer) => (
          <li
            key={layer.name}
            className="grid gap-3 border-t border-line py-7 transition-opacity duration-500 md:grid-cols-[22vw_1fr] md:gap-10 md:py-9"
          >
            <p data-reveal className="text-sm text-muted md:pt-3">
              {layer.name}
            </p>
            <p data-reveal className="display text-[clamp(1.7rem,3.4vw,3.4rem)] leading-[1.08]">
              {layer.skills.map((skill, i) => (
                <span key={skill}>
                  {skill}
                  {i < layer.skills.length - 1 && <span className="text-muted"> · </span>}
                </span>
              ))}
            </p>
          </li>
        ))}
        <li aria-hidden className="border-t border-line" />
      </ul>
    </section>
  );
}
