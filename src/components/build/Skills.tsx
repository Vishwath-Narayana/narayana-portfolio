import { layers } from "@/data/build";

/** Skills as a stack, from the screen a person sees down to where the data is kept. */
export default function Skills() {
  return (
    <section className="flip px-5 py-20 md:px-10 md:py-32">
      <h2 data-reveal className="display max-w-[14em] text-balance text-[clamp(2rem,3.8vw,3.8rem)]">
        From the screen to the storage.
      </h2>
      <p data-reveal className="mt-5 max-w-[46ch] text-base text-muted md:text-lg">
        What I work with, listed in the order a request travels: from what you see, down to where the data is kept.
      </p>

      <ul className="dim-siblings mt-12 md:mt-20">
        {layers.map((layer) => (
          <li
            key={layer.name}
            className="grid gap-2 border-t border-line py-6 transition-opacity duration-500 md:grid-cols-[15rem_1fr] md:gap-10 md:py-7"
          >
            <p data-reveal className="text-base md:pt-2">
              {layer.name}
            </p>
            <p data-reveal className="display text-[clamp(1.6rem,2.8vw,2.8rem)] leading-[1.1]">
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
