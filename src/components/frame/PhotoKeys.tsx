"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Left and right arrows move through the roll; Escape goes back to it. */
export default function PhotoKeys({ prev, next }: { prev: string; next: string }) {
  const router = useRouter();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") router.push(prev);
      if (e.key === "ArrowRight") router.push(next);
      if (e.key === "Escape") router.push("/frame");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, prev, next]);
  return null;
}
