import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(ellipse 60% 45% at 75% 20%, rgba(139,92,246,0.25), transparent), radial-gradient(ellipse 55% 40% at 20% 80%, rgba(34,211,238,0.2), transparent), #050810",
          color: "#e6edf7",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#22d3ee",
            fontFamily: "monospace",
            marginBottom: 24,
          }}
        >
          $ whoami
        </div>
        <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>
          {profile.name}
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "#8b98b8", marginTop: 16 }}>
          {`${profile.role} · JavaScript · DevOps · Data Engineering`}
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#22d3ee",
            fontFamily: "monospace",
            marginTop: 48,
          }}
        >
          sumanth.tech
        </div>
      </div>
    ),
    { ...size }
  );
}
