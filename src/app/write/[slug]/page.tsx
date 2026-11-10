import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { formatDate, getPost, getPosts } from "@/lib/posts";
import ReadingProgress from "@/components/ReadingProgress";
import { TransitionLink } from "@/components/Transition";
import CopyLink from "@/components/write/CopyLink";

type Props = { params: Promise<{ slug: string }> };

const pad = (n: number) => String(n).padStart(2, "0");

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  return p
    ? {
        title: p.title,
        description: p.summary,
        openGraph: { type: "article", title: p.title, description: p.summary, publishedTime: p.date },
      }
    : {};
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const all = getPosts();
  const i = all.findIndex((p) => p.slug === slug);
  const prev = all[(i - 1 + all.length) % all.length];
  const next = all[(i + 1) % all.length];

  const facts = [
    ["Published", <time key="t" dateTime={post.date}>{formatDate(post.date)}</time>],
    ["Topic", post.tag],
    ["Reading", `${post.minutes} min`],
  ] as const;

  return (
    <article className="px-5 pb-24 pt-32 md:px-10 md:pb-40 md:pt-44">
      <ReadingProgress />

      <header className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] md:gap-16">
        <TransitionLink
          href="/write"
          className="group inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-[0.1em] text-muted transition-colors hover:text-fg md:pt-3"
        >
          <span aria-hidden className="transition-transform duration-500 group-hover:-translate-x-1">
            &larr;
          </span>
          All notes
        </TransitionLink>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
            No. {pad(i + 1)} &middot; {post.tag}
          </p>
          <h1 className="display mt-4 max-w-[14em] text-balance text-[clamp(2.8rem,6.4vw,6.6rem)] !leading-[1.0]">
            {post.title}
          </h1>
          {post.summary && (
            <p className="display mt-8 max-w-[26ch] text-[clamp(1.5rem,2.3vw,2.3rem)] !leading-[1.2] text-[color-mix(in_oklab,var(--fg)_72%,var(--bg))]">
              {post.summary}
            </p>
          )}
        </div>
      </header>

      <div className="mt-14 grid gap-10 border-t border-line pt-10 md:mt-24 md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] md:gap-16 md:pt-14">
        <aside className="md:sticky md:top-28 md:self-start">
          <dl className="grid grid-cols-3 gap-4 md:grid-cols-1 md:gap-5">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted">{k}</dt>
                <dd className="mt-1 text-sm">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 hidden md:block">
            <CopyLink />
          </div>
        </aside>

        <div className="post">
          <Markdown
            components={{
              a: ({ href, children }) =>
                href?.startsWith("http") ? (
                  <a href={href} target="_blank" rel="noreferrer">
                    {children}
                  </a>
                ) : (
                  <a href={href}>{children}</a>
                ),
            }}
          >
            {post.body}
          </Markdown>
          <p className="mt-16 font-mono text-xs uppercase tracking-[0.1em] text-muted">&mdash; Vishwath</p>
        </div>
      </div>

      {all.length > 1 && (
        <nav aria-label="More notes" className="mt-24 grid border-t border-line md:mt-40 md:grid-cols-2">
          {[
            { label: "Previous", note: prev, align: "" },
            { label: "Next", note: next, align: "md:text-right md:border-l md:border-line md:pl-10" },
          ].map(({ label, note, align }) => (
            <TransitionLink
              key={label}
              href={`/write/${note.slug}`}
              className={`group block border-b border-line py-8 md:border-b-0 md:py-12 ${align} ${label === "Previous" ? "md:pr-10" : ""}`}
            >
              <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
                {label === "Previous" ? "← " : ""}
                {label}
                {label === "Next" ? " →" : ""}
              </span>
              <span className="display mt-3 block text-balance text-[clamp(1.9rem,3.4vw,3.6rem)] transition-opacity duration-500 group-hover:opacity-60">
                {note.title}
              </span>
              <span className="mt-2 block text-sm text-muted">{note.summary}</span>
            </TransitionLink>
          ))}
        </nav>
      )}
    </article>
  );
}
