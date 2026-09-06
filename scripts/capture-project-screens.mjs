// Screenshots every project's live demo URL and writes them to public/screens/.
// Usage: node scripts/capture-project-screens.mjs
// Output: public/screens/<slug>.webp + public/screens/manifest.json ({ [projectId]: "/screens/<slug>.webp" })
import { spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const BROWSER =
  process.env.BROWSER_PATH ||
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const OUT_DIR = join(process.cwd(), "public", "screens");
const WIDTH = 1440;
const HEIGHT = 900;
const SETTLE_MS = 7000;

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function launch() {
  const port = 9400 + Math.floor(Math.random() * 400);
  const profile = mkdtempSync(join(tmpdir(), "edge-shots-"));
  const proc = spawn(
    BROWSER,
    [
      "--headless=new", "--disable-gpu", "--hide-scrollbars", "--mute-audio",
      `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
      `--window-size=${WIDTH},${HEIGHT}`, "about:blank",
    ],
    { stdio: "ignore" },
  );
  let targets;
  for (let i = 0; i < 60; i++) {
    try {
      targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
      if (targets.length) break;
    } catch {}
    await sleep(250);
  }
  const page = targets.find((t) => t.type === "page");
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0;
  const pending = new Map();
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  };
  const send = (method, params = {}) =>
    new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: WIDTH, height: HEIGHT, deviceScaleFactor: 1, mobile: false });
  const close = () => {
    ws.close();
    proc.kill();
    setTimeout(() => { try { rmSync(profile, { recursive: true, force: true }); } catch {} }, 1500);
  };
  return { send, close };
}

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });
  const projects = await prisma.project.findMany({ select: { id: true, title: true, demo: true }, orderBy: { id: "asc" } });
  await prisma.$disconnect();

  mkdirSync(OUT_DIR, { recursive: true });
  const browser = await launch();
  const manifest = {};

  try {
    for (const p of projects) {
      if (!p.demo) { console.log(`skip  ${p.title} (no demo url)`); continue; }
      const file = `${slugify(p.title)}.webp`;
      process.stdout.write(`shoot ${p.title} -> ${p.demo} ... `);
      try {
        const nav = await browser.send("Page.navigate", { url: p.demo });
        if (nav.result?.errorText) throw new Error(nav.result.errorText);
        await sleep(SETTLE_MS);
        const state = await browser.send("Runtime.evaluate", {
          returnByValue: true,
          expression: `(() => {
            if (location.protocol === 'chrome-error:' || document.title === '' && !document.body?.children.length) return 'error';
            // Accept consent dialogs, then strip any leftover cookie/consent layers and return to the top.
            const btn = [...document.querySelectorAll('button, a[role="button"]')]
              .find(b => /^(accept( all)?|agree|got it|ok(ay)?|allow( all)?)$/i.test(b.textContent.trim()));
            btn?.click();
            document.querySelectorAll('[class*="cookie" i],[id*="cookie" i],[class*="consent" i],[id*="consent" i]').forEach(e => e.remove());
            window.scrollTo(0, 0);
            return location.href;
          })()`,
        });
        if (state.result?.result?.value === "error") throw new Error("page did not load");
        await sleep(800);
        const shot = await browser.send("Page.captureScreenshot", { format: "webp", quality: 84 });
        if (!shot.result?.data) throw new Error(shot.error?.message || "no data");
        writeFileSync(join(OUT_DIR, file), Buffer.from(shot.result.data, "base64"));
        manifest[p.id] = `/screens/${file}`;
        console.log("ok");
      } catch (err) {
        console.log(`FAILED (${err.message})`);
      }
    }
  } finally {
    writeFileSync(join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
    console.log(`\nwrote ${Object.keys(manifest).length}/${projects.length} screenshots to public/screens/`);
    browser.close();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
