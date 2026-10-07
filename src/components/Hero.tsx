import Clock from "./Clock";
import Greeting from "./Greeting";

/** The name, still, with a handwritten hello above it. */
export default function Hero() {
  return (
    <section className="relative h-svh min-h-[560px] overflow-hidden">
      <div className="absolute inset-x-0 top-[24%] px-5 md:top-[26%] md:px-10">
        <Greeting className="max-w-[12ch] -ml-[0.1em] !text-[clamp(2.1rem,4.4vw,4.6rem)] !leading-[1.25] !text-[color-mix(in_oklab,var(--fg)_80%,var(--bg))] md:max-w-[26ch]" />
      </div>

      <div className="absolute inset-x-0 bottom-0 px-5 pb-6 md:px-10 md:pb-9">
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
