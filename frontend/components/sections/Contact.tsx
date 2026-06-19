"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import { submitContactForm } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";

const INFO = [
  { label: "Email", value: "hello@sonicagency.com" },
  { label: "Phone", value: "+1 (555) 000-1234" },
  { label: "Hours", value: "Mon–Fri, 9am–6pm EST" },
];

const inputClass =
  "w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-brand-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-sm focus:outline-none focus:border-brand-blue transition-colors";

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

  return (
    <section id="contact" className="py-28 bg-white dark:bg-brand-black">
      <div className="max-w-7xl mx-auto px-6">

        <SectionTitle
          label="Get In Touch"
          title="Let's Build Something"
          subtitle="Tell us about your brand and goals. We'll get back to you within 24 hours."
        />

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">

          {/* Info */}
          <div className="flex flex-col justify-center gap-8">
            {INFO.map((item) => (
              <div key={item.label}>
                <p className="text-brand-blue text-xs uppercase tracking-widest font-semibold mb-1">{item.label}</p>
                <p className="text-brand-black dark:text-white text-lg font-medium">{item.value}</p>
              </div>
            ))}
            <div className="h-px bg-gray-200 dark:bg-white/10" />
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Not ready for a call yet? Fill out the form and we'll send over a free audit of your current marketing setup — no strings attached.
            </p>
          </div>

          {/* Form — wired to Go backend */}
          <form className="space-y-5" onSubmit={handleSubmit}>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-widest mb-2">Name *</label>
                <input type="text" placeholder="Jane Smith" required className={inputClass} value={form.name} onChange={handleChange("name")} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-widest mb-2">Email *</label>
                <input type="email" placeholder="jane@company.com" required className={inputClass} value={form.email} onChange={handleChange("email")} />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-widest mb-2">Phone</label>
              <input type="tel" placeholder="+1 (555) 000-0000" className={inputClass} value={form.phone} onChange={handleChange("phone")} />
            </div>

            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-widest mb-2">Message *</label>
              <textarea rows={5} placeholder="Tell us about your brand, your goals, and what's not working right now..." required className={`${inputClass} resize-none`} value={form.message} onChange={handleChange("message")} />
            </div>

            <Button type="submit" variant="primary" className="w-full text-base py-4" disabled={status === "loading"}>
              {status === "loading" ? "Sending..." : "Send Message"}
            </Button>

            {status === "success" && (
              <p className="text-emerald-600 dark:text-emerald-400 text-sm text-center">Thanks! We&apos;ll be in touch within 24 hours.</p>
            )}
            {status === "error" && (
              <p className="text-brand-red text-sm text-center">Something went wrong. Please try again.</p>
            )}

          </form>
        </div>
      </div>
    </section>
  );
}
