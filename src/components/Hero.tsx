import Clock from "./Clock";
import { HandwrittenResponse } from "./HandwrittenResponse";

/** The hero is the name, still. Only the line under it is written by hand. */
export default function Hero() {
  return (
    <section className="relative h-svh min-h-[560px] overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 px-5 pb-6 md:px-10 md:pb-9">
        <h1 className="display text-[25vw] md:text-[14.4vw]">
          <span className="block md:inline">Vishwath</span>{" "}
          <span className="block md:inline">Narayana</span>
        </h1>

        <div className="mt-6 flex items-end justify-between gap-6 md:mt-9">
          <HandwrittenResponse className="max-w-[20ch] text-[2rem] !leading-[2.6rem] md:max-w-none md:text-[2.6rem] md:!leading-[3.2rem]">
            {"==Data engineer==, photographer and ((writer))."}
          </HandwrittenResponse>
          <p className="shrink-0 text-right font-mono text-xs text-muted md:text-sm">
            <span className="hidden sm:inline">Warangal </span>
            <Clock />
          </p>
        </div>
      </div>
    </section>
  );
}
