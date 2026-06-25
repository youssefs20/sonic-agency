"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Socials from "@/components/ui/Socials";
import { submitContactForm } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";

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
    <section id="contact" style={{ position: "relative", overflow: "hidden", padding: "5.5rem 0", borderTop: "1px solid var(--line)", background: "var(--panel)" }}>
      <div className="bg-grid" style={{ position: "absolute", inset: 0, opacity: 0.7 }} />
      <div className="glow glow-blue" style={{ top: "-8rem", left: "-6rem", height: "28rem", width: "28rem" }} />
      <div className="glow glow-red" style={{ bottom: "-8rem", right: "-6rem", height: "24rem", width: "24rem" }} />

      <div className="container-x" style={{ position: "relative" }}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Pitch */}
          <div className="reveal">
            <h2 className="h-sec" style={{ margin: "0 0 1.25rem", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
              Start Growing <span className="text-grad">With Us.</span>
            </h2>
            <p style={{ margin: 0, fontSize: "1.1rem", lineHeight: 1.6, color: "var(--muted)", maxWidth: "32rem" }}>
              Tell us where you want to be in 90 days. We&apos;ll come back with the plan — or tell you straight if we&apos;re not the right partner.
            </p>

            <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* TODO: replace placeholder email before launch */}
              <ContactRow icon="mail">
                <a href="mailto:grow@sonic.agency" className="hover:text-brand-blue transition-colors" style={{ color: "var(--foreground)", fontWeight: 500 }}>grow@sonic.agency</a>
              </ContactRow>
              <ContactRow icon="phone">
                <a href="tel:+201146056172" className="hover:text-brand-blue transition-colors" style={{ color: "var(--foreground)", fontWeight: 500 }}>+20 11 46056172</a>
              </ContactRow>
              <ContactRow icon="pin">
                <span style={{ color: "var(--foreground)" }}>Egypt · KSA · UAE · Qatar</span>
              </ContactRow>
            </div>

            <Socials className="mt-7" />
          </div>

          {/* Form */}
          <form className="card reveal" data-delay="1" onSubmit={handleSubmit} style={{ padding: "2rem" }}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Name *</label>
                <input required type="text" className="field" placeholder="Your full name" value={form.name} onChange={handleChange("name")} />
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input required type="email" className="field" placeholder="you@brand.com" value={form.email} onChange={handleChange("email")} />
              </div>
            </div>
            <div className="mt-4">
              <label className={labelClass}>Phone</label>
              <input type="tel" className="field" placeholder="+00 000 000 0000" value={form.phone} onChange={handleChange("phone")} />
            </div>
            <div className="mt-4">
              <label className={labelClass}>Growth target *</label>
              <textarea required rows={4} className="field resize-none" placeholder="What does success look like in 90 days?" value={form.message} onChange={handleChange("message")} />
            </div>
            <Button type="submit" variant="primary" className="w-full mt-5" disabled={status === "loading"}>
              {status === "loading" ? "Sending…" : "Send growth brief"}
              {status !== "loading" && (
                <svg className="arr" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              )}
            </Button>
            {status === "success" && (
              <p className="mt-4 text-center text-sm text-brand-blue">Thanks — we&apos;ll reply within one business day.</p>
            )}
            {status === "error" && (
              <p className="mt-4 text-center text-sm text-brand-red">Something went wrong. Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon, children }: { icon: "mail" | "phone" | "pin"; children: React.ReactNode }) {
  const paths: Record<string, React.ReactNode> = {
    mail: (<><path d="M4 4h16v16H4z" /><path d="M4 4l8 8 8-8" /></>),
    phone: (<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />),
    pin: (<><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>),
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
      <span style={{ width: 36, height: 36, borderRadius: 999, background: "var(--background)", border: "1px solid var(--line-strong)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--blue)" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{paths[icon]}</svg>
      </span>
      {children}
    </div>
  );
}
