import Image from "next/image";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";

const NAV_LINKS = [
  { label: "About",   href: "#about" },
  { label: "Work",    href: "#work" },
  { label: "Results", href: "#cases" },
];

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="container-x">
        <nav className="mt-3 flex items-center justify-between rounded-full border border-line bg-background/72 backdrop-blur-xl px-4 py-2.5 md:px-5 shadow-[0_8px_30px_-18px_rgba(14,14,15,0.25)]">

          <a href="#top" className="flex items-center gap-2.5 shrink-0" aria-label="Sonic — home">
            <Image src="/assets/sonic-logo.png" alt="Sonic Growth Agency" width={104} height={35} className="object-contain dark:hidden" style={{ height: "auto" }} priority />
            <Image src="/assets/sonic-logo.png" alt="Sonic Growth Agency" width={104} height={35} className="object-contain hidden dark:block" style={{ mixBlendMode: "screen", height: "auto" }} priority />
          </a>

          <div className="hidden md:flex items-center gap-7 font-mono text-xs uppercase tracking-widest text-muted">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-foreground transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <a href="#contact" className="inline-flex">
              <Button variant="primary" trackName="header_book_call" className="py-2.5 px-4 text-sm">
                <span className="sm:hidden">Book a Call</span>
                <span className="hidden sm:inline">Book a Strategy Call</span>
                <svg className="arr" width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Button>
            </a>
          </div>

        </nav>
      </div>
    </header>
  );
}
