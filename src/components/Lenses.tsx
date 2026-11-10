import { TransitionLink } from "./Transition";
import { projects } from "@/data/build";
import { photos } from "@/data/photos";
import { getPosts } from "@/lib/posts";

type Lens = { href: string; title: string; text: string; count: string };

function Row({ n, title, text, count }: Lens & { n: number }) {
  return (
    <div className="flex flex-col justify-between gap-6 px-5 py-8 md:flex-row md:items-end md:px-10 md:py-12">
      <span className="flex items-start gap-4 md:gap-8">
        <span className="pt-[1.2vw] font-mono text-xs md:text-sm">{String(n).padStart(2, "0")}</span>
        <span className="display text-[clamp(5.5rem,19vw,19rem)]">{title}</span>
      </span>
      <span className="flex max-w-[30ch] flex-col gap-3 md:pb-[2.2vw] md:text-right">
        <span className="font-mono text-xs opacity-60 md:text-sm">{count}</span>
        <span className="text-base leading-snug md:text-lg">{text}</span>
      </span>
    </div>
  );
}

/**
 * The three ways into the work. Hovering a row floods it with the opposite
 * theme from the bottom, so the choice feels physical.
 */
export default function Lenses() {
  const lenses: Lens[] = [
    {
      href: "/build",
      title: "Build",
      text: "Data pipelines, cloud systems and the products built on top of them.",
      count: `${projects.length} projects`,
    },
    {
      href: "/frame",
      title: "Frame",
      text: "Photographs of ordinary light, kept in series.",
      count: `${photos.length} photographs`,
    },
    {
      href: "/write",
      title: "Write",
      text: "Notes on technology and daily life, and what I make of them.",
      count: `${getPosts().length} notes`,
    },
  ];

  return (
    <section aria-label="Work" className="border-b border-line">
      {lenses.map((lens, i) => (
        <TransitionLink
          key={lens.href}
          href={lens.href}
          className="group relative block overflow-hidden border-t border-line"
        >
          <Row n={i + 1} {...lens} />
          <div
            aria-hidden
            className="absolute inset-0 bg-fg text-bg transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] [clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0)] group-focus-visible:[clip-path:inset(0)]"
          >
            <Row n={i + 1} {...lens} />
          </div>
        </TransitionLink>
      ))}
    </section>
  );
}
