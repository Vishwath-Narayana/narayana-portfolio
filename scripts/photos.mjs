/**
 * Reads every photo in public/photos, pulls the camera settings out of its own metadata,
 * and writes src/data/photos.generated.json for the Frame page.
 * Optional titles and places live in public/photos/captions.json.
 */
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import exifr from "exifr";

const dir = path.join(process.cwd(), "public", "photos");
const out = path.join(process.cwd(), "src", "data", "photos.generated.json");
const exts = new Set([".jpg", ".jpeg", ".png", ".webp"]);

let captions = {};
try {
  captions = JSON.parse(await readFile(path.join(dir, "captions.json"), "utf8"));
} catch {}

const fraction = (t) => {
  if (!t) return null;
  if (t >= 1) return `${Number.isInteger(t) ? t : t.toFixed(1)}s`;
  return `1/${Math.round(1 / t)}`;
};

const files = (await readdir(dir)).filter((f) => exts.has(path.extname(f).toLowerCase())).sort();
const photos = [];

for (const file of files) {
  const full = path.join(dir, file);
  const buf = await readFile(full);
  const meta = await sharp(buf).metadata();
  // sharp reports stored size; swap when the orientation tag says the image is turned.
  const turned = meta.orientation && meta.orientation >= 5;
  const width = turned ? meta.height : meta.width;
  const height = turned ? meta.width : meta.height;
  const blur = (await sharp(buf).rotate().resize(16).blur(1).jpeg({ quality: 50 }).toBuffer()).toString("base64");

  let exif = {};
  try {
    exif = (await exifr.parse(buf, { pick: ["Make", "Model", "LensModel", "FocalLength", "FNumber", "ExposureTime", "ISO", "DateTimeOriginal"] })) ?? {};
  } catch {}

  const cap = captions[file] ?? {};
  photos.push({
    file,
    src: `/photos/${file}`,
    width,
    height,
    blur: `data:image/jpeg;base64,${blur}`,
    title: cap.title ?? path.basename(file, path.extname(file)).replace(/[-_]+/g, " "),
    place: cap.place ?? null,
    note: cap.note ?? null,
    camera: [exif.Make, exif.Model].filter(Boolean).join(" ") || null,
    lens: exif.LensModel ?? null,
    focal: exif.FocalLength ? Math.round(exif.FocalLength) : null,
    aperture: exif.FNumber ?? null,
    shutter: fraction(exif.ExposureTime),
    iso: exif.ISO ?? null,
    taken: exif.DateTimeOriginal ? new Date(exif.DateTimeOriginal).toISOString() : null,
  });
}

// Newest first. Photos without a date keep their file-name order at the end.
photos.sort((a, b) => (b.taken ?? "").localeCompare(a.taken ?? ""));

await mkdir(path.dirname(out), { recursive: true });
await writeFile(out, JSON.stringify(photos, null, 2) + "\n");
console.log(`photos: ${photos.length} written`);
