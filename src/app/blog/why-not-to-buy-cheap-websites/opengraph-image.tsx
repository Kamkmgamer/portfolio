import { ImageResponse } from "next/og";

export const alt = "Why a $20 Website Will Cost You Thousands";
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
              color: "#ef4444",
              fontSize: 14,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            Business Advice
          </span>
        </div>
        <h1
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#ffffff",
            fontFamily: "serif",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Why a $20 Website
        </h1>
        <h2
          style={{
            fontSize: 40,
            fontWeight: 400,
            color: "#ef4444",
            fontFamily: "serif",
            fontStyle: "italic",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          Will Cost You Thousands
        </h2>
        <p
          style={{
            fontSize: 20,
            color: "rgba(255, 255, 255, 0.6)",
            textAlign: "center",
            maxWidth: 600,
          }}
        >
          No Jargon | Real Demos | Honest Advice
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
