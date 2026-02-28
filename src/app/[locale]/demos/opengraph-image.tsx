import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "Live Demos - Khalil AbdalMageed Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const notoSansRegular = await readFile(
    join(process.cwd(), "node_modules/next/dist/compiled/@vercel/og/noto-sans-v27-latin-regular.ttf")
  );
  const notoSansBold = await readFile(
    join(process.cwd(), "node_modules/next/dist/compiled/@vercel/og/noto-sans-v27-latin-regular.ttf")
  );

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
            "radial-gradient(ellipse at top, rgba(184, 134, 11, 0.15) 0%, transparent 50%)",
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
              marginBottom: 32,
            }}
          >
            <div
              style={{
                width: 80,
                height: 3,
                backgroundColor: "#b8860b",
                marginRight: 28,
              }}
            />
            <span
              style={{
                color: "#b8860b",
                fontSize: 20,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                fontFamily: "Noto Sans",
              }}
            >
              Interactive
            </span>
            <div
              style={{
                width: 80,
                height: 3,
                backgroundColor: "#b8860b",
                marginLeft: 28,
              }}
            />
          </div>
          <h1
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#ffffff",
              fontFamily: "Noto Sans",
              textAlign: "center",
              marginBottom: 28,
              letterSpacing: "-0.02em",
            }}
          >
            Live Demos
          </h1>
          <p
            style={{
              fontSize: 28,
              color: "rgba(255, 255, 255, 0.55)",
              textAlign: "center",
              maxWidth: 700,
              fontFamily: "Noto Sans",
              lineHeight: 1.5,
            }}
          >
            See exactly what $200 vs $2000 vs $10,000 websites look like
          </p>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 52,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              color: "rgba(255, 255, 255, 0.35)",
              fontSize: 20,
              fontFamily: "Noto Sans",
            }}
          >
            khalil.mageed.net/demos
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Noto Sans",
          data: notoSansRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Noto Sans",
          data: notoSansBold,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
