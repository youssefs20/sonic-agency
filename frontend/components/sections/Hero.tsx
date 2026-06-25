import Button from "@/components/ui/Button";
import HeroLightning from "@/components/HeroLightning";

// All figures below come straight from the company profile:
//   +300% sales growth (Golden Touch) · +167% bookings (Crystal Teeth)
//   25 brands on the "Brands we worked with" wall · 30–90 day engagements.
const STATS = [
  { count: 300, prefix: "+", suffix: "%", color: "var(--foreground)", label: "Peak sales growth" },
  { count: 167, prefix: "+", suffix: "%", color: "var(--red)", label: "Peak bookings growth" },
  { count: 25, prefix: "", suffix: "", color: "var(--foreground)", label: "Brands scaled" },
];

export default function Hero() {
  return (
    <section id="top" className="bg-grid" style={{ position: "relative", overflow: "hidden", paddingTop: "11rem", paddingBottom: "5rem" }}>
      <HeroLightning />
      <div className="glow glow-blue" style={{ top: "-10rem", left: "-8rem", height: "36rem", width: "36rem" }} />
      <div className="glow glow-red" style={{ top: "-6rem", right: 0, height: "26rem", width: "26rem", filter: "blur(50px)" }} />

      <div className="speedlines" aria-hidden="true" style={{ opacity: 0.3 }}>
        <span style={{ top: "22%", animationDelay: "0s" }} />
        <span style={{ top: "58%", animationDelay: "1.5s" }} />
        <span style={{ top: "82%", animationDelay: "3s" }} />
      </div>

      <div className="container-x" style={{ position: "relative", zIndex: 2 }}>
        <div className="hero-inner">
          <span className="chip hero-anim hero-a0" style={{ background: "var(--background)" }}>
            <span style={{ display: "inline-block", height: "6px", width: "6px", borderRadius: "50%", background: "var(--blue)" }} />
            Digital Growth Agency · MENA
          </span>
          <h1 className="h-hero" style={{ color: "var(--foreground)", marginTop: "1.5rem", marginBottom: 0 }}>
            <span className="hero-anim hero-a1" style={{ display: "block" }}>We don&apos;t manage.</span>
            <span className="hero-line2">
              <span className="hero-streak" aria-hidden="true"><i /><i /><i /><i /></span>
              <span className="hero-grow text-grad">We grow.</span>
              <span className="hero-grow-underline" aria-hidden="true" />
            </span>
          </h1>
          <p className="hero-anim hero-a3" style={{ margin: "1.5rem auto 0", fontSize: "1.05rem", color: "var(--muted)", maxWidth: "38rem", lineHeight: 1.55 }}>
            A full-service growth agency that turns content, paid media, and systems into measurable revenue — not reports.
          </p>
          <div className="hero-anim hero-a4" style={{ marginTop: "2.25rem", display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
            <a href="#contact">
              <Button variant="primary" trackName="hero_book_call">
                Book a Strategy Call
                <svg className="arr" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Button>
            </a>
            <a href="#work">
              <Button variant="ghost" trackName="hero_see_work">See Our Work</Button>
            </a>
          </div>
        </div>

        {/* Stat cluster — animated count-up via ScrollFX */}
        <div className="hero-stats">
          {STATS.map((s) => (
            <div key={s.label} className="hero-stat">
              <div className="v" style={{ color: s.color }} data-count={s.count} data-prefix={s.prefix} data-suffix={s.suffix}>
                {s.prefix}0{s.suffix}
              </div>
              <div className="l">{s.label}</div>
            </div>
          ))}
          <div className="hero-stat">
            <div className="v" style={{ color: "var(--blue)" }}>30–90</div>
            <div className="l">Days to results</div>
          </div>
        </div>
      </div>
    </section>
  );
}
