const CARDS = [
  {
    label: "// TRACK RECORD",
    title: "14 clients, real growth",
    body: "An average of 2–3x growth delivered within 30–90 days — across healthcare, e-commerce, tourism, real estate, and B2B.",
    accent: false,
  },
  {
    label: "// MISSION",
    title: "Speed, precision, proof",
    body: "Grow brands with measurable outcomes, not vanity metrics. Every decision is tied to a number that moves the business.",
    accent: false,
  },
  {
    label: "// MARKETS",
    title: "Built for MENA",
    body: "Egypt, Saudi Arabia, UAE, and Qatar — with strategies proven in the markets where our clients compete.",
    accent: false,
  },
  {
    label: "// APPROACH",
    title: "Systems, not posts",
    body: "We don't manage social media. We build growth systems that compound — content, paid media, and retention as one engine.",
    accent: true,
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 border-t border-line">
      <div className="container-x grid lg:grid-cols-12 gap-12 lg:gap-16">

        <div className="lg:col-span-5">
          <p className="kicker reveal">About Sonic</p>
          <h2 className="h-sec text-foreground mt-5 reveal">We build growth systems.</h2>
          <p className="mt-6 text-muted text-lg reveal">
            Sonic is a full-service marketing agency that builds growth systems
            for brands across multiple industries and markets — blending content,
            paid media, and strategy into one performance engine.
          </p>
          <p className="mt-4 text-foreground font-medium reveal">
            We don&apos;t manage social media. We build growth systems.
          </p>
          <a href="#work" className="inline-flex items-center gap-2 mt-8 text-foreground font-semibold reveal hover:gap-3 transition-all">
            See our work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          {CARDS.map((c, i) => (
            <div key={c.label} className="card card-hover card-accent p-6 reveal" style={{ transitionDelay: `${i * 0.06}s` }}>
              <div className="font-mono text-xs mb-3" style={{ color: c.accent ? "var(--red)" : "var(--blue)" }}>{c.label}</div>
              <h3 className="text-foreground text-xl font-semibold mb-2 font-display">{c.title}</h3>
              <p className="text-sm text-muted">{c.body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
