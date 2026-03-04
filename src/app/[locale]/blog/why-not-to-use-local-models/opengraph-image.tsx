import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "Why Not to Use Local Models: The Honest Truth";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const notoSans = await readFile(
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
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 28,
          }}
        >
          <span
            style={{
              color: "#d4a853",
              fontSize: 18,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              fontFamily: "Noto Sans",
            }}
          >
            AI & Development
          </span>
        </div>
        <h1
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#ffffff",
            fontFamily: "Noto Sans",
            textAlign: "center",
            marginBottom: 16,
            letterSpacing: "-0.02em",
          }}
        >
          Why Not to Use
        </h1>
        <h2
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#d4a853",
            fontFamily: "Noto Sans",
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          Local Models?
        </h2>
        <p
          style={{
            fontSize: 24,
            color: "rgba(255, 255, 255, 0.5)",
            textAlign: "center",
            fontFamily: "Noto Sans",
          }}
        >
          The honest truth about saving $200/month
        </p>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Noto Sans",
          data: notoSans,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
