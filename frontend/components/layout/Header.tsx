import Image from "next/image";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";

const NAV_LINKS = [
  { label: "About",    href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work",     href: "#portfolio" },
  { label: "Contact",  href: "#contact" },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-white/90 dark:bg-brand-black/90 backdrop-blur-md border-b border-gray-200 dark:border-white/6" />

      <div className="relative max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        <a href="#">
          <Image
            src="/assets/sonic-logo.png"
            alt="Sonic Agency"
            width={120}
            height={40}
            className="object-contain dark:hidden"
            style={{ height: "auto" }}
            priority
          />
          {/* Dark mode: use mix-blend-mode screen to hide white bg */}
          <Image
            src="/assets/sonic-logo.png"
            alt="Sonic Agency"
            width={120}
            height={40}
            className="object-contain hidden dark:block"
            style={{ mixBlendMode: "screen", height: "auto" }}
            priority
          />
        </a>

        <nav className="hidden md:flex gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-600 hover:text-brand-black dark:text-gray-400 dark:hover:text-white text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="primary" trackName="header_start_project" className="hidden md:inline-flex text-sm px-5 py-2.5">
            Start a Project
          </Button>
        </div>

        <button className="md:hidden text-gray-500 dark:text-gray-400 hover:text-brand-black dark:hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

      </div>
    </header>
  );
}
