import SectionTitle from "@/components/ui/SectionTitle";

const VALUES = [
  { icon: "⚡", title: "Speed",     description: "We move faster than the market. Campaigns launched in days, not weeks." },
  { icon: "🎯", title: "Precision", description: "Every dollar tracked. Every audience segment refined. No wasted spend." },
  { icon: "🔥", title: "Results",   description: "We don't sell impressions — we sell outcomes. ROAS, revenue, growth." },
];

export default function About() {
  return (
    <section id="about" className="py-28 bg-white dark:bg-brand-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <SectionTitle label="About Us" title="Speed Meets Strategy" subtitle="" />

            <div className="space-y-5 text-gray-500 dark:text-gray-400 text-lg leading-relaxed -mt-8">
              <p>
                Sonic was founded on a simple belief: great brands don't wait.
                We combine data-driven performance marketing with bold creative
                to help ambitious companies break through the noise.
              </p>
              <p>
                From scrappy startups to established names, we've managed over{" "}
                <span className="text-brand-black dark:text-white font-semibold">$10 million</span> in
                ad spend and consistently delivered{" "}
                <span className="text-brand-blue font-semibold">3× — 6× ROAS</span> for
                our clients across e-commerce, SaaS, and lifestyle brands.
              </p>
            </div>

            <div className="mt-10 h-px bg-gray-200 dark:bg-white/10" />

            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { value: "50+",  label: "Clients" },
                { value: "120+", label: "Campaigns" },
                { value: "98%",  label: "Retention Rate" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-bold text-brand-black dark:text-white">{s.value}</p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="space-y-4">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="flex gap-5 border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/3 rounded-2xl p-6 hover:border-brand-blue/50 hover:bg-brand-blue/5 dark:hover:bg-brand-blue/5 transition-all duration-300"
              >
                <span className="text-3xl">{v.icon}</span>
                <div>
                  <h3 className="text-brand-black dark:text-white font-semibold text-lg mb-1">{v.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
