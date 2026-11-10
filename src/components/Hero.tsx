import Clock from "./Clock";
import Greeting from "./Greeting";
import HeroMotion from "./home/HeroMotion";

/** The name, with a handwritten hello above it. As you scroll away it lifts and dims, handing over to the statement. */
export default function Hero() {
  return (
    <section data-hero className="relative flex h-svh min-h-[560px] flex-col overflow-hidden">
      <HeroMotion />
      <div data-hero-greet className="flex flex-1 items-center justify-center px-5 pt-20 text-center md:px-10">
        <Greeting className="max-w-[16ch] !text-[clamp(1.7rem,2.9vw,3.1rem)] !leading-[1.3] !text-[color-mix(in_oklab,var(--fg)_80%,var(--bg))] md:max-w-none" />
      </div>

      <div data-hero-name className="px-5 pb-6 md:px-10 md:pb-9">
        <p className="mb-3 inline-flex items-center gap-2.5 font-mono text-xs md:mb-1 md:text-sm">
          <span aria-hidden className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-fg opacity-50" />
            <span className="relative inline-flex size-2 rounded-full bg-fg" />
          </span>
          Open to data engineering roles, from 2027
        </p>
        <h1 className="display text-[25vw] md:text-[14.4vw]">
          <span className="block md:inline">Vishwath</span>{" "}
          <span className="block md:inline">Narayana</span>
        </h1>

        <div className="mt-6 flex items-end justify-between gap-6 md:mt-9">
          <p className="max-w-[26ch] text-base leading-snug md:max-w-none md:text-xl">
            Data engineer, photographer and writer.
          </p>
          <p className="shrink-0 text-right font-mono text-xs text-muted md:text-sm">
            <Clock />
          </p>
        </div>
      </div>
    </section>
  );
}
