import { ImageResponse } from "next/og";

export const alt = "Memory Palace: memorize random sequences, then recall them in order";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SAMPLE = ["64", "17", "72", "13", "74", "35", "92", "08"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0c0a09",
          color: "#f5f5f4",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg viewBox="0 0 32 32" width="88" height="88">
            <rect width="32" height="32" rx="7" fill="#7c3aed" />
            <path fill="#fff" d="M16 5 6 10.5V13h20v-2.5zM8.5 14.5h2.5v8H8.5zm6.25 0h2.5v8h-2.5zm6.25 0h2.5v8H21zM6 24h20v2.5H6z" />
          </svg>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 700, letterSpacing: -2 }}>Memory Palace</div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {SAMPLE.map((n, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 112,
                padding: "12px 0 20px",
                borderRadius: 20,
                border: "2px solid #292524",
                background: "#1c1917",
              }}
            >
              <div style={{ display: "flex", fontSize: 20, color: "#a8a29e", alignSelf: "flex-start", marginLeft: 16 }}>{i + 1}</div>
              <div style={{ display: "flex", fontSize: 56, fontWeight: 700, letterSpacing: 4 }}>{n}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", fontSize: 36, color: "#a8a29e", lineHeight: 1.4 }}>
          Memorize random sequences against the clock, then recall them in order.
        </div>
      </div>
    ),
    size,
  );
}
