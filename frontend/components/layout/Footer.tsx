import Image from "next/image";
import Socials from "@/components/ui/Socials";

const COLS = [
  {
    heading: "Services",
    links: [
      { label: "Content Strategy", href: "#services" },
      { label: "Paid Media", href: "#services" },
      { label: "Growth Systems", href: "#services" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Work", href: "#work" },
      { label: "Results", href: "#results" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="pt-16 pb-10 bg-background">
      <div className="container-x">
        <div className="grid md:grid-cols-12 gap-10 pb-12 border-b border-line">

          <div className="md:col-span-5">
            <a href="#top" className="inline-block" aria-label="Sonic — home">
              <Image src="/assets/sonic-logo.png" alt="Sonic Growth Agency" width={108} height={36} className="object-contain dark:hidden" style={{ height: "auto" }} />
              <Image src="/assets/sonic-logo.png" alt="Sonic Growth Agency" width={108} height={36} className="object-contain hidden dark:block" style={{ mixBlendMode: "screen", height: "auto" }} />
            </a>
            <p className="mt-4 font-display text-lg font-bold text-foreground">
              We don&apos;t manage. <span className="text-brand-blue">We grow.</span>
            </p>
            <p className="mt-3 text-muted max-w-xs text-sm">
              A full-service growth agency building content, paid media, and growth systems across MENA.
            </p>
            <Socials className="mt-6" />
          </div>

          {COLS.map((col) => (
            <div key={col.heading} className="md:col-span-2">
              <div className="font-mono text-xs uppercase tracking-wider text-muted-2 mb-4">{col.heading}</div>
              <ul className="space-y-2.5 text-sm text-muted">
                {col.links.map((l) => (
                  <li key={l.label}><a href={l.href} className="hover:text-foreground transition-colors">{l.label}</a></li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3">
            <div className="font-mono text-xs uppercase tracking-wider text-muted-2 mb-4">Get in touch</div>
            <a href="mailto:hello@sonic.agency" className="text-foreground hover:text-brand-blue transition-colors">hello@sonic.agency</a>
            <a href="#contact" className="btn btn-ghost w-full mt-5">Book a Strategy Call</a>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-2">
          <p>© {new Date().getFullYear()} Sonic Growth Agency. All rights reserved.</p>
          <p className="font-mono">Speed · Growth · Performance · Results</p>
        </div>
      </div>
    </footer>
  );
}
