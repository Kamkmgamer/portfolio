"use client";

import React from "react";
import { projects } from "@/data/projects";

const SIZE = 640;
const C = SIZE / 2;

const pol = (angleDeg: number, r: number) => {
  const a = (angleDeg * Math.PI) / 180;
  return { x: C + r * Math.cos(a), y: C + r * Math.sin(a) };
};

type TrackDef = {
  id: number;
  angle: number;
  r: number;
  curl: number;
  muon?: boolean;
};

/* Track angles are placed so endpoint cards never overlap the vertex crosshair. */
const TRACK_DEFS: TrackDef[] = [
  { id: 1, angle: 38, r: 292, curl: 0, muon: true },
  { id: 9, angle: 152, r: 286, curl: 0, muon: true },
  { id: 6, angle: 78, r: 214, curl: 1 },
  { id: 2, angle: 118, r: 182, curl: -1 },
  { id: 5, angle: 212, r: 202, curl: 1 },
  { id: 3, angle: 262, r: 166, curl: -1 },
];

const STRUCTURAL_TRACKS = [
  { angle: 8, r: 132, curl: -1 },
  { angle: 60, r: 246, curl: 1 },
  { angle: 96, r: 150, curl: -1 },
  { angle: 138, r: 232, curl: 1 },
  { angle: 172, r: 138, curl: -1 },
  { angle: 228, r: 252, curl: 1 },
  { angle: 292, r: 156, curl: -1 },
  { angle: 328, r: 226, curl: 1 },
];

const trackPath = (t: { angle: number; r: number; curl: number; muon?: boolean }) => {
  const end = pol(t.angle, t.r);
  if (t.muon) return `M ${C} ${C} L ${end.x} ${end.y}`;
  const ctrl = pol(t.angle + t.curl * 26, t.r * 0.52);
  return `M ${C} ${C} Q ${ctrl.x} ${ctrl.y} ${end.x} ${end.y}`;
};

const wedgePath = (angle: number, half: number, r0: number, r1: number) => {
  const p0 = pol(angle - half, r1);
  const p1 = pol(angle + half, r1);
  const p2 = pol(angle + half, r0);
  const p3 = pol(angle - half, r0);
  return `M ${p0.x} ${p0.y} A ${r1} ${r1} 0 0 1 ${p1.x} ${p1.y} L ${p2.x} ${p2.y} A ${r0} ${r0} 0 0 0 ${p3.x} ${p3.y} Z`;
};

const RINGS = [
  { r: 120, dash: "52 14", strong: false },
  { r: 175, dash: "120 22 30 22", strong: false },
  { r: 235, dash: "200 30", strong: false },
  { r: 295, dash: "420 26 60 26", strong: true },
];

const WEDGES = [
  { angle: 28, half: 12, r0: 242, r1: 294 },
  { angle: 196, half: 9, r0: 242, r1: 294 },
  { angle: 288, half: 14, r0: 242, r1: 294 },
];

const TICKS = Array.from({ length: 24 }, (_, i) => i * 15);

const fadeStyle = (dim: boolean, dimmed: number) => ({
  opacity: dim ? dimmed : 1,
  transition: "opacity 0.35s ease",
});

function ArrowGlyph() {
  return (
    <svg viewBox="0 0 18 18" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="M2 9h12M9 4l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function EventDisplay({
  openLabel,
  groupLabel,
}: {
  openLabel: string;
  groupLabel: string;
}) {
  const [activeId, setActiveId] = React.useState<number | null>(null);
  const clearTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeProject = activeId !== null ? projects.find((p) => p.id === activeId) : undefined;
  const activeDef = TRACK_DEFS.find((t) => t.id === activeId);

  const activate = (id: number) => {
    if (clearTimer.current) clearTimeout(clearTimer.current);
    setActiveId(id);
  };

  const deactivateSoon = () => {
    if (clearTimer.current) clearTimeout(clearTimer.current);
    clearTimer.current = setTimeout(() => setActiveId(null), 120);
  };

  React.useEffect(() => () => {
    if (clearTimer.current) clearTimeout(clearTimer.current);
  }, []);

  const dim = activeId !== null;

  return (
    <div className="relative w-full max-w-[34rem] mx-auto" role="group" aria-label={groupLabel}>
      {/* decorative render; interaction lives on the HTML anchors below */}
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="block w-full h-auto select-none"
        aria-hidden="true"
        focusable="false"
      >
        {/* guide crosshair */}
        <line x1={C - 18} y1={C} x2={C + 18} y2={C} stroke="var(--evt-line-strong)" strokeWidth="1" opacity="0.7" className="evt-anim-ring" />
        <line x1={C} y1={C - 18} x2={C} y2={C + 18} stroke="var(--evt-line-strong)" strokeWidth="1" opacity="0.7" className="evt-anim-ring" />

        {/* dimmable chrome: rings, ticks, wedges (dim carried by wrapper groups) */}
        <g style={fadeStyle(dim, 0.45)}>
          {RINGS.map((ring, i) => (
            <circle
              key={ring.r}
              cx={C}
              cy={C}
              r={ring.r}
              fill="none"
              stroke={ring.strong ? "var(--evt-line-strong)" : "var(--evt-line)"}
              strokeWidth={ring.strong ? 1.4 : 1.15}
              strokeDasharray={ring.dash}
              className="evt-anim-ring"
              style={{ animationDelay: `${i * 0.12}s` }}
            />
          ))}
        </g>

        <g style={fadeStyle(dim, 0.3)}>
          {TICKS.map((deg) => {
            const cardinal = deg % 90 === 0;
            const p0 = pol(deg, 300);
            const p1 = pol(deg, cardinal ? 312 : 306);
            return (
              <line
                key={deg}
                x1={p0.x}
                y1={p0.y}
                x2={p1.x}
                y2={p1.y}
                stroke="var(--evt-line-strong)"
                strokeWidth="1"
                opacity={cardinal ? 0.8 : 0.45}
                className="evt-anim-ring"
              />
            );
          })}
        </g>

        <g style={fadeStyle(dim, 0.25)}>
          {WEDGES.map((w) => (
            <path
              key={w.angle}
              d={wedgePath(w.angle, w.half, w.r0, w.r1)}
              fill="var(--evt-energy)"
              opacity="0.13"
              className="evt-anim-ring"
            />
          ))}
        </g>

        {/* structural tracks: the wider body of work */}
        <g style={fadeStyle(dim, 0.15)}>
          {STRUCTURAL_TRACKS.map((t, i) => {
            const end = pol(t.angle, t.r);
            return (
              <g key={i} opacity="0.4">
                <path
                  d={trackPath(t)}
                  fill="none"
                  stroke="var(--evt-steel)"
                  strokeWidth="1"
                  pathLength={1}
                  className="evt-anim-track"
                  style={{ animationDelay: `${0.5 + i * 0.07}s` }}
                />
                <circle
                  cx={end.x}
                  cy={end.y}
                  r={1.6}
                  fill="var(--evt-steel)"
                  className="evt-anim-dot"
                  style={{ animationDelay: `${1.35 + i * 0.07}s` }}
                />
              </g>
            );
          })}
        </g>

        {/* project marks: highlight state follows activeId, dim via wrapper */}
        {TRACK_DEFS.map((t, i) => {
          const project = projects.find((p) => p.id === t.id);
          if (!project) return null;
          const end = pol(t.angle, t.r);
          const isActive = activeId === t.id;
          const color = t.muon ? "var(--evt-muon)" : "var(--evt-track)";
          return (
            <g key={t.id} style={fadeStyle(dim, isActive ? 1 : 0.16)}>
              <path
                d={trackPath(t)}
                fill="none"
                stroke={color}
                strokeWidth={isActive ? 3 : t.muon ? 2.25 : 1.75}
                strokeLinecap="round"
                pathLength={1}
                className="evt-anim-track"
                style={{ animationDelay: `${0.25 + i * 0.12}s` }}
              />
              <circle
                cx={end.x}
                cy={end.y}
                r={isActive ? 6.5 : t.muon ? 5 : 4}
                fill={color}
                className="evt-anim-dot"
                style={{ animationDelay: `${1.1 + i * 0.12}s` }}
              />
            </g>
          );
        })}

        {/* vertex */}
        <circle cx={C} cy={C} r={3.5} fill="var(--evt-track)" className="evt-anim-dot" style={{ animationDelay: "0.15s" }} />
      </svg>

      {/* interaction anchors: one hit target per project endpoint */}
      {TRACK_DEFS.map((t) => {
        const project = projects.find((p) => p.id === t.id);
        if (!project) return null;
        const end = pol(t.angle, t.r);
        return (
          <a
            key={t.id}
            href={project.demo ?? "#"}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title}: ${project.description}. ${openLabel}.`}
            onMouseEnter={() => activate(t.id)}
            onMouseLeave={deactivateSoon}
            onFocus={() => activate(t.id)}
            onBlur={deactivateSoon}
            onClick={(e) => {
              // first activation isolates (touch has no hover); second follows through
              if (activeId !== t.id) {
                e.preventDefault();
                setActiveId(t.id);
              }
            }}
            className="absolute z-10 block w-9 h-9 -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer focus:outline-none focus-visible:outline-2 focus-visible:outline-[var(--evt-track)]"
            style={{ left: `${(end.x / SIZE) * 100}%`, top: `${(end.y / SIZE) * 100}%` }}
          >
            <span className="sr-only">{project.title}</span>
          </a>
        );
      })}

      {/* isolation data card */}
      {activeProject && activeDef && (
        <div
          dir="ltr"
          className="evt-card absolute z-20 w-[min(248px,72%)] instr-panel p-4 shadow-[0_18px_50px_-24px_rgba(4,10,18,0.55)]"
          onMouseEnter={() => activate(activeDef.id)}
          onMouseLeave={deactivateSoon}
          style={{
            left: `${Math.min(62, Math.max(38, (pol(activeDef.angle, activeDef.r).x / SIZE) * 100))}%`,
            top: `${Math.min(80, Math.max(18, (pol(activeDef.angle, activeDef.r).y / SIZE) * 100))}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="instr-label text-evt-track mb-1">{activeDef.muon ? "FLAGSHIP / MUON" : "TRACK"}</div>
          <div className="font-instr-mono text-sm font-semibold text-evt-ink leading-snug">{activeProject.title}</div>
          <p className="mt-1.5 text-[13px] leading-relaxed text-evt-steel">{activeProject.description}</p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {activeProject.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="instr-label border border-evt-line px-1.5 py-0.5 text-evt-steel">
                {tag}
              </span>
            ))}
          </div>
          <a
            href={activeProject.demo ?? "#"}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 instr-label text-evt-track hover:underline underline-offset-4"
          >
            {openLabel} <ArrowGlyph />
          </a>
        </div>
      )}
    </div>
  );
}
