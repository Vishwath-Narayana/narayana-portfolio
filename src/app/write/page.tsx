import type { Metadata } from "next";
import Link from "next/link";
import FrameMotion from "@/components/FrameMotion";
import { formatDate, getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Write",
  description: "Notes on technology, the night sky and the places I want to see.",
};

export default function Page() {
  const posts = getPosts();
  return (
    <>
      <FrameMotion />
      <section className="px-5 pb-24 pt-32 md:px-10 md:pb-40 md:pt-44">
        <p data-reveal className="text-sm text-muted">
          Write
        </p>
        <h1 data-reveal className="display mt-4 max-w-[13em] text-balance text-[clamp(2.4rem,5.4vw,5.6rem)] !leading-[1.04]">
          Notes on what I am learning, building and hoping to see.
        </h1>

        <ul className="mt-20 border-t border-line md:mt-32">
          {posts.map((p) => (
            <li key={p.slug} data-reveal className="border-b border-line">
              <Link
                href={`/write/${p.slug}`}
                className="group grid gap-3 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)_minmax(0,1.4fr)] md:items-baseline md:gap-10 md:py-12"
              >
                <p className="font-mono text-xs text-muted md:text-sm">{formatDate(p.date)}</p>
                <div>
                  <h2 className="display text-[clamp(1.9rem,3.6vw,3.6rem)] transition-transform duration-700 [transition-timing-function:var(--ease-out)] md:group-hover:translate-x-3">
                    {p.title}
                  </h2>
                  <p className="mt-3 max-w-[46ch] text-base text-muted">{p.summary}</p>
                </div>
                <p className="font-mono text-xs text-muted md:text-right md:text-sm">
                  {p.tag}, {p.minutes} min read
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
