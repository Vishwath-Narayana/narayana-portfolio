import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Vishwath Narayana — Data engineer, photographer and writer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The share card: the name in the site's serif, black on white, nothing else. */
export default async function Image() {
  const serif = await readFile(
    path.join(process.cwd(), "node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000",
          color: "#fafafa",
          padding: "64px 72px",
          fontFamily: "Serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, opacity: 0.6 }}>
          <span>Build / Frame / Write</span>
          <span>Warangal, India</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 168, lineHeight: 0.92, letterSpacing: -4 }}>Vishwath Narayana</div>
          <div style={{ fontSize: 44, marginTop: 28, opacity: 0.75 }}>Data engineer, photographer and writer.</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Serif", data: serif, style: "normal", weight: 400 }] },
  );
}
