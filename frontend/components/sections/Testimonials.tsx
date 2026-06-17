import SectionTitle from "@/components/ui/SectionTitle";

const TESTIMONIALS = [
  { quote: "Sonic didn't just run our ads — they rebuilt the entire way we think about customer acquisition. Revenue is up 3× in six months.", name: "Sarah Chen",    title: "CEO, Urban Threads",          initials: "SC", color: "bg-brand-blue" },
  { quote: "The brand repositioning they did for us was a game-changer. We went from being 'just another SaaS' to a category we now own.",    name: "Marcus Obi",   title: "Co-Founder, Flowdesk",        initials: "MO", color: "bg-violet-600" },
  { quote: "Our TikTok campaign hit 12 million views and we sold out twice. I genuinely didn't know marketing could feel this effortless.",   name: "Priya Nair",   title: "Head of Growth, Crest Labs",  initials: "PN", color: "bg-emerald-600" },
  { quote: "They cut our cost per acquisition by 40% in the first month. That's more than any agency has done for us in three years.",        name: "James Kowalski", title: "CMO, Nexaflow",             initials: "JK", color: "bg-orange-500" },
  { quote: "Transparent reporting, no fluff, and they actually pick up the phone. Sonic is what every agency should be.",                     name: "Amira Hassan", title: "Marketing Director, Baseline", initials: "AH", color: "bg-brand-red" },
  { quote: "We briefed them on a Tuesday and had live creatives by Thursday. The speed alone is worth the price of admission.",               name: "David Park",   title: "Founder, Volta Gear",         initials: "DP", color: "bg-cyan-600" },
];

export default function Testimonials() {
  return (
    <section className="py-28 bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">

        <SectionTitle
          label="Client Love"
          title="Don't Take Our Word for It"
          subtitle="Real feedback from founders, CMOs, and growth teams we've worked with."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="border border-gray-200 dark:border-white/8 bg-white dark:bg-white/2 rounded-2xl p-7 flex flex-col gap-5 shadow-sm dark:shadow-none hover:shadow-md hover:border-gray-300 dark:hover:border-white/15 transition-all duration-300"
            >
              <div className="flex gap-0.5 text-yellow-400 text-sm">★★★★★</div>

              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-gray-100 dark:border-white/8">
                <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-brand-black dark:text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-gray-400 dark:text-gray-500 text-xs">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
