import Image from "next/image";
import Link from "next/link";
import { photos } from "@/data/photos";

/** The whole roll as one aligned contact sheet. Each frame opens on its own page. */
export default function Gallery() {
  return (
    <section className="px-5 pb-24 md:px-10 md:pb-40">
      <p data-reveal className="text-sm text-muted">
        The roll
      </p>
      <ul className="dim-siblings mt-5 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 md:gap-3">
        {photos.map((p) => (
          <li key={p.id} data-thumb className="transition-opacity duration-500">
            <Link
              href={`/frame/${p.id}`}
              aria-label={`Open ${p.title}`}
              className="relative block aspect-[3/4] w-full overflow-hidden"
            >
              <Image
                src={p.src}
                alt={p.title}
                fill
                sizes="(min-width: 768px) 12vw, 25vw"
                placeholder="blur"
                blurDataURL={p.blur}
                className="object-cover"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
