import generated from "./photos.generated.json";

export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  blur: string;
  title: string;
  chapter: string | null;
  place: string | null;
  note: string | null;
  camera: string | null;
  lens: string | null;
  focal: number | null;
  /** True when `focal` is the 35 mm equivalent (phones), not the real focal length. */
  focalEq: boolean;
  aperture: number | null;
  shutter: string | null;
  iso: number | null;
  taken: string;
  /** True when the date came from the photo itself, so it is safe to show. */
  takenExact: boolean;
};

export type Chapter = { id: string; name: string; line: string };

export const chapters: Chapter[] = [
  { id: "sky", name: "Skies", line: "Mostly the hour before dark." },
  { id: "lines", name: "Rails and roads", line: "In black and white: early light and long perspectives." },
  { id: "close", name: "Up close", line: "Small things, on a long lens and a fast fifty." },
  { id: "places", name: "Places and trees", line: "Parks, roads and a few places I passed through." },
];

/** Built by scripts/process_photos.py from the originals in photos-source. */
const all = generated as Photo[];

/** Every photo, in the order the page shows them: chapter by chapter, oldest first inside each. */
export const photos: Photo[] = chapters.flatMap((c) => all.filter((p) => p.chapter === c.id));

export function hasSettings(p: Photo) {
  return Boolean(p.aperture || p.shutter || p.iso || p.focal);
}

/** "50mm  f/1.8  1/250  ISO 100", leaving out anything the photo does not record. */
export function exposure(p: Photo): string {
  return [
    p.focal ? `${p.focal}mm` : null,
    p.aperture ? `f/${p.aperture}` : null,
    p.shutter,
    p.iso ? `ISO ${p.iso}` : null,
  ]
    .filter(Boolean)
    .join("  ");
}

export function monthYear(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}
