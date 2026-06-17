import SectionTitle from "@/components/ui/SectionTitle";

const SERVICES = [
  { number: "01", title: "Performance Marketing", description: "Paid search, paid social, and programmatic campaigns built to generate measurable ROI — not just clicks.", tags: ["Google Ads", "Meta Ads", "TikTok Ads"] },
  { number: "02", title: "Brand Strategy",         description: "Positioning, messaging, and identity work that makes your brand impossible to ignore and easy to remember.", tags: ["Positioning", "Identity", "Messaging"] },
  { number: "03", title: "Creative Production",    description: "Scroll-stopping ads, landing pages, and video content crafted by our in-house creative team.", tags: ["Video", "Static Ads", "Landing Pages"] },
  { number: "04", title: "Social Media",           description: "Organic content strategy and community management that builds real audiences and brand loyalty.", tags: ["Instagram", "TikTok", "LinkedIn"] },
  { number: "05", title: "SEO & Content",          description: "Long-term organic growth through technical SEO, content strategy, and authority building.", tags: ["Technical SEO", "Content", "Link Building"] },
  { number: "06", title: "Analytics & Reporting",  description: "Crystal-clear dashboards and monthly reports that show exactly what's working and what's next.", tags: ["GA4", "Custom Dashboards", "Attribution"] },
];

export default function Services() {
  return (
    <section id="services" className="py-28 bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">

        <SectionTitle
          label="What We Do"
          title="Services Built for Growth"
          subtitle="Everything your brand needs to acquire customers, retain them, and scale."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {SERVICES.map((service) => (
            <div
              key={service.number}
              className="group border border-gray-200 dark:border-white/8 rounded-2xl p-7 bg-white dark:bg-white/2 shadow-sm dark:shadow-none hover:border-brand-blue/50 hover:shadow-brand-blue/10 hover:shadow-md dark:hover:bg-brand-blue/5 transition-all duration-300 cursor-default"
            >
              <span className="text-xs font-mono text-brand-blue/70 font-semibold tracking-widest">
                {service.number}
              </span>

              <h3 className="text-brand-black dark:text-white font-bold text-xl mt-3 mb-3 group-hover:text-brand-blue transition-colors">
                {service.title}
              </h3>

              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-5">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span key={tag} className="text-xs text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-white/10 rounded-full px-3 py-1 group-hover:border-brand-blue/30 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
