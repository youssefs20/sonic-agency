"use client";

import { useEffect, useState } from "react";

// Three phases:
//   "running" — full-screen white overlay, Sonic runs in place with speed lines
//   "dashing" — the whole overlay slides off to the right, revealing the site
//   "done"    — overlay removed from the DOM entirely
type Phase = "running" | "dashing" | "done";

const RUN_DURATION = 1600; // ms Sonic runs in place
const DASH_DURATION = 700; // ms the screen takes to wipe away (matches the CSS transition)

export default function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("running");

  useEffect(() => {
    const dashTimer = setTimeout(() => setPhase("dashing"), RUN_DURATION);
    const doneTimer = setTimeout(() => setPhase("done"), RUN_DURATION + DASH_DURATION);
    return () => {
      clearTimeout(dashTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  // Lock scrolling while the loader covers the page
  useEffect(() => {
    if (phase === "done") {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-transform ease-in ${
        phase === "dashing" ? "translate-x-full" : "translate-x-0"
      }`}
      style={{ transitionDuration: `${DASH_DURATION}ms` }}
    >
      <div className="relative flex items-center">
        {/* Speed/wind lines streaking behind Sonic */}
        <div className="absolute right-full mr-4 flex flex-col items-end gap-2.5">
          <span className="block h-1.5 w-20 rounded-full bg-brand-blue/70 animate-speedline" />
          <span className="block h-1.5 w-12 rounded-full bg-brand-red/70 animate-speedline" style={{ animationDelay: "0.1s" }} />
          <span className="block h-1.5 w-24 rounded-full bg-brand-blue/50 animate-speedline" style={{ animationDelay: "0.2s" }} />
          <span className="block h-1.5 w-16 rounded-full bg-brand-red/50 animate-speedline" style={{ animationDelay: "0.15s" }} />
        </div>

        {/* Sonic running sprite */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/sonic-running.gif" alt="Loading" className="h-36 w-auto" />
      </div>
    </div>
  );
}
