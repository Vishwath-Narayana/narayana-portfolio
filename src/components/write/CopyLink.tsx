"use client";

import { useState } from "react";

/** Copies the page address, and says so for a moment. */
export default function CopyLink() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked; the address bar still works.
    }
  };

  return (
    <button type="button" onClick={copy} className="link-line pb-0.5 font-mono text-xs uppercase tracking-[0.1em]">
      <span aria-live="polite">{copied ? "Copied" : "Copy link"}</span>
    </button>
  );
}
