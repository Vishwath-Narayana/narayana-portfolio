import type { Metadata } from "next";
import FrameMotion from "@/components/FrameMotion";
import FrameIntro from "@/components/frame/FrameIntro";
import Gallery from "@/components/frame/Gallery";

export const metadata: Metadata = {
  title: "Frame",
  description: "Photographs of ordinary light, each with the camera settings it was taken with.",
};

export default function Page() {
  return (
    <>
      <FrameMotion />
      <FrameIntro />
      <Gallery />
    </>
  );
}
