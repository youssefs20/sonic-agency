"use client";

import { useEffect } from "react";

// Drives two reference behaviors with one observer pass each:
//  - `.reveal` elements fade/rise in when scrolled into view
//  - `[data-count]` numbers count up when scrolled into view
// Honors prefers-reduced-motion by showing final state immediately.
export default function ScrollFX() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── Reveal on scroll ──
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    let revealIO: IntersectionObserver | undefined;
    if (reduced) {
      revealEls.forEach((el) => el.classList.add("in"));
    } else {
      revealIO = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12 },
      );
      revealEls.forEach((el) => revealIO!.observe(el));
    }

    // ── Animated counters ──
    const render = (el: HTMLElement, val: number) => {
      const suffix = el.dataset.suffix ?? "";
      const prefix = el.dataset.prefix ?? "";
      const divide = el.dataset.divide ? Number(el.dataset.divide) : 1;
      const out = divide > 1 ? (val / divide).toFixed(1) : Math.round(val).toString();
      el.textContent = prefix + out + suffix;
    };
    const counterIO = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const target = Number(el.dataset.count);
          obs.unobserve(el);
          if (reduced) {
            render(el, target);
            return;
          }
          const dur = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            render(el, target * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.5 },
    );
    document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => counterIO.observe(el));

    return () => {
      revealIO?.disconnect();
      counterIO.disconnect();
    };
  }, []);

  return null;
}
