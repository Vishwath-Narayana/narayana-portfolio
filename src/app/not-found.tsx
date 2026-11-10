import { TransitionLink } from "@/components/Transition";

export default function NotFound() {
  return (
    <section className="flex min-h-svh flex-col justify-end px-5 pb-16 pt-40 md:px-10 md:pb-24">
      <p className="font-mono text-xs text-muted md:text-sm">Error 404</p>
      <h1 className="display mt-4 text-[clamp(5.5rem,22vw,24rem)]">Overexposed.</h1>
      <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <p className="max-w-[38ch] text-base text-muted md:text-lg">
          This page was never developed. The light got in before the shutter closed, and nothing was kept.
        </p>
        <nav aria-label="Ways back" className="flex gap-8 text-base md:text-lg">
          <TransitionLink href="/" className="link-line pb-0.5">
            Home
          </TransitionLink>
          <TransitionLink href="/build" className="link-line pb-0.5">
            Build
          </TransitionLink>
          <TransitionLink href="/frame" className="link-line pb-0.5">
            Frame
          </TransitionLink>
        </nav>
      </div>
    </section>
  );
}
