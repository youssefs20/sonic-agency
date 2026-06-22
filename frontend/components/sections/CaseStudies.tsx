const CASES = [
  { tag: "Healthcare · Dental Chain", brand: "Crystal Teeth", summary: "Bookings collapsed whenever ad spend paused. We scaled them from 1,500 to 4,000 a month with strategic content plus ads — and built a brand that holds on its own.", metric: "+167%", label: "Booking increase", color: "var(--blue)" },
  { tag: "E-commerce · Home Goods", brand: "Golden Touch", summary: "Minimal sales and no media-buying strategy. We scaled revenue from 500K to 2M EGP in a single month through content strategy and paid ads.", metric: "+300%", label: "Sales growth · 1 month", color: "var(--red)" },
  { tag: "E-commerce · Lunchboxes", brand: "M-Design", summary: "Low ROAS while competing against established global brands. We rebuilt the funnel and lifted ROAS from 3 to 10 in 60 days.", metric: "3 → 10", label: "ROAS in 60 days", color: "var(--foreground)" },
  { tag: "Healthcare · Saudi Arabia", brand: "Oriyah Polyclinic", summary: "Zero reliance on social for patient acquisition. Content strategy plus paid ads became their primary acquisition channel.", metric: "3x", label: "Patient bookings", color: "var(--blue)" },
  { tag: "Real Estate · Saudi Arabia", brand: "Mezon", summary: "No social presence and no online lead generation. We built the brand from scratch and generated unit sales in the first month.", metric: "6 units", label: "Sold in month 1", color: "var(--foreground)" },
  { tag: "Tourism · Hajj & Umrah", brand: "Al Hanove", summary: "Highly seasonal bookings that needed to scale during Hajj. We doubled peak-season bookings versus the previous year.", metric: "2x", label: "Seasonal bookings", color: "var(--red)" },
];

const PDF_HREF = "/sonic-company-profile.pdf";

export default function CaseStudies() {
  return (
    <section id="work" className="py-20 md:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="kicker reveal">Our work</p>
            <h2 className="h-sec text-foreground mt-5 reveal">Real brands. Real results.</h2>
            <p className="mt-5 text-muted reveal">A selection from 14 case studies — all delivered within 30–90 days.</p>
          </div>
          <a href={PDF_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-ghost reveal">
            8 More Case Studies
            <svg className="arr" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {CASES.map((c, i) => (
            <article key={c.brand} className="card card-hover overflow-hidden reveal flex flex-col" style={{ transitionDelay: `${i * 0.05}s` }}>
              <div className="p-7 border-b border-line flex-1">
                <span className="chip mb-4">{c.tag}</span>
                <h3 className="text-foreground text-xl font-semibold font-display">{c.brand}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{c.summary}</p>
              </div>
              <div className="p-6 flex items-end justify-between">
                <div className="font-display text-3xl font-bold" style={{ color: c.color }}>{c.metric}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-2 text-right max-w-[120px]">{c.label}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
