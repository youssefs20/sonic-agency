const PHASES = [
  { title: "Align on targets", body: "Before anything launches, we agree on what success looks like. Strategy isn't vague — numbers are." },
  { title: "Define requirements", body: "We specify exactly what we need from you — footage, materials, resources — so month one delivers." },
  { title: "Build & launch", body: "Content systems, paid media, and growth systems go live as one coordinated performance engine." },
  { title: "Measure & optimize", body: "Weekly reviews, daily testing, and recommendations tied to the metrics that move your business." },
];

const METRICS = ["Revenue", "Bookings", "Leads", "Engagement"];

export default function Process() {
  return (
    <section className="py-20 md:py-28 bg-panel bg-grid border-y border-line">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="kicker reveal">Our process</p>
          <h2 className="h-sec text-foreground mt-5 reveal">We work in phases.</h2>
          <p className="mt-5 text-muted text-lg reveal">Clear phases. Clear milestones. Clear reporting.</p>
        </div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {PHASES.map((p, i) => (
            <li key={p.title} className="card card-accent p-7 reveal flex flex-col gap-3" style={{ transitionDelay: `${i * 0.06}s` }}>
              <span className="font-display text-5xl font-extrabold text-line-strong leading-none">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-xl font-semibold text-foreground">{p.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ol>

        <div className="card p-8 md:p-10 mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6 reveal">
          <div className="max-w-md">
            <div className="font-mono text-xs text-brand-blue mb-3">// ONGOING MEASUREMENT</div>
            <p className="font-display text-2xl font-bold text-foreground leading-snug">Every decision is tied to a metric.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {METRICS.map((m) => <span key={m} className="chip">{m}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
