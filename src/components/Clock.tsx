"use client";

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

const subscribe = (notify: () => void) => {
  const id = window.setInterval(notify, 1000);
  return () => window.clearInterval(id);
};

const getTime = () => formatter.format(new Date());
const getServerTime = () => "";

/** Live local time in Warangal. Renders blank on the server to avoid a mismatch. */
export default function Clock({ className = "" }: { className?: string }) {
  const time = useSyncExternalStore(subscribe, getTime, getServerTime);

  return (
    <span className={`inline-block min-w-[9ch] tabular-nums ${className}`} suppressHydrationWarning>
      {time || " "}
    </span>
  );
}
