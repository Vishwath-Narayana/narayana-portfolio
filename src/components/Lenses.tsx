import { TransitionLink } from "./Transition";

const lenses = [
  {
    href: "/build",
    title: "Build",
    text: "Data pipelines, cloud systems and the products built on top of them.",
  },
  {
    href: "/frame",
    title: "Frame",
    text: "Photographs of ordinary light, kept in series.",
  },
  {
    href: "/write",
    title: "Write",
    text: "Notes on technology and daily life, and what I make of them.",
  },
];

function Row({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex flex-col justify-between gap-6 px-5 py-8 md:flex-row md:items-end md:px-10 md:py-12">
      <span className="display text-[clamp(5.5rem,19vw,19rem)]">{title}</span>
      <span className="max-w-[26ch] text-base leading-snug md:pb-[2.2vw] md:text-lg">{text}</span>
    </div>
  );
}

/**
 * The three ways into the work. Hovering a row floods it with the opposite
 * theme from the bottom, so the choice feels physical.
 */
export default function Lenses() {
  return (
    <section aria-label="Work" className="border-b border-line">
      {lenses.map((lens) => (
        <TransitionLink
          key={lens.href}
          href={lens.href}
          className="group relative block overflow-hidden border-t border-line"
        >
          <Row title={lens.title} text={lens.text} />
          <div
            aria-hidden
            className="absolute inset-0 bg-fg text-bg transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] [clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0)] group-focus-visible:[clip-path:inset(0)]"
          >
            <Row title={lens.title} text={lens.text} />
          </div>
        </TransitionLink>
      ))}
    </section>
  );
}
