import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { LOGO_PATH, LOGO_VIEWBOX } from "@/components/site/Logo";

/* Shared Open Graph / Twitter card renderer in the "studio monograph" identity:
   onyx field, warm amber signal, paper-white type. */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const COLORS = {
  bg: "#0e0d0b",
  ink: "#f3f0e9",
  muted: "#a8a397",
  subtle: "#7f7a6f",
  line: "#27251f",
  accent: "#f2a33a",
};

let fontPromise: Promise<Buffer> | null = null;
function loadFont() {
  // Only Noto Sans ships with next/og offline; it is registered for both weights.
  fontPromise ??= readFile(
    join(process.cwd(), "node_modules/next/dist/compiled/@vercel/og/noto-sans-v27-latin-regular.ttf"),
  );
  return fontPromise;
}

export async function renderOgImage({
  title,
  subtitle,
  path = "",
}: {
  title: string;
  subtitle?: string;
  path?: string;
}) {
  const font = await loadFont();
  const titleSize = title.length > 46 ? 58 : title.length > 30 ? 66 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          backgroundColor: COLORS.bg,
          padding: "64px 72px 56px",
          fontFamily: "Noto Sans",
          overflow: "hidden",
        }}
      >
        {/* warm signal glow, top-right */}
        <div
          style={{
            position: "absolute",
            top: -340,
            right: -260,
            width: 760,
            height: 760,
            borderRadius: 9999,
            backgroundImage: "radial-gradient(circle, rgba(242,163,58,0.20) 0%, rgba(242,163,58,0.06) 40%, rgba(242,163,58,0) 70%)",
            display: "flex",
          }}
        />

        {/* brand row */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg width={62} height={56} viewBox={LOGO_VIEWBOX} fill={COLORS.accent} fillRule="evenodd">
            <path d={LOGO_PATH} />
          </svg>
          <span style={{ marginLeft: 18, fontSize: 26, color: COLORS.ink, letterSpacing: "-0.01em" }}>
            Khalil AbdalMageed
          </span>
        </div>

        {/* message */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flexGrow: 1 }}>
          <span
            style={{
              fontSize: titleSize,
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              color: COLORS.ink,
              maxWidth: 960,
            }}
          >
            {title}
          </span>
          {subtitle && (
            <span
              style={{
                marginTop: 26,
                fontSize: 28,
                lineHeight: 1.4,
                color: COLORS.muted,
                maxWidth: 860,
              }}
            >
              {subtitle}
            </span>
          )}
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${COLORS.line}`,
            paddingTop: 26,
          }}
        >
          <span style={{ fontSize: 22, color: COLORS.subtle }}>khalil.mageed.net{path}</span>
          <span style={{ fontSize: 20, color: COLORS.subtle }}>Cairo, Egypt</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Noto Sans", data: font, style: "normal", weight: 400 },
        { name: "Noto Sans", data: font, style: "normal", weight: 700 },
      ],
    },
  );
}
