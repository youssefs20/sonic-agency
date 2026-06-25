"use client";

import { useEffect, useRef } from "react";

// Electric lightning across the hero: ambient strikes plus bolts that follow
// the cursor. Blue/red brand palette, white-hot core. Disabled for
// prefers-reduced-motion. Renders its own <canvas id="bolt-canvas">.
export default function HeroLightning() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0,
      h = 0,
      dpr = 1;
    let raf = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    type Pt = { x: number; y: number };
    type Bolt = { points: Pt[]; branches: Pt[][]; life: number; color: string };
    const bolts: Bolt[] = [];
    const pickColor = () => (Math.random() < 0.5 ? "#005BFF" : "#E60023");

    const makeBolt = (ax: number, ay: number, bx: number, by: number, color?: string) => {
      const dx = bx - ax,
        dy = by - ay;
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len,
        ny = dx / len;
      const segs = 12 + Math.floor(Math.random() * 8);
      const amp = Math.min(60, 22 + len * 0.1);
      const points: Pt[] = [];
      for (let i = 0; i <= segs; i++) {
        const t = i / segs;
        const j = i === 0 || i === segs ? 0 : (Math.random() - 0.5) * amp;
        points.push({ x: ax + dx * t + nx * j, y: ay + dy * t + ny * j });
      }
      const branches: Pt[][] = [];
      const bc = 1 + Math.floor(Math.random() * 2);
      for (let b = 0; b < bc; b++) {
        const idx = 2 + Math.floor(Math.random() * Math.max(1, points.length - 4));
        const bp: Pt[] = [points[idx]];
        let px = points[idx].x,
          py = points[idx].y;
        const bsegs = 3 + Math.floor(Math.random() * 4);
        const ang = Math.atan2(dy, dx) + (Math.random() - 0.5) * 1.6;
        const step = (len / segs) * (0.8 + Math.random() * 0.6);
        for (let i = 1; i <= bsegs; i++) {
          px += Math.cos(ang) * step + (Math.random() - 0.5) * 24;
          py += Math.sin(ang) * step + (Math.random() - 0.5) * 24;
          bp.push({ x: px, y: py });
        }
        branches.push(bp);
      }
      bolts.push({ points, branches, life: 1, color: color || pickColor() });
    };

    const strikeTo = (tx: number, ty: number) => {
      const ax = tx + (Math.random() - 0.5) * w * 0.5;
      makeBolt(ax, -10, tx, ty);
      if (Math.random() < 0.4) makeBolt(tx, ty, tx + (Math.random() - 0.5) * 160, ty + 40 + Math.random() * 120);
    };

    const stroke = (pts: Pt[]) => {
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.stroke();
    };

    let lastFlash = 0;
    let nextDelay = 700;
    const render = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      for (let i = bolts.length - 1; i >= 0; i--) {
        const b = bolts[i];
        b.life -= 0.05;
        if (b.life <= 0) {
          bolts.splice(i, 1);
          continue;
        }
        const flicker = 0.55 + Math.random() * 0.45;
        ctx.globalAlpha = Math.max(0, b.life) * flicker;
        ctx.strokeStyle = b.color;
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 26;
        ctx.lineWidth = 5;
        stroke(b.points);
        b.branches.forEach(stroke);
        ctx.globalAlpha = Math.max(0, b.life);
        ctx.strokeStyle = "#ffffff";
        ctx.shadowBlur = 10;
        ctx.lineWidth = 1.5;
        stroke(b.points);
        b.branches.forEach(stroke);
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      if (now - lastFlash > nextDelay && w > 0) {
        strikeTo(w * (0.2 + Math.random() * 0.6), h * (0.25 + Math.random() * 0.5));
        lastFlash = now;
        nextDelay = 2600 + Math.random() * 2600;
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas id="bolt-canvas" ref={ref} aria-hidden="true" />;
}
