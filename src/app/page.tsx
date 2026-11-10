import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Lenses from "@/components/Lenses";
import Roll, { type RollFrame } from "@/components/home/Roll";
import { chapters, exposure, photos } from "@/data/photos";

/** The frames the home page strip shows, in this order. */
const PICKS = ["img31", "img4", "img6", "img24", "img32", "img21", "img12", "img26", "img16"];

export default function Home() {
  const frames: RollFrame[] = PICKS.map((id) => photos.find((p) => p.id === id))
    .filter((p) => p !== undefined)
    .map((p) => ({
      id: p.id,
      src: p.src,
      blur: p.blur,
      title: p.title,
      meta: exposure(p) || (chapters.find((c) => c.id === p.chapter)?.name ?? ""),
    }));

  return (
    <>
      <Hero />
      <Statement />
      <Roll frames={frames} total={photos.length} />
      <Lenses />
    </>
  );
}
