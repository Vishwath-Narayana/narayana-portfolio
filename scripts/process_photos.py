#!/usr/bin/env python3
"""
Turns the original photos in photos-source/ into web copies and a data file for the Frame page.

  pip install pillow pillow-heif
  python3 scripts/process_photos.py

For every photo (JPG, PNG, HEIC):
  - saves a resized JPEG in public/photos/ with ALL metadata removed, so GPS location and device
    details are never published;
  - reads the camera settings from the original and writes them to src/data/photos.generated.json.
Titles, chapters and any settings the photo did not record live in src/data/captions.json.
"""
import base64, io, json, os, re, sys
from datetime import datetime, timezone
from pathlib import Path

import pillow_heif
from PIL import Image, ImageOps

pillow_heif.register_heif_opener()

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "photos-source"
OUT = ROOT / "public" / "photos"
DATA = ROOT / "src" / "data" / "photos.generated.json"
CAPTIONS = ROOT / "src" / "data" / "captions.json"
LONG_EDGE = 2400
EXTS = {".jpg", ".jpeg", ".png", ".heic", ".webp"}

CAMERA_NAMES = {"ILCE-6400": "Sony α6400"}


def num(v):
    try:
        return float(v)
    except Exception:
        return None


def clean_camera(make, model):
    make = (make or "").strip().strip("\x00")
    model = (model or "").strip().strip("\x00")
    if model in CAMERA_NAMES:
        return CAMERA_NAMES[model]
    if make and model and not model.lower().startswith(make.lower()):
        return f"{make.title() if make.isupper() else make} {model}"
    return model or make or None


def shutter_text(t):
    t = num(t)
    if not t:
        return None
    if t >= 1:
        return f"{t:g}s"
    return f"1/{round(1 / t)}"


def fnum(f):
    f = num(f)
    return None if not f else round(f, 1)


def read_meta(img, path):
    ex = img.getexif()
    sub = ex.get_ifd(0x8769)  # Exif sub-IFD
    make, model = ex.get(271), ex.get(272)
    camera = clean_camera(make, model)
    is_phone = (make or "").strip().lower() == "apple"
    focal = num(sub.get(0x920A))
    focal35 = num(sub.get(0xA405))
    lens = sub.get(0xA434)
    if lens and is_phone:
        lens = None  # phone lens strings repeat the model name and the focal length
    if lens:
        lens = lens.strip().strip("\x00")

    shown_focal, eq = focal, False
    if is_phone and focal35:
        shown_focal, eq = focal35, True

    taken, exact = None, False
    raw = sub.get(0x9003) or ex.get(306)
    if raw:
        try:
            taken = datetime.strptime(str(raw), "%Y:%m:%d %H:%M:%S").isoformat()
            exact = True
        except Exception:
            pass
    if not taken:
        taken = datetime.fromtimestamp(os.path.getmtime(path), timezone.utc).replace(tzinfo=None).isoformat(timespec="seconds")

    return {
        "camera": camera,
        "lens": lens or None,
        "focal": round(shown_focal) if shown_focal else None,
        "focalEq": eq,
        "aperture": fnum(sub.get(0x829D)),
        "shutter": shutter_text(sub.get(0x829A)),
        "iso": int(sub.get(0x8827)) if sub.get(0x8827) else None,
        "taken": taken,
        "takenExact": exact,
    }


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    captions = json.loads(CAPTIONS.read_text()) if CAPTIONS.exists() else {}
    files = sorted(p for p in SRC.iterdir() if p.suffix.lower() in EXTS)
    if not files:
        sys.exit(f"No photos found in {SRC}")

    keep = set()
    photos = []
    for path in files:
        pid = re.sub(r"[^a-z0-9]+", "-", path.stem.lower()).strip("-")
        img = Image.open(path)
        meta = read_meta(img, path)
        img = ImageOps.exif_transpose(img).convert("RGB")
        img.thumbnail((LONG_EDGE, LONG_EDGE), Image.LANCZOS)
        out = OUT / f"{pid}.jpg"
        img.save(out, "JPEG", quality=82, optimize=True, progressive=True)  # no exif= argument: metadata is dropped
        keep.add(out.name)

        tiny = img.copy()
        tiny.thumbnail((16, 16))
        buf = io.BytesIO()
        tiny.save(buf, "JPEG", quality=50)
        blur = "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()

        cap = captions.get(pid, {})
        entry = {
            "id": pid,
            "src": f"/photos/{pid}.jpg",
            "width": img.width,
            "height": img.height,
            "blur": blur,
            "title": cap.get("title") or pid,
            "chapter": cap.get("chapter"),
            "place": cap.get("place"),
            "note": cap.get("note"),
            **meta,
        }
        # A hand-set "order" (from the original file time) keeps undated photos in sequence.
        if not meta["takenExact"] and cap.get("order"):
            entry["taken"] = cap["order"]
        # Anything the photo did not record can be filled in by hand in captions.json.
        for k in ("camera", "lens", "focal", "aperture", "shutter", "iso"):
            if k in cap and not entry.get(k):
                entry[k] = cap[k]
        photos.append(entry)

    for stale in OUT.glob("*.jpg"):
        if stale.name not in keep:
            stale.unlink()

    photos.sort(key=lambda p: p["taken"])
    DATA.write_text(json.dumps(photos, indent=1, ensure_ascii=False) + "\n")
    n_meta = sum(1 for p in photos if p["aperture"] or p["shutter"])
    print(f"{len(photos)} photos written, {n_meta} with camera settings")


if __name__ == "__main__":
    main()
