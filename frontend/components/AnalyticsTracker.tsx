"use client";

import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";

// Renders nothing — it exists only to fire a page_view once the page
// has mounted in the browser. Mounted in the root layout.
export default function AnalyticsTracker() {
  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  return null;
}
