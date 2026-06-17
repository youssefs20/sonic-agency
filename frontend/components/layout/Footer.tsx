import Image from "next/image";

const LINKS = [
  { label: "About",    href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work",     href: "#portfolio" },
  { label: "Contact",  href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-zinc-950 border-t border-gray-200 dark:border-white/6">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">

        <a href="#">
          {/* Light mode: logo renders normally on white background */}
          <Image src="/assets/sonic-logo.png" alt="Sonic Agency" width={100} height={34} className="object-contain dark:hidden" style={{ height: "auto" }} />
          {/* Dark mode: blend away white background */}
          <Image src="/assets/sonic-logo.png" alt="Sonic Agency" width={100} height={34} className="object-contain hidden dark:block" style={{ mixBlendMode: "screen", height: "auto" }} />
        </a>

        <nav className="flex flex-wrap justify-center gap-6">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} className="text-gray-400 dark:text-gray-500 hover:text-brand-blue dark:hover:text-white text-sm transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <p className="text-gray-400 dark:text-gray-600 text-sm">© {new Date().getFullYear()} Sonic Agency</p>
      </div>
    </footer>
  );
}
