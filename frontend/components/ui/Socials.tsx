const LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1MxYUo1ZRX/?mibextid=wwXIfr",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sonic_growth?igsh=em1xa2lua2hpaXVq",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Socials({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-3 ${className}`}>
      {LINKS.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.label}
          className="h-10 w-10 rounded-full grid place-items-center border border-line-strong text-muted hover:text-foreground hover:border-foreground transition-colors"
        >
          {l.icon}
        </a>
      ))}
    </div>
  );
}
