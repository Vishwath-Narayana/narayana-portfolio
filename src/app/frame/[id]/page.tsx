import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PhotoKeys from "@/components/frame/PhotoKeys";
import { chapters, hasSettings, monthYear, photos } from "@/data/photos";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return photos.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = photos.find((x) => x.id === id);
  return p ? { title: p.title, description: `${p.title}, a photograph by Vishwath Narayana.` } : {};
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const i = photos.findIndex((x) => x.id === id);
  if (i < 0) notFound();
  const p = photos[i];
  const prev = photos[(i - 1 + photos.length) % photos.length];
  const next = photos[(i + 1) % photos.length];
  const chapter = chapters.find((c) => c.id === p.chapter);

  const rows = [
    ["Camera", p.camera],
    ["Lens", p.lens],
    ["Focal length", p.focal ? `${p.focal} mm${p.focalEq ? " equiv." : ""}` : null],
    ["Aperture", p.aperture ? `f/${p.aperture}` : null],
    ["Shutter", p.shutter ? (p.shutter.endsWith("s") ? p.shutter : `${p.shutter} s`) : null],
    ["ISO", p.iso ? String(p.iso) : null],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <div className="relative flex min-h-svh flex-col px-5 pb-8 pt-24 md:px-10 md:pt-28">
      <PhotoKeys prev={`/frame/${prev.id}`} next={`/frame/${next.id}`} />
      <div className="flex items-center justify-between text-sm">
        <Link href="/frame" className="link-line pb-0.5">
          Close
        </Link>
        <div className="flex gap-6">
          <Link href={`/frame/${prev.id}`} className="link-line pb-0.5">
            Previous
          </Link>
          <Link href={`/frame/${next.id}`} className="link-line pb-0.5">
            Next
          </Link>
        </div>
      </div>

      {/* Fixed-height stage so the page does not jump between photos of different shapes. */}
      <div className="my-6 flex h-[62svh] items-center justify-center md:my-8 md:h-[66svh]">
        <Image
          key={p.id}
          src={p.src}
          alt={p.title}
          width={p.width}
          height={p.height}
          priority
          sizes="100vw"
          className="h-auto max-h-full w-auto max-w-full object-contain"
        />
      </div>

      {/* Warm the neighbours so Next and Previous show the picture straight away. */}
      <div aria-hidden className="pointer-events-none absolute size-0 overflow-hidden opacity-0">
        {[prev, next].map((n) => (
          <Image key={n.id} src={n.src} alt="" width={n.width} height={n.height} sizes="100vw" loading="eager" />
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
        <div>
          <h1 className="display text-3xl md:text-5xl">{p.title}</h1>
          <p className="mt-2 text-sm text-muted">
            {[p.place, chapter?.name, p.takenExact ? monthYear(p.taken) : null].filter(Boolean).join(", ")}
          </p>
          {p.note && <p className="mt-3 max-w-[40ch] text-sm">{p.note}</p>}
        </div>
        {rows.length || hasSettings(p) ? (
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm sm:grid-cols-3 md:grid-cols-4">
            {rows.map(([k, v]) => (
              <div key={k}>
                <dt className="text-muted">{k}</dt>
                <dd className="mt-0.5 font-mono text-[0.8rem]">{v}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="self-end text-sm text-muted">No camera data was saved with this photo.</p>
        )}
      </div>
    </div>
  );
}
