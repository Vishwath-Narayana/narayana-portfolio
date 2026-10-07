"use client";

import { useSyncExternalStore } from "react";
import { HandwrittenResponse } from "./HandwrittenResponse";

const hourFormat = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "numeric", hour12: false });

/** The greeting for the hour it is in Warangal right now. */
function greeting(): string {
  const hour = Number(hourFormat.format(new Date())) % 24;
  if (hour >= 5 && hour < 12) return "Good ==morning== from ((Warangal)).";
  if (hour >= 12 && hour < 17) return "Good ==afternoon== from ((Warangal)).";
  if (hour >= 17 && hour < 21) return "Good ==evening== from ((Warangal)).";
  return "Still up? ==Hello== from ((Warangal)).";
}

// The text is fixed for the visit, so there is nothing to subscribe to.
const subscribe = () => () => {};
const getServer = () => "";

/**
 * A handwritten hello that follows Warangal time. It renders nothing on the server,
 * so the pen starts writing once the page is in the browser and the text is known.
 */
export default function Greeting({ className = "" }: { className?: string }) {
  const text = useSyncExternalStore(subscribe, greeting, getServer);
  if (!text) return null;
  return <HandwrittenResponse className={className} duration={0.3}>{text}</HandwrittenResponse>;
}
