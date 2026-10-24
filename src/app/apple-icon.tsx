import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#7c3aed" }}>
        <svg viewBox="0 0 32 32" width="180" height="180">
          <path fill="#fff" d="M16 5 6 10.5V13h20v-2.5zM8.5 14.5h2.5v8H8.5zm6.25 0h2.5v8h-2.5zm6.25 0h2.5v8H21zM6 24h20v2.5H6z" />
        </svg>
      </div>
    ),
    size,
  );
}
