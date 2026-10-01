"use client";

import { usePathname } from "next/navigation";
import { TransitionLink } from "./Transition";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/build", label: "Build" },
  { href: "/frame", label: "Frame" },
  { href: "/write", label: "Write" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 text-white mix-blend-difference">
      <div className="flex items-center justify-between px-5 py-4 md:px-10 md:py-6">
        <TransitionLink href="/" className="text-sm font-medium tracking-tight">
          <span className="sm:hidden">Vishwath</span>
          <span className="hidden sm:inline">Vishwath Narayana</span>
        </TransitionLink>

        <nav aria-label="Main" className="flex items-center gap-4 text-sm md:gap-8">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <TransitionLink
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className="link-line"
                style={active ? { backgroundSize: "100% 1px" } : undefined}
              >
                {link.label}
              </TransitionLink>
            );
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
