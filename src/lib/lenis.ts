import type Lenis from "lenis";

// Single shared Lenis instance so any component can scroll the page.
let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis() {
  return instance;
}
