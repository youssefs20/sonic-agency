// Real brands from the company profile "BRANDS WE WORKED WITH" wall.
const CLIENTS = [
  "Crystal Teeth", "Golden Touch", "Rfaheya", "Chicken Maraei", "Mezon",
  "NutriFitness", "Aseer Pharmacies", "Donuts Bakery", "M-Design", "Oriyah Polyclinic",
  "Al Hanove Travel", "Ceramica Ranito", "Modern House", "VIRA Real Estate", "Profilm",
  "Fit Factory", "Gabal Omar", "Chicken Plus", "Banny", "Zad of Quran",
  "Alnour Center", "El Shobrawy", "El Sherbiny", "Hbet Zaatar", "El Demeshky",
];

export default function ClientMarquee() {
  const row = [...CLIENTS, ...CLIENTS]; // duplicated for a seamless -50% loop

  return (
    <section className="panel-bg" style={{ padding: "2.75rem 0" }}>
      <div className="overflow-hidden relative">
        <div className="pointer-events-none absolute left-0 inset-y-0 w-24 z-10" style={{ background: "linear-gradient(90deg, var(--panel), transparent)" }} />
        <div className="pointer-events-none absolute right-0 inset-y-0 w-24 z-10" style={{ background: "linear-gradient(270deg, var(--panel), transparent)" }} />
        <div className="marquee gap-12" style={{ animationDuration: "70s" }}>
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
