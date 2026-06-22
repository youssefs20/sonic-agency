"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Socials from "@/components/ui/Socials";
import { submitContactForm } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";

const PERKS = [
  "Free growth audit & opportunity map",
  "A plan with clear milestones and metrics",
  "Response within 1 business day",
];

const EMPTY_FORM = { name: "", email: "", phone: "", message: "" };
type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");

  const handleChange =
    (field: keyof typeof EMPTY_FORM) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await submitContactForm(form);
      setStatus("success");
      setForm(EMPTY_FORM);
      trackEvent("contact_form_submit", { source: "contact_section" });
    } catch {
      setStatus("error");
    }
  };

  const labelClass = "block font-mono text-xs uppercase tracking-wider text-muted mb-1.5";

  return (
    <section id="contact" className="py-20 md:py-28 bg-panel bg-grid border-y border-line">
      <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Pitch */}
        <div>
          <p className="kicker reveal">Let&apos;s talk</p>
          <h2 className="h-sec text-foreground mt-5 reveal">Ready to grow <span className="text-grad">fast?</span></h2>
          <p className="mt-6 text-muted text-lg max-w-md reveal">
            Tell us where you want to go. We&apos;ll come back with a focused,
            data-backed plan to get there — fast.
          </p>
          <ul className="mt-8 space-y-3 reveal">
            {PERKS.map((p) => (
              <li key={p} className="flex items-center gap-3 text-foreground">
                <span className="h-6 w-6 rounded-full grid place-items-center shrink-0" style={{ background: "color-mix(in oklab, var(--blue) 15%, transparent)", color: "var(--blue)" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-10 reveal">
            {/* TODO: replace placeholder contact details before launch */}
            <p className="font-mono text-xs uppercase tracking-wider text-muted mb-1">Email</p>
            <a href="mailto:hello@sonic.agency" className="text-foreground font-medium hover:text-brand-blue transition-colors">hello@sonic.agency</a>
            <Socials className="mt-6" />
          </div>
        </div>

        {/* Form */}
        <form className="card p-6 md:p-8 reveal" onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Full name *</label>
              <input required type="text" className="field" placeholder="Your name" value={form.name} onChange={handleChange("name")} />
            </div>
            <div>
              <label className={labelClass}>Work email *</label>
              <input required type="email" className="field" placeholder="you@company.com" value={form.email} onChange={handleChange("email")} />
            </div>
          </div>
          <div className="mt-4">
            <label className={labelClass}>Phone</label>
            <input type="tel" className="field" placeholder="+00 000 000 0000" value={form.phone} onChange={handleChange("phone")} />
          </div>
          <div className="mt-4">
            <label className={labelClass}>What do you want to grow? *</label>
            <textarea required rows={3} className="field resize-none" placeholder="Bookings, sales, leads…" value={form.message} onChange={handleChange("message")} />
          </div>
          <Button type="submit" variant="primary" className="w-full mt-5" disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : "Book a Growth Call"}
            {status !== "loading" && (
              <svg className="arr" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            )}
          </Button>
          {status === "success" && (
            <p className="mt-4 text-center text-sm text-brand-blue">Thanks — we&apos;ll send your growth plan within one business day.</p>
          )}
          {status === "error" && (
            <p className="mt-4 text-center text-sm text-brand-red">Something went wrong. Please try again.</p>
          )}
        </form>

      </div>
    </section>
  );
}
