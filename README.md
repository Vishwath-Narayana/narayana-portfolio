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

1. Export each photo as a JPG, about 2000 px on the long edge, under 2 MB, **with metadata kept** (Lightroom: Metadata → "All"; phone: don't send through WhatsApp or Instagram, which strip it).
2. Put the files in `public/photos/` and delete the `sample-*.jpg` placeholders.
3. Optional: add a title and place per file in `public/photos/captions.json`.
4. Run `npm run dev`. Camera, lens, focal length, aperture, shutter and ISO are read from each file automatically (`scripts/photos.mjs`).
