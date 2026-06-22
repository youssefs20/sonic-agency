const BIG = [
  { count: 300, prefix: "+", suffix: "%", label: "Peak sales growth", color: "var(--foreground)" },
  { count: 10,  prefix: "",  suffix: "x", label: "Peak ROAS", color: "var(--blue)" },
  { count: 167, prefix: "+", suffix: "%", label: "Booking lift", color: "var(--foreground)" },
  { count: 14,  prefix: "",  suffix: "",  label: "Case studies", color: "var(--red)" },
];

const DETAILS = [
  { label: "// SPEED", title: "30–90 days", body: "Typical time to measurable results across the portfolio." },
  { label: "// ROAS", title: "3 → 10", body: "M-Design's return on ad spend, lifted in just 60 days." },
  { label: "// GROWTH", title: "2–3x", body: "Average client growth — bookings, sales, or leads." },
];

export default function Results() {
  return (
    <section id="results" className="relative py-20 md:py-28 bg-panel bg-grid border-y border-line overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[30rem] w-[30rem] rounded-full" style={{ background: "radial-gradient(circle, var(--glow-blue), transparent 60%)", filter: "blur(60px)" }} />
      <div className="container-x relative">
        <div className="max-w-2xl mx-auto text-center">
          <p className="kicker reveal" style={{ display: "inline-flex" }}>By the numbers</p>
          <h2 className="h-sec text-foreground mt-5 reveal">Performance you can put on a dashboard.</h2>
          <p className="mt-5 text-muted text-lg reveal">Real outcomes from real clients — every figure tied to a metric that moved the business.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
          {BIG.map((s, i) => (
            <div key={s.label} className="card p-7 text-center reveal" style={{ transitionDelay: `${i * 0.06}s` }}>
              <div className="font-display text-4xl md:text-5xl font-extrabold" style={{ color: s.color }} data-count={s.count} data-prefix={s.prefix} data-suffix={s.suffix}>
                {s.prefix}0{s.suffix}
              </div>
              <div className="mt-2 text-sm text-muted">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {DETAILS.map((d, i) => (
            <div key={d.label} className="card p-6 reveal" style={{ transitionDelay: `${i * 0.06}s` }}>
              <div className="font-mono text-xs text-brand-blue mb-2">{d.label}</div>
              <p className="text-foreground font-semibold text-lg font-display">{d.title}</p>
              <p className="text-sm text-muted mt-1">{d.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
