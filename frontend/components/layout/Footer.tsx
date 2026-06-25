import Image from "next/image";
import Socials from "@/components/ui/Socials";

const AGENCY = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Case studies", href: "#cases" },
];

const CONNECT = [
  { label: "+20 11 46056172", href: "tel:+201146056172" },
  { label: "Book a call", href: "#contact" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--background)", borderTop: "1px solid var(--line)", padding: "4rem 0 2rem" }}>
      <div className="container-x">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-6">
            <a href="#top" className="inline-flex" aria-label="Sonic — home">
              <Image src="/assets/sonic-logo.png" alt="Sonic Growth Agency" width={108} height={36} className="object-contain dark:hidden" style={{ height: "auto" }} />
              <Image src="/assets/sonic-logo.png" alt="Sonic Growth Agency" width={108} height={36} className="object-contain hidden dark:block" style={{ mixBlendMode: "screen", height: "auto" }} />
            </a>
            <p className="mt-5 text-muted max-w-xs text-sm leading-relaxed">
              A full-service growth agency turning content, paid media, and systems into measurable revenue — not reports.
            </p>
            <Socials className="mt-6" />
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-xs uppercase tracking-wider text-muted-2 mb-4">Agency</div>
            <ul className="space-y-2.5 text-sm text-muted">
              {AGENCY.map((l) => (
                <li key={l.label}><a href={l.href} className="hover:text-foreground transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-xs uppercase tracking-wider text-muted-2 mb-4">Connect</div>
            <ul className="space-y-2.5 text-sm text-muted">
              {CONNECT.map((l) => (
                <li key={l.label}><a href={l.href} className="hover:text-foreground transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-2">© {new Date().getFullYear()} Sonic Growth Agency · MENA</p>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-2">We don&apos;t manage. We grow.</p>
        </div>
      </div>
    </footer>
  );
}
