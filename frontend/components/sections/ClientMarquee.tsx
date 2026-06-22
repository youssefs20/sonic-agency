const CLIENTS = [
  "Crystal Teeth",
  "Golden Touch",
  "Exceer",
  "Al Hanove",
  "Ceramica Ranito",
  "Mezon",
  "Rfaheya",
  "Oriyah Polyclinic",
  "M-Design",
  "NutriFitness",
  "Donuts Bakery",
];

export default function ClientMarquee() {
  const row = [...CLIENTS, ...CLIENTS]; // duplicated for a seamless -50% loop

  return (
    <section className="border-y border-line py-12">
      <div className="container-x">
        <p className="kicker mb-6">Trusted across health, retail, e-commerce, real estate &amp; B2B</p>
      </div>
      <div className="marquee-track overflow-hidden relative">
        <div className="pointer-events-none absolute left-0 inset-y-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 inset-y-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />
        <div className="marquee gap-12">
          {row.map((name, i) => (
            <span key={i} className="font-display font-bold text-xl md:text-2xl text-muted-2 whitespace-nowrap px-2">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
