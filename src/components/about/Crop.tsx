import type { ReactNode } from "react";

/** Photographer's crop marks at the four corners, sitting just outside whatever it wraps. */
export default function Crop({ children, className = "" }: { children: ReactNode; className?: string }) {
  const mark = "pointer-events-none absolute size-3 border-fg/70";
  return (
    <div className={`relative ${className}`}>
      {children}
      <span aria-hidden className={`${mark} -left-2.5 -top-2.5 border-l border-t`} />
      <span aria-hidden className={`${mark} -right-2.5 -top-2.5 border-r border-t`} />
      <span aria-hidden className={`${mark} -bottom-2.5 -left-2.5 border-b border-l`} />
      <span aria-hidden className={`${mark} -bottom-2.5 -right-2.5 border-b border-r`} />
    </div>
  );
}
