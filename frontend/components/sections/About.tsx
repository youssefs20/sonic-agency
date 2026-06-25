// Copy is taken from the company profile "WHO WE ARE":
//   Full-service marketing agency building growth systems across industries
//   and markets · healthcare, e-commerce, tourism, real estate, consumer ·
//   Egypt, KSA, UAE, Qatar · 2–3x growth in 30–90 days ·
//   "We don't manage social media. We build growth systems."
const STATS = [
  { value: "4", color: "var(--blue)", label: "Markets" },
  { value: "25", color: "var(--foreground)", label: "Brands worked with" },
  { value: "9", color: "var(--red)", label: "Documented cases" },
  { value: "2–3x", color: "var(--foreground)", label: "Typical growth" },
];

const CHIPS = ["SPEED", "GROWTH", "PERFORMANCE", "RESULTS", "ALGORITHM-FIRST", "SELECTIVE"];

export default function About() {
  return (
    <section id="about" className="section-pad" style={{ position: "relative", overflow: "hidden" }}>
      <div className="glow glow-blue" style={{ top: "20%", left: "-10rem", height: "24rem", width: "24rem", opacity: 0.7 }} />
      <div className="container-x" style={{ position: "relative" }}>
        <div className="about-grid">
          <div className="reveal">
            <span className="font-mono" style={{ display: "inline-block", fontSize: "1.05rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 500 }}>About Sonic</span>
            <h2 className="h-sec" style={{ margin: "1.25rem 0 0" }}>
              We don&apos;t manage social media. <span className="text-grad">We build growth systems.</span>
            </h2>
          </div>
          <div className="reveal" data-delay="1">
            <p style={{ margin: 0, fontSize: "1.15rem", lineHeight: 1.6, color: "var(--foreground)" }}>
              Sonic is a full-service marketing agency building growth systems across industries and markets. We work with brands in healthcare,
              e-commerce, tourism, real estate, and consumer sectors across Egypt, KSA, UAE, and Qatar.
            </p>
            <p style={{ margin: "1.25rem 0 0", fontSize: "1.05rem", lineHeight: 1.6, color: "var(--muted)" }}>
              Before we start, we agree on what success looks like — strategy isn&apos;t vague, numbers are. The target is 2–3x growth in 30–90 days.
            </p>

            <div style={{ marginTop: "2.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1.5rem", paddingTop: "2rem", borderTop: "1px solid var(--line)" }}>
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-display" style={{ fontSize: "2rem", fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
                  <div className="font-mono" style={{ fontSize: "0.7rem", color: "var(--muted-2)", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: "0.5rem" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "2.5rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {CHIPS.map((c) => <span key={c} className="chip">{c}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
