import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "danger";
}

export default function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  const base = "px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer";
  const styles = {
    primary: "bg-brand-blue text-white hover:opacity-90",
    outline: "border border-white text-white hover:bg-white hover:text-brand-black",
    danger:  "bg-brand-red text-white hover:opacity-90",
  };
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
