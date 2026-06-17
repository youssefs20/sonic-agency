import SectionTitle from "@/components/ui/SectionTitle";

const CLIENT_LOGOS = ["Nike", "Adidas", "Spotify", "Samsung", "Airbnb", "Shopify", "Red Bull", "Stripe"];

const PROJECTS = [
  {
    category: "E-Commerce · Performance Marketing",
    client: "Urban Threads",
    headline: "4.8× ROAS in 60 Days",
    description: "Rebuilt the entire paid social funnel for a fashion brand — new creatives, tighter audience segmentation, and an always-on retargeting stack.",
    metrics: [{ label: "ROAS", value: "4.8×" }, { label: "Revenue Growth", value: "+210%" }, { label: "CPA Drop", value: "−38%" }],
    lightBg: "bg-blue-50 border-blue-100",
    darkBg:  "dark:bg-blue-950/30 dark:border-blue-900/40",
    accent:  "text-blue-600 dark:text-blue-400",
  },
  {
    category: "SaaS · Brand Strategy",
    client: "Flowdesk",
    headline: "0 → 10K Users in One Quarter",
    description: "Repositioned a B2B SaaS tool from 'project management' to 'async team OS' — then launched a content + paid campaign around the new narrative.",
    metrics: [{ label: "New Users", value: "10,200" }, { label: "CAC", value: "−52%" }, { label: "Trial → Paid", value: "+34%" }],
    lightBg: "bg-violet-50 border-violet-100",
    darkBg:  "dark:bg-violet-950/30 dark:border-violet-900/40",
    accent:  "text-violet-600 dark:text-violet-400",
  },
  {
    category: "Lifestyle · Creative Production",
    client: "Crest Labs",
    headline: "Viral TikTok — 12M Views",
    description: "Produced a 6-video TikTok series for a wellness brand that hit 12 million organic views in three weeks and drove a 3× spike in direct traffic.",
    metrics: [{ label: "Organic Views", value: "12M" }, { label: "Direct Traffic", value: "+300%" }, { label: "Revenue Week", value: "+180%" }],
    lightBg: "bg-emerald-50 border-emerald-100",
    darkBg:  "dark:bg-emerald-950/30 dark:border-emerald-900/40",
    accent:  "text-emerald-600 dark:text-emerald-400",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-28 bg-white dark:bg-brand-black">
      <div className="max-w-7xl mx-auto px-6">

        <SectionTitle label="Our Work" title="Results That Speak" subtitle="A selection of campaigns and brands we've helped scale." />

        {/* Client logos */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-px border border-gray-200 dark:border-white/8 rounded-2xl overflow-hidden mb-16">
          {CLIENT_LOGOS.map((name) => (
            <div key={name} className="flex items-center justify-center py-6 bg-gray-50 dark:bg-white/2 hover:bg-brand-blue/5 transition-colors">
              <span className="text-gray-400 dark:text-gray-500 font-bold text-sm tracking-wide hover:text-brand-blue transition-colors">
                {name}
              </span>
            </div>
          ))}
        </div>

        {/* Project cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <div key={p.client} className={`rounded-2xl border p-7 flex flex-col ${p.lightBg} ${p.darkBg} hover:shadow-lg transition-all duration-300`}>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{p.category}</span>
              <h3 className="text-brand-black dark:text-white font-bold text-xl mt-2">{p.client}</h3>
              <p className={`text-sm font-semibold mt-1 mb-4 ${p.accent}`}>{p.headline}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed flex-1">{p.description}</p>

              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-black/5 dark:border-white/8 pt-5">
                {p.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="text-brand-black dark:text-white font-bold text-lg">{m.value}</p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs mt-0.5">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
