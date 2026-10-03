import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { formatDate, getPost, getPosts } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const all = getPosts();
  const i = all.findIndex((p) => p.slug === slug);
  const next = all[(i + 1) % all.length];

  return (
    <article className="px-5 pb-24 pt-32 md:px-10 md:pb-40 md:pt-44">
      <Link href="/write" className="link-line pb-0.5 text-sm">
        All writing
      </Link>
      <h1 className="display mt-10 max-w-[14em] text-balance text-[clamp(2.6rem,6vw,6rem)] !leading-[1.04]">
        {post.title}
      </h1>
      <p className="mt-6 font-mono text-xs text-muted md:text-sm">
        {formatDate(post.date)}, {post.tag}, {post.minutes} min read
      </p>

      <div className="post mt-14 md:mt-24 md:ml-[calc(100%/3.4)]">
        <Markdown>{post.body}</Markdown>
      </div>

      {all.length > 1 && (
        <div className="mt-24 border-t border-line pt-8 md:mt-40">
          <p className="text-sm text-muted">Next</p>
          <Link href={`/write/${next.slug}`} className="display mt-3 block text-[clamp(1.8rem,3.4vw,3.4rem)]">
            {next.title}
          </Link>
        </div>
      )}
    </article>
  );
}
