import Button from "@/components/ui/Button";

const STATS = [
  { count: 300, prefix: "+", suffix: "%", label: "Peak sales growth" },
  { count: 10,  prefix: "",  suffix: "x", label: "Peak ROAS" },
  { count: 14,  prefix: "",  suffix: "",  label: "Brands scaled" },
];

const BARS = [28, 40, 35, 52, 48, 63, 58, 75, 100];

export default function Hero() {
  return (
    <section id="top" className="relative bg-grid overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      {/* glows */}
      <div className="pointer-events-none absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full" style={{ background: "radial-gradient(circle, var(--glow-blue), transparent 60%)", filter: "blur(40px)" }} />
      <div className="pointer-events-none absolute -top-24 right-0 h-[26rem] w-[26rem] rounded-full" style={{ background: "radial-gradient(circle, var(--glow-red), transparent 65%)", filter: "blur(50px)" }} />
      <div className="speedlines hidden md:block">
        <span style={{ top: "24%", animationDelay: "0s" }} />
        <span style={{ top: "50%", animationDelay: "2.2s" }} />
        <span style={{ top: "72%", animationDelay: "4.5s" }} />
      </div>

      <div className="container-x relative grid lg:grid-cols-12 gap-12 items-center">
        {/* Copy */}
        <div className="lg:col-span-7">
          <div className="chip reveal">
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--blue)" }} />
            Digital Growth Agency · MENA
          </div>
          <h1 className="h-hero text-foreground mt-6 reveal">
            We don&apos;t manage.<br />
            We <span className="text-grad">grow.</span>
          </h1>
          <p className="mt-7 text-lg md:text-xl text-muted max-w-xl reveal" style={{ transitionDelay: ".08s" }}>
            A full-service growth agency that turns content, paid media, and
            systems into measurable revenue — not reports.
          </p>
          <div className="mt-9 flex flex-wrap gap-3 reveal" style={{ transitionDelay: ".16s" }}>
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

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 reveal" style={{ transitionDelay: ".24s" }}>
            {STATS.map((s, i) => (
              <div key={s.label} className="flex items-center gap-x-8">
                {i > 0 && <span className="hidden sm:block h-9 w-px bg-line" />}
                <div>
                  <div className="font-display text-2xl font-bold text-foreground" data-count={s.count} data-prefix={s.prefix} data-suffix={s.suffix}>
                    {s.prefix}0{s.suffix}
                  </div>
                  <div className="font-mono text-xs text-muted-2 uppercase tracking-wider mt-0.5">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth chart visual */}
        <div className="lg:col-span-5 reveal" style={{ transitionDelay: ".12s" }}>
          <div className="hero-chart-wrap">
            <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, color-mix(in oklab, var(--background) 55%, transparent))" }} />
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-evenly px-6" style={{ paddingBottom: "3.5rem" }}>
              <div className="h-px bg-line" />
              <div className="h-px bg-line" />
              <div className="h-px bg-line" />
            </div>
            {BARS.map((h, i) => (
              <div key={i} className={`hero-chart-bar${i === BARS.length - 1 ? " accent" : ""}`} style={{ height: `${h}%` }} />
            ))}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-line bg-background/75 backdrop-blur px-4 py-3">
              <span className="font-mono text-xs text-muted">GROWTH · 90 DAYS</span>
              <span className="flex items-center gap-1.5 text-foreground font-semibold text-sm">
                <span style={{ color: "var(--blue)" }}>▲</span> +300% revenue
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
