import Button from "@/components/ui/Button";

const TICKER_CLIENTS = [
  "Nike", "Adidas", "Samsung", "Spotify", "Airbnb", "Shopify",
  "Red Bull", "Tesla", "Netflix", "Stripe",
  "Nike", "Adidas", "Samsung", "Spotify", "Airbnb", "Shopify",
  "Red Bull", "Tesla", "Netflix", "Stripe",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col bg-white dark:bg-brand-black overflow-hidden">

      {/* Subtle grid — color comes from CSS variable so it flips with theme */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Blue glow */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-blue opacity-5 dark:opacity-10 blur-[120px] pointer-events-none" />
      {/* Red glow */}
      <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-brand-red opacity-5 dark:opacity-8 blur-[100px] pointer-events-none" />

      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-6 pt-28 pb-10">

        {/* Eyebrow */}
        <span className="inline-block border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-8">
          Digital Marketing Agency
        </span>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-brand-black dark:text-white leading-[1.05] tracking-tight max-w-5xl mb-6">
          We Build Brands{" "}
          <span className="text-brand-blue">That Move.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
          Performance marketing and creative strategy for brands
          ready to dominate their market.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button variant="primary" className="text-base px-8 py-4">
            See Our Work
          </Button>
          <a
            href="#contact"
            className="text-brand-black dark:text-white border border-gray-300 dark:border-white/20 hover:border-brand-blue dark:hover:border-brand-blue text-base px-8 py-4 rounded-full font-semibold transition-all duration-200"
          >
            Talk to Us →
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap justify-center gap-12 text-center">
          {[
            { value: "50+",   label: "Brands Scaled" },
            { value: "$10M+", label: "Ad Spend Managed" },
            { value: "3.9×",  label: "Average ROAS" },
            { value: "8 Yrs", label: "In the Game" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-bold text-brand-black dark:text-white">{stat.value}</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ticker */}
      <div className="relative border-t border-gray-100 dark:border-white/5 py-5 overflow-hidden">
        <p className="absolute left-6 top-1/2 -translate-y-1/2 text-xs text-gray-400 dark:text-gray-600 uppercase tracking-widest z-10 hidden md:block">
          Trusted by
        </p>
        <div className="flex animate-ticker whitespace-nowrap">
          {TICKER_CLIENTS.map((name, i) => (
            <span
              key={i}
              className="inline-block text-gray-400 dark:text-gray-600 font-semibold text-sm uppercase tracking-widest mx-10 hover:text-brand-blue transition-colors"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
