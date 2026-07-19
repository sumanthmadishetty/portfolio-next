"use client";

import mixpanel from "mixpanel-browser";

let initialized = false;

export function initAnalytics() {
  const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
  if (!token || initialized) return;
  mixpanel.init(token, {
    track_pageview: true,
    persistence: "localStorage",
  });
  initialized = true;
  mixpanel.track("app_opened");
}

export type AnalyticsEvent =
  | "app_opened"
  | "hero_3d_interacted"
  | "playground_used"
  | "konami_activated"
  | "contact_clicked"
  | "social_clicked"
  | "sound_toggled";

export function track(
  event: AnalyticsEvent,
  props?: Record<string, string | number | boolean>
) {
  if (!initialized) return;
  mixpanel.track(event, props);
}
