"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { getLenis } from "@/lib/lenis";

type Navigate = (href: string, origin?: { x: number; y: number }) => void;

const NavigateContext = createContext<Navigate>(() => {});

/**
 * Route changes are an iris: a disc of the opposite theme grows from the
 * click point until it covers the screen, the route swaps underneath,
 * then the disc closes toward the centre and reveals the new page.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlay = useRef<HTMLDivElement>(null);
  const pending = useRef(false);
  const busy = useRef(false);

  const reveal = useCallback(() => {
    const el = overlay.current;
    if (!el) return;
    pending.current = false;

    getLenis()?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);

    const r = Math.hypot(window.innerWidth, window.innerHeight);
    gsap.set(el, { clipPath: `circle(${r}px at 50% 50%)` });
    gsap.to(el, {
      clipPath: "circle(0px at 50% 50%)",
      duration: 0.85,
      ease: "power3.inOut",
      delay: 0.05,
      onComplete: () => {
        gsap.set(el, { visibility: "hidden" });
        busy.current = false;
      },
    });
  }, []);

  // The new route has mounted: open the iris.
  useEffect(() => {
    if (pending.current) reveal();
  }, [pathname, reveal]);

  const navigate = useCallback<Navigate>(
    (href, origin) => {
      const el = overlay.current;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!el || reduce) {
        router.push(href);
        return;
      }
      if (busy.current) return;

      busy.current = true;
      pending.current = true;

      const x = origin?.x ?? window.innerWidth / 2;
      const y = origin?.y ?? window.innerHeight / 2;
      const r = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

      gsap.set(el, { visibility: "visible", clipPath: `circle(0px at ${x}px ${y}px)` });
      gsap.to(el, {
        clipPath: `circle(${r}px at ${x}px ${y}px)`,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          router.push(href);
          // If the route never reports back, do not leave the screen covered.
          window.setTimeout(() => {
            if (pending.current) reveal();
          }, 2500);
        },
      });
    },
    [router, reveal],
  );

  return (
    <NavigateContext.Provider value={navigate}>
      {children}
      <div
        ref={overlay}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[100] bg-fg"
        style={{ visibility: "hidden" }}
      />
    </NavigateContext.Provider>
  );
}

export function TransitionLink({
  href,
  onClick,
  children,
  ...rest
}: ComponentProps<typeof Link>) {
  const navigate = useContext(NavigateContext);
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const target = typeof href === "string" ? href : (href.pathname ?? "");
    if (!target.startsWith("/") || target.startsWith("//")) return;

    e.preventDefault();
    if (target === pathname) return;

    // Keyboard activation reports 0 clicks, so open from the centre instead.
    navigate(target, e.detail === 0 ? undefined : { x: e.clientX, y: e.clientY });
  };

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
