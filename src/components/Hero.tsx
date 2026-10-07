import Clock from "./Clock";
import Greeting from "./Greeting";

/** The name, still, with a handwritten hello above it. */
export default function Hero() {
  return (
    <section className="relative h-svh min-h-[560px] overflow-hidden">
      <div className="absolute inset-x-0 top-[24%] px-5 md:top-[26%] md:px-10">
        <Greeting className="max-w-[12ch] !text-[clamp(2.6rem,6.2vw,6.4rem)] !leading-[1.2] md:max-w-[26ch]" />
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
            <span className="hidden sm:inline">Warangal </span>
            <Clock />
          </p>
        </div>
      </div>
    </section>
  );
}
