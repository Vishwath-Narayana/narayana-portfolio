import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tag: string;
  minutes: number;
  body: string;
};

const dir = path.join(process.cwd(), "content", "write");

/** Every post in content/write, newest first. A post with `draft: true` is hidden in production. */
export function getPosts(): Post[] {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
      if (data.draft && process.env.NODE_ENV === "production") return null;
      const words = content.trim().split(/\s+/).length;
      return {
        slug: file.replace(/\.md$/, ""),
        title: String(data.title),
        date: new Date(data.date).toISOString().slice(0, 10),
        summary: String(data.summary ?? ""),
        tag: String(data.tag ?? ""),
        minutes: Math.max(1, Math.round(words / 220)),
        body: content,
      } satisfies Post;
    })
    .filter((p): p is Post => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
  return getPosts().find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
