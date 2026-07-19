"use client";

import { useEffect } from "react";
import { initAnalytics } from "@/lib/analytics";

export function AnalyticsInit() {
  useEffect(() => {
    initAnalytics();
    console.log(
      "%c▲ hiring? mailme@sumanth.tech",
      "color:#22d3ee;font-family:monospace;font-size:12px"
    );
  }, []);
  return null;
}
