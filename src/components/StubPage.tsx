/** Holding page for sections that are next in the build. */
export default function StubPage({ title, note }: { title: string; note: string }) {
  return (
    <section className="flex min-h-svh flex-col justify-end px-5 pb-16 pt-40 md:px-10 md:pb-24">
      <h1 className="display text-[clamp(5.5rem,22vw,24rem)]">{title}</h1>
      <p className="mt-8 max-w-[34ch] text-base text-muted md:text-lg">{note}</p>
    </section>
  );
}
