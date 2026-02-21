import { ImageResponse } from "next/og";

export const alt = "Khalil AbdalMageed - Twitter";
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
          backgroundImage:
            "radial-gradient(ellipse at top, rgba(212, 175, 55, 0.1) 0%, transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
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
            <div
              style={{
                width: 80,
                height: 2,
                backgroundColor: "#d4af37",
                marginRight: 20,
              }}
            />
            <span
              style={{
                color: "#d4af37",
                fontSize: 14,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              Web Developer
            </span>
            <div
              style={{
                width: 80,
                height: 2,
                backgroundColor: "#d4af37",
                marginLeft: 20,
              }}
            />
          </div>
          <h1
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#ffffff",
              fontFamily: "serif",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Khalil AbdalMageed
          </h1>
          <p
            style={{
              fontSize: 24,
              color: "rgba(255, 255, 255, 0.6)",
              textAlign: "center",
              maxWidth: 600,
            }}
          >
            SEO-friendly, responsive websites built with React and Next.js
          </p>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              color: "rgba(255, 255, 255, 0.4)",
              fontSize: 16,
            }}
          >
            khalil.mageed.net
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
