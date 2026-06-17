// Thin wrapper around all tracking calls.
// Right now it just logs to the console.
// In Phase 6 we'll send events to our Go backend and/or Google Analytics.

export function trackPageView(path: string) {
  console.log("[Analytics] page_view:", path);
}

export function trackEvent(name: string, props?: Record<string, string | number>) {
  console.log("[Analytics] event:", name, props ?? {});
}
