import generated from "./photos.generated.json";

export type Photo = {
  file: string;
  src: string;
  width: number;
  height: number;
  blur: string;
  title: string;
  place: string | null;
  note: string | null;
  camera: string | null;
  lens: string | null;
  focal: number | null;
  aperture: number | null;
  shutter: string | null;
  iso: number | null;
  taken: string | null;
};

/** Built by scripts/photos.mjs from the files in public/photos. */
export const photos = generated as Photo[];

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
