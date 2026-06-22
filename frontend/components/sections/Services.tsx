const PILLARS = [
  {
    title: "Content Strategy & Production",
    tagline: "We don't create random posts. We build content systems designed to convert.",
    items: ["Brand strategy & content pillars", "30–90 day content calendars", "Copy, video & creative direction", "Community management"],
    chips: ["Strategy", "Video", "Copy"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="2" /><path d="M7 8h10M7 12h6M7 16h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
    ),
    accent: false,
  },
  {
    title: "Paid Media & Performance",
    tagline: "We run ads to reach goals, not to spend budgets.",
    items: ["Campaign strategy & funnel design", "Meta, Google & TikTok management", "Conversion optimization", "Analytics & weekly reporting"],
    chips: ["Meta", "Google", "TikTok"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 17l5-5 4 3 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M21 7v5h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ),
    accent: true,
  },
  {
    title: "Growth Systems",
    tagline: "We build systems that compound. Not one-off campaigns.",
    items: ["Email & retention automation", "Personal brand building", "Website & conversion-rate work", "Repeat-purchase optimization"],
    chips: ["Email", "Retention", "CRO"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 20V9M10 20V4M16 20v-7M22 20H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
    ),
    accent: false,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="kicker reveal">What we deliver</p>
          <h2 className="h-sec text-foreground mt-5 reveal">End-to-end growth, three systems.</h2>
          <p className="mt-5 text-muted text-lg reveal">One performance team across content, paid media, and retention — so insight from one compounds across all three.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {PILLARS.map((p, i) => (
            <article key={p.title} className="card card-hover card-accent p-7 reveal flex flex-col" style={{ transitionDelay: `${i * 0.06}s` }}>
              <div
                className="h-11 w-11 rounded-xl grid place-items-center mb-5"
                style={{ background: p.accent ? "color-mix(in oklab, var(--red) 12%, transparent)" : "color-mix(in oklab, var(--blue) 12%, transparent)", color: p.accent ? "var(--red)" : "var(--blue)" }}
              >
                {p.icon}
              </div>
              <h3 className="text-foreground text-xl font-semibold font-display">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.tagline}</p>

              <ul className="mt-5 space-y-2.5 flex-1">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/90">
                    <svg className="mt-1 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {p.chips.map((c) => <span key={c} className="chip">{c}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
