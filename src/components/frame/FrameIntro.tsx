export default function FrameIntro() {
  return (
    <section className="px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44">
      <p data-reveal className="text-sm text-muted">
        Frame
      </p>
      <h1 data-reveal className="display mt-4 max-w-[13em] text-balance !leading-[1.04] text-[clamp(2.4rem,5.4vw,5.6rem)]">
        I photograph what light does to ordinary places.
      </h1>

      <div className="mt-14 grid gap-10 md:mt-24 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] md:gap-16">
        <p data-reveal className="text-sm text-muted">
          Why I shoot
        </p>
        <div className="max-w-[54ch] space-y-5 text-base leading-relaxed md:text-lg">
          <p data-reveal>
            Photography is my other half. I do not shoot to document an event. I shoot to keep how a place felt at one
            moment of the day, before the light changes.
          </p>
          <p data-reveal>
            It started as a hobby and became part of my work too: I have shot and edited content for brands and for
            my college. It is also where my eye for design comes from.
          </p>
          <p data-reveal className="text-muted">
            Under each photo is what I set the camera to. Open one to see it larger, with everything the file
            remembers.
          </p>
        </div>
      </div>
    </section>
  );
}
