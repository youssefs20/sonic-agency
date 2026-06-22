"use client";

import { useEffect } from "react";

// Premium dark-mode-only cursor effect: a glowing blue→red energy trail
// that follows the pointer and fades when still. Disabled on touch devices
// and when reduced motion is requested. One rAF loop, capped points,
// additive blending — light on the main thread.
export default function CursorTrail() {
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    const canvas = document.createElement("canvas");
    canvas.className = "cursor-canvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      canvas.remove();
      return;
    }

    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const points: { x: number; y: number }[] = [];
    const MAX = 18;
    let mx = -100, my = -100, moved = false;
    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      moved = true;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, w, h);

      if (!document.documentElement.classList.contains("dark")) {
        points.length = 0;
        return;
      }

      if (moved) {
        points.push({ x: mx, y: my });
        if (points.length > MAX) points.shift();
        moved = false;
      } else if (points.length) {
        points.shift();
      }
      if (points.length < 2) return;

      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      for (let i = 1; i < points.length; i++) {
        const p0 = points[i - 1];
        const p1 = points[i];
        const t = i / points.length; // old → new
        const r = Math.round(t * 230);
        const g = Math.round(91 - t * 91);
        const b = Math.round(255 - t * 220);
        ctx.strokeStyle = `rgba(${r},${g},${b},${t * 0.5})`;
        ctx.lineWidth = t * 6 + 0.5;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${r},${g},${b},0.8)`;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.shadowBlur = 0;
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      canvas.remove();
    };
  }, []);

  return null;
}
