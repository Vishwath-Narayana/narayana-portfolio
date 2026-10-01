import type { Metadata } from "next";
import StubPage from "@/components/StubPage";

export const metadata: Metadata = { title: "Frame" };

export default function Page() {
  return <StubPage title="Frame" note="The photo gallery is next, with images from Cloudinary and a morph from grid to full frame." />;
}
