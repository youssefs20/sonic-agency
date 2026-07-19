// Thin wrapper around all tracking calls. Sends events to our Go backend
// (POST /api/analytics/event) and also logs to the console in dev.
//
// Analytics must NEVER break the page — every send swallows its own errors.

import { sendAnalyticsEvent } from "@/lib/api";

const DEV = process.env.NODE_ENV !== "production";

export function trackPageView(path: string) {
  if (DEV) console.log("[Analytics] page_view:", path);
  send({ event_name: "page_view", path });
}

export function trackEvent(name: string, props?: { source?: string }) {
  if (DEV) console.log("[Analytics] event:", name, props ?? {});
  send({
    event_name: name,
    path: typeof window !== "undefined" ? window.location.pathname : "",
    source: props?.source,
  });
}

function send(event: { event_name: string; path?: string; source?: string }) {
  // Fire-and-forget: we don't await, and we never let a failure surface.
  sendAnalyticsEvent(event).catch((err) => {
    if (DEV) console.warn("[Analytics] failed to send event:", err);
  });
}
