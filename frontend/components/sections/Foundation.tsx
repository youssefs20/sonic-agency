const PILLARS = [
  { title: "Tested & Experienced", body: "Dozens of campaigns, hundreds of strategies tested, and proven results in MENA markets." },
  { title: "Algorithm-First", body: "We stay ahead of Meta, Google, and platform changes. We understand the algorithms, not just the dashboards." },
  { title: "Clear Targets", body: "Before we start, we agree on what success looks like. Strategy isn't vague — numbers are." },
  { title: "Selective Partnership", body: "We don't work with everyone. We partner with brands committed to growth and ready to invest in it." },
  { title: "Requirements-First", body: "We define exactly what we need from you up front. No clarity, no results — so we get it right from month one." },
];

export default function Foundation() {
  return (
    <section className="py-20 md:py-28 bg-panel bg-grid border-y border-line">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="kicker reveal">Our foundation</p>
          <h2 className="h-sec text-foreground mt-5 reveal">Why brands grow with Sonic.</h2>
          <p className="mt-5 text-muted text-lg reveal">Five principles behind every engagement — and every result.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {PILLARS.map((p, i) => (
            <article key={p.title} className="card card-hover card-accent p-7 reveal" style={{ transitionDelay: `${i * 0.05}s` }}>
              <div className="font-mono text-sm text-brand-blue mb-4">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="text-foreground text-xl font-semibold font-display">{p.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{p.body}</p>
            </article>
          ))}
          <article className="card card-accent p-7 flex flex-col justify-center reveal" style={{ transitionDelay: "0.25s" }}>
            <p className="font-display text-2xl font-bold text-foreground leading-snug">
              We don&apos;t manage.<br /><span className="text-brand-blue">We grow.</span>
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
