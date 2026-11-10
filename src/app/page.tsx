import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Practices from "@/components/home/Practices";
import { projects } from "@/data/build";
import { photos } from "@/data/photos";
import { getPosts } from "@/lib/posts";

/** The prints shown in the Frame chapter, back to front. */
const PRINTS = ["img6", "img24", "img31"];

export default function Home() {
  const prints = PRINTS.map((id) => photos.find((p) => p.id === id))
    .filter((p) => p !== undefined)
    .map(({ id, src, blur, title }) => ({ id, src, blur, title }));
  const posts = getPosts().map(({ slug, title, date, tag }) => ({ slug, title, date, tag }));

  return (
    <>
      <Hero />
      <Statement />
      <Practices
        projects={projects.map((p) => p.name)}
        photos={prints}
        photoCount={photos.length}
        posts={posts}
      />
    </>
  );
}
