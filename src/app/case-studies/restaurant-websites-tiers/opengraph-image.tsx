import { ImageResponse } from "next/og";

export const alt = "Restaurant Website Tiers: $20 to $10,000";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050505",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <span
            style={{
              color: "#d4af37",
              fontSize: 14,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            Transparency Project
          </span>
        </div>
        <h1
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
            fontFamily: "serif",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          $20 to $10,000
        </h1>
        <h2
          style={{
            fontSize: 36,
            fontWeight: 400,
            color: "rgba(255, 255, 255, 0.5)",
            fontFamily: "serif",
            fontStyle: "italic",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          Restaurant Websites
        </h2>
        <p
          style={{
            fontSize: 20,
            color: "rgba(255, 255, 255, 0.6)",
            textAlign: "center",
            maxWidth: 600,
          }}
        >
          9 Live Demos | Transparent Pricing | Real Examples
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
