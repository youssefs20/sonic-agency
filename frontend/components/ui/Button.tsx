"use client";

import { ButtonHTMLAttributes } from "react";
import { trackEvent } from "@/lib/analytics";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "danger";
  // When set, clicking fires a cta_click analytics event with this source.
  trackName?: string;
}

export default function Button({ variant = "primary", trackName, className = "", children, onClick, ...props }: ButtonProps) {
  const base = "px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer";
  const styles = {
    primary: "bg-brand-blue text-white hover:opacity-90",
    outline: "border border-white text-white hover:bg-white hover:text-brand-black",
    danger:  "bg-brand-red text-white hover:opacity-90",
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (trackName) trackEvent("cta_click", { source: trackName });
    onClick?.(e);
  };

  return (
    <button className={`${base} ${styles[variant]} ${className}`} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
