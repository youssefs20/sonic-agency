"use client";

import { ButtonHTMLAttributes } from "react";
import { trackEvent } from "@/lib/analytics";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  // When set, clicking fires a cta_click analytics event with this source.
  trackName?: string;
}

export default function Button({ variant = "primary", trackName, className = "", children, onClick, ...props }: ButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (trackName) trackEvent("cta_click", { source: trackName });
    onClick?.(e);
  };

  return (
    <button className={`btn btn-${variant} ${className}`} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
