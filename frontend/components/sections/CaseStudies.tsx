"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "@/components/ui/Lightbox";

// Figures taken verbatim from the company profile (public/SONIC--_.pdf).
// Click any card to open the full-size image in a lightbox.
type Stat = { v: string; label: string; red?: boolean };
type Case = {
  name: string;
  image: string;
  tags: string[];
  desc: string;
  stats: Stat[];
};

const CASES: Case[] = [
  {
    name: "Mezon",
    image: "/work/mezon.jpg",
    tags: ["Real Estate", "KSA", "Month 1"],
    desc: "A Saudi real-estate developer with zero social presence and no lead generation. We built the brand from scratch around awareness, trust, and qualified leads.",
    stats: [
      { v: "6", label: "Unit sales · month 1" },
      { v: "0→1", label: "Built from scratch", red: true },
    ],
  },
  {
    name: "NutriFitness",
    image: "/work/nutrifitness.jpg",
    tags: ["Wellness", "Egypt", "Clinic"],
    desc: "A nutrition clinic with limited online presence and inconsistent client acquisition. We strengthened its digital presence, built the founder's personal brand, and created a content system focused on trust and conversion.",
    stats: [
      { v: "2x", label: "Bookings" },
      { v: "+", label: "Personal brand", red: true },
    ],
  },
  {
    name: "Donuts Bakery",
    image: "/work/donuts-bakery.jpg",
    tags: ["Bakery", "Egypt", "Local"],
    desc: "An F&B bakery with no social presence, which limited local awareness. We built a strong social presence and an awareness campaign focused on reaching nearby customers.",
    stats: [
      { v: "Grew", label: "Local foot traffic" },
      { v: "0→1", label: "Social presence", red: true },
    ],
  },
  {
    name: "Aseer Pharmacies",
    image: "/work/aseer-pharmacies.jpg",
    tags: ["Pharmacy", "KSA", "Online + Offline"],
    desc: "A Saudi pharmacy chain with a weak online presence and low website traffic. We improved visibility through social and Google ads while building stronger brand awareness.",
    stats: [
      { v: "2x", label: "Sales & visits" },
      { v: "+", label: "Brand awareness", red: true },
    ],
  },
];

export default function CaseStudies() {
  const [active, setActive] = useState<Case | null>(null);

  return (
    <section id="cases" className="panel-bg section-pad">
      <div className="container-x">
        <div style={{ maxWidth: "42rem", margin: "0 auto 3rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <div className="reveal">
            <h2 className="h-sec" style={{ margin: 0 }}>
              Real brands. Real numbers. <span className="text-grad">No reports.</span>
            </h2>
          </div>
          <p className="reveal" data-delay="1" style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.6, margin: 0 }}>
            Each engagement starts with a number we agree on — and ends with one we can prove. Tap any card to view the full case.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {CASES.map((c, i) => (
            <button
              type="button"
              key={c.name}
              onClick={() => setActive(c)}
              className="case-card clickable reveal text-left"
              data-delay={i % 2 === 1 ? "1" : undefined}
              aria-label={`View ${c.name} case study image`}
            >
              <Image src={c.image} alt={c.name} fill sizes="(max-width: 768px) 92vw, 46vw" quality={70} className="object-cover" style={{ zIndex: 1 }} />
              <div className="case-grad" />
              <div className="case-sweep" />
              <div className="case-top">
                {c.tags.map((t) => <span key={t} className="case-tag">{t}</span>)}
              </div>
              <div className="case-bottom">
                <div className="case-name">{c.name}</div>
                <p className="case-desc">{c.desc}</p>
                <div className="case-metrics">
                  {c.stats.map((m) => (
                    <div key={m.label} className="case-metric">
                      <div className={`mv${m.red ? " red" : ""}`}>{m.v}</div>
                      <div className="ml">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        src={active?.image ?? null}
        caption={active ? `${active.name} — ${active.tags.join(" · ")}` : undefined}
        onClose={() => setActive(null)}
      />
    </section>
  );
}
