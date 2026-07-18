// All calls to the Go backend go through this file.
// Components never use fetch() directly — they call functions from here.

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// True when no backend URL is configured — e.g. a Vercel review preview
// with no Go API deployed alongside it. Falls back to fake success
// responses instead of a real network call.
const DEMO_MODE = !API_BASE;

export async function submitContactForm(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
  // Honeypot field — always empty for real users; see Contact.tsx.
  website?: string;
}) {
  if (DEMO_MODE) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { id: 0, message: "Message received! We'll be in touch within 24 hours." };
  }

  const res = await fetch(`${API_BASE}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit contact form");
  return res.json();
}

// Matches the backend AnalyticsEvent schema: event_name (required),
// optional path and source. Callers should go through lib/analytics.ts
// rather than calling this directly.
export async function sendAnalyticsEvent(event: {
  event_name: string;
  path?: string;
  source?: string;
}) {
  if (DEMO_MODE) {
    return { ok: true };
  }

  const res = await fetch(`${API_BASE}/api/analytics/event`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  if (!res.ok) throw new Error("Failed to send analytics event");
  return res.json();
}
