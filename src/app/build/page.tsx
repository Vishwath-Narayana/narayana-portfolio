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
      <section className="flex min-h-[78svh] flex-col justify-end px-5 pb-12 pt-40 md:px-10 md:pb-20">
        <h1 className="display text-[clamp(5.5rem,22vw,24rem)]">Build</h1>
        <p className="mt-8 max-w-[40ch] text-base text-muted md:text-lg">
          Three stages, one thread: make it easy to use, make it work, then make what it runs on something you can trust.
        </p>
      </section>
      <Journey />
      <Skills />
      <Projects />
    </>
  );
}
