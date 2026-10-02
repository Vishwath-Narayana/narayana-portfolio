import type { Metadata } from "next";
import BuildMotion from "@/components/BuildMotion";
import Journey from "@/components/build/Journey";
import Skills from "@/components/build/Skills";
import Projects from "@/components/build/Projects";

export const metadata: Metadata = {
  title: "Build",
  description:
    "From UI and UX design to full-stack development to data engineering: the journey, the skills and the projects.",
};

export default function Page() {
  return (
    <>
      <BuildMotion />
      <Journey />
      <Skills />
      <Projects />
    </>
  );
}
