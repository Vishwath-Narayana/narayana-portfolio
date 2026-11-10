"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { TransitionLink } from "./Transition";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/build", label: "Build" },
  { href: "/frame", label: "Frame" },
  { href: "/write", label: "Write" },
  { href: "/about", label: "About" },
];

/** A label that rolls up on hover: the word slides out the top while its copy slides in from below. */
function Roll({ children }: { children: string }) {
  return (
    <span className="relative inline-flex overflow-hidden">
      <span className="transition-transform duration-500 [transition-timing-function:var(--ease-out)] group-hover:-translate-y-full group-focus-visible:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 translate-y-full transition-transform duration-500 [transition-timing-function:var(--ease-out)] group-hover:translate-y-0 group-focus-visible:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}

/**
 * The bar has no ground of its own. It is drawn in difference mode, so it reads as light on
 * dark sections and dark on light ones, photos included. It steps out of the way while you
 * scroll down and comes back the moment you scroll up.
 */
export default function Nav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - last.current;
      setScrolled(y >= 120);
      if (y < 120) setHidden(false);
      else if (delta > 6) setHidden(true);
      else if (delta < -6) setHidden(false);
      last.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Once the page has moved, a colourless blur keeps text from running through the bar. */}
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-x-0 top-0 z-40 h-20 backdrop-blur-md transition-[opacity,translate] duration-700 [mask-image:linear-gradient(to_bottom,black_45%,transparent)] [transition-timing-function:var(--ease-inout)] md:h-24 ${
          scrolled && !hidden ? "opacity-100" : "opacity-0"
        } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
      />
      <header
        className={`fixed inset-x-0 top-0 z-50 text-[#fafafa] mix-blend-difference transition-transform duration-700 [transition-timing-function:var(--ease-inout)] ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 md:px-10 md:py-6">
          <TransitionLink href="/" aria-label="Vishwath Narayana, home" className="group text-sm font-medium tracking-tight">
            <Roll>Vishwath</Roll>
            <span className="hidden sm:inline">
              {" "}
              <Roll>Narayana</Roll>
            </span>
          </TransitionLink>

          <nav aria-label="Main" className="flex items-center gap-5 text-sm md:gap-8">
            {links.map((link, i) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <TransitionLink
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className="group relative inline-flex items-baseline"
                >
                  <span
                    aria-hidden
                    className={`absolute -left-2.5 top-1/2 size-[5px] -translate-y-1/2 rounded-full bg-current transition-[opacity,scale] duration-500 ${
                      active ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
                  />
                  <Roll>{link.label}</Roll>
                  <span aria-hidden className="relative -top-[0.5em] ml-1 hidden font-mono text-[0.6rem] opacity-50 sm:inline">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </TransitionLink>
              );
            })}
            <ThemeToggle />
          </nav>
        </div>
      </header>
    </>
  );
}
