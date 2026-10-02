/** A tiny iris whose opening matches the f-number: wide open is a big disc, stopped down is a dot. */
export default function Aperture({ f, className }: { f: number; className?: string }) {
  const r = Math.max(1.2, 6.2 * Math.sqrt(1.4 / f));
  return (
    <svg viewBox="0 0 14 14" aria-hidden className={className} width="14" height="14">
      <circle cx="7" cy="7" r="6.5" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="7" cy="7" r={Math.min(r, 6)} fill="currentColor" />
    </svg>
  );
}
