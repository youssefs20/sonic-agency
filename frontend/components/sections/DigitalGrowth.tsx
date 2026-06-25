"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "@/components/ui/Lightbox";

// Brand stories — copy taken from the company-profile case studies (public/SONIC--_.pdf).
// Images live in /public/work. Each row reveals on scroll (global ScrollFX .reveal).
// Every image is clickable and opens full-size in the lightbox.
type Stat = { v: string; label: string; red?: boolean };
type Brand = {
  name: string;
  sector: string;
  desc: string;
  images: string[];
  stats?: Stat[];
  chips?: string[];
};

const BRANDS: Brand[] = [
  {
    name: "Crystal Teeth",
    sector: "Healthcare · Egypt",
    desc: "A dental clinic chain that leaned heavily on paid ads — bookings dropped whenever spend paused. We shifted them from ad-dependency to a stronger growth system built on strategic content, performance ads, and social brand presence.",
    images: ["/work/crystal-teeth-1.jpg", "/work/crystal-teeth-2.jpg"],
    stats: [
      { v: "+167%", label: "Monthly bookings" },
      { v: "1.5K→4K", label: "Bookings / month", red: true },
    ],
  },
  {
    name: "Chicken Maraei",
    sector: "F&B · Egypt",
    desc: "A content-driven social campaign built to grow awareness and engagement — promoting bucket meals through lifestyle, event, AI, and humorous creative aimed at an 18–35 audience. Our role covered creative strategy, content planning, art direction, and campaign concept.",
    images: ["/work/chicken-maraei-1.jpg", "/work/chicken-maraei-2.jpg"],
    chips: ["Creative strategy", "Content planning", "Art direction", "Campaign concept"],
  },
  {
    name: "Rfaheya",
    sector: "Fragrance · Egypt",
    desc: "A luxury perfume e-commerce brand held back by weak product presentation and website issues that hurt conversion. We rebuilt the website and content system, then launched performance-driven ads.",
    images: ["/work/rfaheya-1.jpg", "/work/rfaheya-2.jpg"],
    stats: [
      { v: "2x", label: "Sales increase" },
      { v: "30", label: "Days to result", red: true },
    ],
  },
  {
    name: "Golden Touch",
    sector: "Home Goods · Egypt",
    desc: "A home-goods e-commerce brand with minimal sales and no clear media-buying approach. We built a content strategy and launched paid ads focused on scaling performance.",
    images: ["/work/golden-touch.jpg"],
    stats: [
      { v: "+300%", label: "Sales · 1 month" },
      { v: "500K→2M", label: "Revenue (EGP)", red: true },
    ],
  },
  {
    name: "M-Design",
    sector: "Real Estate · KSA",
    desc: "A Saudi-based developer with zero social presence and no online lead generation. We built the brand from scratch, developed its social media presence, and launched a strategy focused on generating qualified leads.",
    images: ["/work/m-design-1.jpg", "/work/m-design-2.jpg"],
    chips: ["Built from scratch", "Social presence", "Lead generation"],
  },
];

export default function DigitalGrowth() {
  const [active, setActive] = useState<{ src: string; caption: string } | null>(null);

  const open = (src: string, caption: string) => setActive({ src, caption });

  return (
    <section id="work">
      {/* Blue heading band */}
      <div className="dg-band reveal" style={{ padding: "5.5rem 0 5.5rem" }}>
        <div className="container-x" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <h2 className="dg-heading">
            <span className="dg-mask"><span className="dg-word w1">Digital</span></span>{" "}
            <span className="dg-mask"><span className="dg-word w2">Growth.</span></span>
          </h2>
          <p style={{ margin: "1.5rem auto 0", maxWidth: "34rem", color: "rgba(255,255,255,0.85)", fontSize: "1.05rem", lineHeight: 1.6 }}>
            Real brands we scaled — the work, and what it moved.
          </p>
        </div>
      </div>

      {/* Brand stories */}
      <div className="section-pad">
        <div className="container-x">
          <div className="dg-show">
            {BRANDS.map((b, i) => {
              const single = b.images.length < 2;
              return (
                <article key={b.name} className={`dg-row${i % 2 === 1 ? " flip" : ""} reveal`}>
                  <div className={`dg-collage${single ? " single" : ""}`}>
                    <button type="button" className="imgwrap img-a" onClick={() => open(b.images[0], b.name)} aria-label={`View ${b.name} image, full size`}>
                      <Image src={b.images[0]} alt={`${b.name} — work sample`} fill sizes="(max-width: 900px) 80vw, 36vw" quality={72} className="object-cover" />
                    </button>
                    {!single && (
                      <button type="button" className="imgwrap img-b" onClick={() => open(b.images[1], b.name)} aria-label={`View ${b.name} second image, full size`}>
                        <Image src={b.images[1]} alt={`${b.name} — work sample`} fill sizes="(max-width: 900px) 58vw, 26vw" quality={72} className="object-cover" />
                      </button>
                    )}
                  </div>
                  <div>
                    <span className="dg-eyebrow">{b.sector}</span>
                    <h3 className="dg-brand">{b.name}</h3>
                    <p className="dg-desc">{b.desc}</p>
                    {b.stats && (
                      <div className="dg-stats">
                        {b.stats.map((s) => (
                          <div key={s.label} className="dg-stat">
                            <div className={`sv${s.red ? " red" : ""}`}>{s.v}</div>
                            <div className="sl">{s.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {b.chips && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1.6rem" }}>
                        {b.chips.map((c) => <span key={c} className="chip">{c}</span>)}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <Lightbox src={active?.src ?? null} caption={active?.caption} onClose={() => setActive(null)} />
    </section>
  );
}
