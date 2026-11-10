import type { Metadata } from "next";
import FrameMotion from "@/components/FrameMotion";
import NoteList from "@/components/write/NoteList";
import { formatDate, getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Write",
  description: "Notes on technology, the night sky and the places I want to see.",
};

export default function Page() {
  const posts = getPosts();
  const minutes = posts.reduce((sum, p) => sum + p.minutes, 0);

  return (
    <>
      <FrameMotion />
      <section className="px-5 pb-24 pt-32 md:px-10 md:pb-40 md:pt-44">
        <div className="flex items-baseline justify-between gap-6">
          <p data-reveal className="font-mono text-xs text-muted md:text-sm">
            Write
          </p>
          <p data-reveal className="font-mono text-xs text-muted md:text-sm">
            {posts.length} notes &middot; {minutes} min in all &middot;{" "}
            <a href="/write/rss.xml" className="link-line text-fg">
              RSS
            </a>
          </p>
        </div>
        <h1 data-reveal className="display mt-4 max-w-[13em] text-balance text-[clamp(2.4rem,5.4vw,5.6rem)] !leading-[1.04]">
          Notes on what I am learning, building and hoping to see.
        </h1>

        <NoteList
          notes={posts.map((p) => ({
            slug: p.slug,
            title: p.title,
            summary: p.summary,
            tag: p.tag,
            minutes: p.minutes,
            date: p.date,
            dateLabel: formatDate(p.date),
          }))}
        />
      </section>
    </>
  );
}
