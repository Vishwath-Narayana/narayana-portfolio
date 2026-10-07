"use client";

import Clock from "./Clock";
import { getLenis } from "@/lib/lenis";

const EMAIL = "vishwathnarayanathm19@gmail.com";

export default function Footer() {
  const toTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0 });
  };

  return (
    <footer className="flip relative px-5 pb-6 pt-28 md:px-10 md:pt-44">
      <p className="display text-[clamp(4.5rem,17vw,19rem)]">Say hello.</p>

      <a
        href={`mailto:${EMAIL}`}
        className="link-line mt-10 inline-block break-all text-[clamp(1.35rem,3.4vw,3.2rem)] font-light leading-tight tracking-tight md:mt-14"
      >
        {EMAIL}
      </a>

      <div className="mt-24 grid gap-10 border-t border-line pt-6 text-sm md:mt-40 md:grid-cols-3">
        <div>
          <p className="text-muted">Elsewhere</p>
          <div className="mt-1 flex gap-5">
            {[
              ["GitHub", "https://github.com/Vishwath-Narayana"],
              ["LinkedIn", "https://www.linkedin.com/in/vishwath-t-3563702a0"],
              ["Instagram", "https://www.instagram.com/_its_vishu_u"],
            ].map(([name, href]) => (
              <a key={name} href={href} target="_blank" rel="noreferrer" className="link-line inline-block">
                {name}
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="text-muted">Based in</p>
          <p className="mt-1">Warangal, Telangana, India</p>
        </div>
        <div>
          <p className="text-muted">Local time</p>
          <p className="mt-1 font-mono">
            <Clock />
          </p>
        </div>
      </div>

      <div className="mt-16 flex items-center justify-between text-sm text-muted md:mt-24">
        <p>© 2026 Vishwath Narayana Thoutam</p>
        <button type="button" onClick={toTop} className="link-line">
          Back to top
        </button>
      </div>
    </footer>
  );
}
