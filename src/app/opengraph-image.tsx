import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "Khalil AbdalMageed - Web Developer & Designer";
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
            "radial-gradient(ellipse at top, rgba(212, 175, 55, 0.15) 0%, transparent 50%)",
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
                width: 120,
                height: 3,
                backgroundColor: "#d4af37",
                marginRight: 28,
              }}
            />
            <span
              style={{
                color: "#d4af37",
                fontSize: 20,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                fontFamily: "Noto Sans",
              }}
            >
              Web Developer
            </span>
            <div
              style={{
                width: 120,
                height: 3,
                backgroundColor: "#d4af37",
                marginLeft: 28,
              }}
            />
          </div>
          <h1
            style={{
              fontSize: 88,
              fontWeight: 700,
              color: "#ffffff",
              fontFamily: "Noto Sans",
              textAlign: "center",
              marginBottom: 28,
              letterSpacing: "-0.02em",
            }}
          >
            Khalil AbdalMageed
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
            SEO-friendly, responsive websites built with React and Next.js
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
            khalil.mageed.net
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
