"use client";

import { useEffect } from "react";

// Full-size image modal. Close via the X, backdrop click, or Esc.
export default function Lightbox({
  src,
  caption,
  onClose,
}: {
  src: string | null;
  caption?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div className="lb-overlay" role="dialog" aria-modal="true" aria-label={caption || "Image"} onClick={onClose}>
      <figure className="lb-figure" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="lb-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={caption || ""} className="lb-img" />
        {caption && <figcaption className="lb-caption">{caption}</figcaption>}
      </figure>
    </div>
  );
}
