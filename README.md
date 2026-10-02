# Vishwath Narayana: portfolio

Black and white portfolio for a data engineer who also photographs and writes.
Three lenses: **Build**, **Frame**, **Write**.

## Stack

Next.js (App Router), TypeScript, Tailwind v4, GSAP + ScrollTrigger, Lenis, Motion.
Type: Instrument Serif and Geist (self-hosted through npm packages).

## Run

```bash
npm install
npm run dev
```

## Structure

- `src/app` routes and global design tokens (`globals.css`)
- `src/components` hero, sections, nav, footer, route and theme transitions
- Branches: work happens on `dev`; each phase is merged into `main` after review.

## Status

- Done: design system, theme invert, iris route transition, landing page
- Next: Frame (gallery), Build (case studies), Write (MDX blog), About and contact

## Adding photos

1. Put originals (JPG, PNG, HEIC, WebP) in `photos-source/` (gitignored).
2. `pip install pillow pillow-heif`, then `npm run photos`.
3. The script writes web JPEGs to `public/photos/` and `src/data/photos.generated.json`. Camera, focal length, aperture, shutter and ISO are read from EXIF. **All metadata, including GPS, is stripped from the published files.**
4. Titles, chapters, places and manual setting overrides (for photos with no EXIF) live in `src/data/captions.json`.
