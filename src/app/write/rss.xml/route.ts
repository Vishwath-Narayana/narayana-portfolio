import { getPosts } from "@/lib/posts";

export const dynamic = "force-static";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const items = getPosts()
    .map(
      (p) => `<item><title>${esc(p.title)}</title><link>${site}/write/${p.slug}</link><guid>${site}/write/${p.slug}</guid><pubDate>${new Date(p.date).toUTCString()}</pubDate><description>${esc(p.summary)}</description></item>`,
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Vishwath Narayana, Write</title><link>${site}/write</link><description>Notes on technology, the night sky and the places I want to see.</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
