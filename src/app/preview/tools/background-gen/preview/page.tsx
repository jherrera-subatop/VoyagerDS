"use client";

import { useEffect, useRef, Suspense, type JSX } from "react";
import { useSearchParams } from "next/navigation";
import { drawAll } from "../draw";

/* ── Noise / Curl ── */
function fract(x: number): number { return x - Math.floor(x); }
function hash2(x: number, y: number): number {
  return fract(Math.sin(x * 127.1 + y * 311.7) * 43758.5453);
}
function smoothNoise(x: number, y: number): number {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix, fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy);
  return hash2(ix, iy) + (hash2(ix+1,iy) - hash2(ix,iy)) * ux
       + (hash2(ix,iy+1) - hash2(ix,iy)) * uy
       + (hash2(ix,iy) - hash2(ix+1,iy) - hash2(ix,iy+1) + hash2(ix+1,iy+1)) * ux * uy;
}
function curlXY(x: number, y: number, t: number, freq: number) {
  const eps = 0.01;
  const psi = (px: number, py: number) => smoothNoise(px * freq + t * 0.3, py * freq + t * 0.2);
  return {
    vx:   (psi(x, y + eps) - psi(x, y - eps)) / (2 * eps),
    vy: - (psi(x + eps, y) - psi(x - eps, y)) / (2 * eps),
  };
}

type Geo = "vmcarrows"|"arrowpulse"|"arrowsignal"|"arroworbit"|"arrowbreathe"|"meshgradient"|"lightsweep"|"halftone"|"glassgrid"|"ribbons"|"aurora"|"vortex"|"starfield"|"plasma"|"constellation"|"hexgrid";
interface Params {
  geometry: Geo; speed: number; density: number;
  curlFrequency: number; displacementAmount: number;
  patternOpacity: number; accentOpacity: number; strokeWeight: number;
  scaleX: number; scaleY: number; twistAmount: number;
  lightZ: number; ambientLight: number; lightIntensity: number;
  glowAmount: number;
}

const PAT    = (a: number) => `oklch(0.82 0.06 285 / ${a})`;
const ORANGE = (a: number) => `oklch(0.72 0.16 55 / ${a})`;

function drawPattern(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: Params): void {
  const freq = p.curlFrequency;
  const disp = p.displacementAmount;
  const op   = p.patternOpacity;
  ctx.lineCap = "round"; ctx.lineJoin = "round";

  if (p.geometry === "ribbons") {
    const rows = Math.max(3, Math.round(p.density));
    const cols = 60;
    const cx = W * 0.5, cy = H * 0.5;
    type V = { x: number; y: number; z: number };
    const verts: V[][] = [];
    for (let row = 0; row <= rows; row++) {
      const arr: V[] = [];
      for (let col = 0; col <= cols; col++) {
        const nu = col / cols, nt = row / rows;
        const bx = (nu - 0.5) * W * p.scaleX, by = (nt - 0.5) * H * p.scaleY;
        const { vx, vy } = curlXY(bx * 0.01, by * 0.01, t, freq * 100);
        const z = (vx * 0.7 + vy * 0.3) * disp;
        const ta = Math.sin(by * 0.006) * p.twistAmount * 0.3;
        const ct = Math.cos(ta), st = Math.sin(ta);
        arr.push({ x: cx + bx * ct - (by + z) * st, y: cy + bx * st + (by + z) * ct, z });
      }
      verts.push(arr);
    }
    for (let row = 0; row < rows; row++) {
      const top = verts[row], bot = verts[row + 1];
      const isAccent = row % Math.max(3, Math.round(p.density / 2)) === 0;
      ctx.beginPath();
      ctx.moveTo(top[0].x, top[0].y);
      for (let c = 1; c <= cols; c++) { ctx.lineTo(top[c].x, top[c].y); }
      for (let c = cols; c >= 0; c--) { ctx.lineTo(bot[c].x, bot[c].y); }
      ctx.closePath();
      ctx.fillStyle = isAccent ? ORANGE(p.accentOpacity) : PAT(op);
      ctx.fill();
    }
  }
  if (p.geometry === "chevrons") {
    const cols = Math.max(3, Math.round(p.density));
    const rows = Math.round(cols * (H / W) * 0.8);
    const cW = W / cols, cH = H / rows;
    const size = cW * 0.35;
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        const x = (col + 0.5) * cW, y = (row + 0.5) * cH;
        const { vx, vy } = curlXY(x * 0.005, y * 0.005, t, freq * 80);
        const angle = vx * p.twistAmount * 0.4;
        const isAccent = hash2(col * 1.3, row * 2.7) > 0.90;
        const alpha = op * (0.5 + (row / rows) * 0.5) * (0.5 + Math.abs(vy) * 0.8);
        ctx.save(); ctx.translate(x, y); ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(-size * 0.4, -size * 0.5);
        ctx.lineTo( size * 0.4,  0);
        ctx.lineTo(-size * 0.4,  size * 0.5);
        ctx.strokeStyle = isAccent ? ORANGE(p.accentOpacity) : PAT(alpha);
        ctx.lineWidth = p.strokeWeight * 0.8; ctx.stroke(); ctx.restore();
      }
    }
  }
  if (p.geometry === "flowlines") {
    const numLines = Math.max(3, Math.round(p.density));
    for (let l = 0; l < numLines; l++) {
      const baseY = (H / (numLines + 1)) * (l + 1);
      const lPhase = (l / numLines) * Math.PI * 2;
      const isAccent = l % Math.max(3, Math.round(numLines / 3)) === 0;
      ctx.beginPath();
      for (let i = 0; i <= 100; i++) {
        const x = (i / 100) * W;
        const { vx } = curlXY(x * 0.008, baseY * 0.008, t, freq * 120);
        const y = baseY + vx * disp * 0.8 + Math.sin(x * 0.005 * p.scaleX + t + lPhase) * disp * 0.4;
        if (i === 0) { ctx.moveTo(x, y); } else { ctx.lineTo(x, y); }
      }
      ctx.strokeStyle = isAccent ? ORANGE(p.accentOpacity) : PAT(op);
      ctx.lineWidth = isAccent ? p.strokeWeight * 1.5 : p.strokeWeight; ctx.stroke();
    }
  }
  if (p.geometry === "hexgrid") {
    const cols = Math.max(2, Math.round(p.density * 0.6));
    const size = W / cols / 1.8;
    const dx = size * Math.sqrt(3), dy = size * 1.5;
    for (let row = -1; row < Math.ceil(H / dy) + 1; row++) {
      for (let col = -1; col < Math.ceil(W / dx) + 1; col++) {
        const offset = row % 2 === 0 ? 0 : dx * 0.5;
        const cx = col * dx + offset, cy2 = row * dy;
        const { vx, vy } = curlXY(cx * 0.004, cy2 * 0.004, t, freq * 60);
        const isAccent = hash2(col * 1.7, row * 3.1) > 0.92;
        ctx.beginPath();
        for (let k = 0; k < 6; k++) {
          const ang = (Math.PI / 3) * k - Math.PI / 6;
          const px = cx + size * Math.cos(ang), py = cy2 + size * Math.sin(ang);
          if (k === 0) { ctx.moveTo(px, py); } else { ctx.lineTo(px, py); }
        }
        ctx.closePath();
        ctx.strokeStyle = isAccent ? ORANGE(p.accentOpacity) : PAT(op * (0.6 + Math.abs(vx * 0.5 + vy * 0.5) * 0.8));
        ctx.lineWidth = p.strokeWeight * 0.7; ctx.stroke();
      }
    }
  }
  if (p.geometry === "dots") {
    const cols = Math.max(4, Math.round(p.density * 1.2));
    const rows = Math.round(cols * (H / W));
    const cW = W / cols, cH = H / rows;
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        const bx = (col + 0.5) * cW, by = (row + 0.5) * cH;
        const { vx, vy } = curlXY(bx * 0.006, by * 0.006, t, freq * 100);
        const x = bx + vx * disp * 0.6, y = by + vy * disp * 0.6;
        const r = p.strokeWeight * (0.8 + Math.abs(vx) * 0.8);
        const isAccent = hash2(col * 2.3, row * 1.9) > 0.92;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = isAccent ? ORANGE(p.accentOpacity) : PAT(op * (0.4 + Math.abs(vy)));
        ctx.fill();
      }
    }
  }
}

/* ── Canvas fixed full-viewport — recibe params vía BroadcastChannel ── */
function BgCanvas({ initialParams }: { initialParams: Params }): JSX.Element {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const rafRef     = useRef<number>(0);
  const timeRef    = useRef<number>(0);
  const paramsRef  = useRef<Params>(initialParams);

  useEffect(function mount() {
    const canvas = canvasRef.current;
    if (!canvas) { return; }

    /* Escuchar + pedir estado actual al generator */
    const ch = new BroadcastChannel("vmc-bg-preview");
    ch.onmessage = function onMsg(e: MessageEvent<Params>) {
      paramsRef.current = e.data;
    };
    /* Solicitar broadcast inmediato del generator al abrir */
    const reqCh = new BroadcastChannel("vmc-bg-request");
    reqCh.postMessage("request");
    reqCh.close();

    function scale(): void {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width  = window.innerWidth  * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width  = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
      canvas!.getContext("2d")!.scale(dpr, dpr);
    }
    scale();
    window.addEventListener("resize", scale);

    function render(): void {
      const c = canvasRef.current;
      if (!c) { return; }
      const ctx = c.getContext("2d")!;
      const dpr = window.devicePixelRatio || 1;
      const W = c.width / dpr, H = c.height / dpr;
      const p = paramsRef.current;          /* siempre lee el último */
      timeRef.current += p.speed * 0.006;
      drawAll(ctx, W, H, timeRef.current, p as Parameters<typeof drawAll>[4]);
      rafRef.current = requestAnimationFrame(render);
    }
    render();
    return function cleanup() {
      window.removeEventListener("resize", scale);
      cancelAnimationFrame(rafRef.current);
      ch.close();
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", inset: 0,
      width: "100vw", height: "100vh",
      display: "block", zIndex: 0,
      pointerEvents: "none",
    }} />
  );
}

/* ── Preview — 1024px shell encima del canvas, sin tocar el interior ── */
function PreviewInner({ params }: { params: Params }): JSX.Element {
  const F = "'Plus Jakarta Sans', sans-serif";

  return (
    <div style={{ minHeight: "100vh", background: "transparent", fontFamily: F }}>

      {/* Canvas full-viewport DEBAJO de todo — live via BroadcastChannel */}
      <BgCanvas initialParams={params} />

      {/* Shell 1024px — igual al HTML, z-index: 1 */}
      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: 1024, margin: "0 auto",
        minHeight: "100vh", display: "flex",
      }}>

        {/* Sidebar — vault opaco, bloquea el canvas */}
        <aside style={{
          width: 226, flexShrink: 0,
          background: "#2E0F70",
          borderRight: "1px solid rgba(255,255,255,.07)",
          display: "flex", flexDirection: "column",
          position: "sticky", top: 0, height: "100vh", overflowY: "auto",
        }}>
          {/* Logo */}
          <div style={{
            height: 63, display: "flex", alignItems: "center",
            padding: "0 12px", gap: 10,
            borderBottom: "1px solid rgba(255,255,255,.08)", flexShrink: 0,
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 5,
                          width: 32, height: 32, justifyContent: "center", alignItems: "center" }}>
              {[1,2,3].map(function bar(i) {
                return <span key={i} style={{ width: 16, height: 2,
                                              background: "rgba(255,255,255,.85)", borderRadius: 2 }} />;
              })}
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>
              VMC<span style={{ color: "#F4AC59" }}>SUBASTAS</span>
            </div>
          </div>
          {/* Nav */}
          {["Hoy", "Tipo de oferta", "Categorías", "Empresas", "Centro de ayuda"].map(
            function navItem(label, i) {
              return (
                <div key={label} style={{
                  minHeight: 64, display: "flex", alignItems: "center",
                  padding: "0 16px 0 20px",
                  color: i === 0 ? "#fff" : "rgba(255,255,255,.65)",
                  fontSize: 15,
                  borderLeft: i === 0 ? "4px solid #ED8936" : "4px solid transparent",
                  background: i === 0 ? "rgba(255,255,255,.1)" : "transparent",
                }}>{label}</div>
              );
            }
          )}
        </aside>

        {/* Main col — blanco opaco */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column",
                      background: "#fff" }}>

          {/* Topbar — vault opaco */}
          <header style={{
            height: 63, background: "#2E0F70",
            display: "flex", alignItems: "center", justifyContent: "flex-end",
            padding: "0 11px", flexShrink: 0,
          }}>
            <button style={{
              display: "inline-flex", alignItems: "center", height: 38,
              borderRadius: 9999,
              background: "linear-gradient(123deg,#F4AC59,#ED8936,#D07128)",
              padding: "4px 16px 4px 4px", gap: 8, border: "none", cursor: "pointer",
            }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%",
                            background: "rgba(34,0,92,.12)",
                            display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="5.5" r="3" fill="white"/>
                  <path d="M1.5 14.5C1.5 11.5 4.5 9.5 8 9.5S14.5 11.5 14.5 14.5"
                    stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: F }}>Ingresa</span>
            </button>
          </header>

          {/* Content */}
          <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>

            {/* Hero — vault opaco */}
            <div style={{
              width: "100%", height: 272, borderRadius: 16, overflow: "hidden",
              position: "relative", background: "#2E0F70", flexShrink: 0,
            }}>
              <div style={{
                position: "absolute", top: 20, left: 28, background: "#22005C",
                borderRadius: 9999, height: 24, padding: "0 12px 0 24px",
                display: "flex", alignItems: "center", fontSize: 11, fontWeight: 700, color: "#fff",
              }}>
                <div style={{ position: "absolute", left: 10, width: 6, height: 6,
                              borderRadius: "50%", background: "#F04040" }} />
                EN VIVO
              </div>
              <h2 style={{ position: "absolute", top: 58, left: 28,
                           fontSize: 24, fontWeight: 700, color: "#fff", margin: 0 }}>Pacífico</h2>
              <div style={{ position: "absolute", top: 96, left: 28,
                            fontSize: 12, color: "rgba(255,255,255,.85)" }}>
                4.3 &nbsp;Muy bueno · 1,624 opiniones
              </div>
              <div style={{ position: "absolute", top: 122, left: 28, fontSize: 14, fontWeight: 600, color: "#fff" }}>BMW X1</div>
              <div style={{ position: "absolute", top: 144, left: 28,
                            fontFamily: "'Roboto Mono',monospace", fontSize: 26, fontWeight: 700, color: "#fff" }}>
                US$ 14,999
              </div>
              <button style={{
                position: "absolute", top: 204, left: 28, height: 40, borderRadius: 9999,
                background: "#00CACE", border: "none", padding: "0 20px",
                fontSize: 13, fontWeight: 700, color: "#2E0F70", fontFamily: F, cursor: "pointer",
              }}>Ver más →</button>
            </div>

            {/* Subaspass */}
            <div style={{
              borderRadius: 8, height: 100,
              background: "linear-gradient(123deg,#F4AC59,#ED8936,#D07128)",
              display: "flex", alignItems: "center", padding: "0 16px", gap: 16,
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,.92)" }}>Dile bye a tu riesgo alto!</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "-.56px" }}>Compra Subaspass</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.85)" }}>Y participa sin consignar, sin restricciones.</div>
              </div>
              <button style={{
                height: 36, borderRadius: 9999, padding: "0 18px",
                border: "1px solid rgba(255,255,255,.35)", background: "rgba(255,255,255,.2)",
                fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: F,
              }}>Comprar ahora →</button>
            </div>

            {/* Cards */}
            <div style={{ background: "#F2F4F3", borderRadius: 8, padding: 16 }}>
              <div style={{ display: "flex", gap: 12 }}>
                {[1,2,3,4].map(function card(i) {
                  return (
                    <div key={i} style={{
                      flex: 1, background: "#fff", borderRadius: 8,
                      boxShadow: "0 0 16px rgba(0,0,0,.14)", overflow: "hidden",
                    }}>
                      <div style={{ width: "100%", aspectRatio: "3/2", background: "#E0E3E5" }} />
                      <div style={{ padding: "10px 8px" }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "#3B1782" }}>Audi Q3</div>
                        <div style={{ fontSize: 12, color: "#3B1782", marginTop: 2 }}>2026</div>
                        <div style={{ fontFamily: "'Roboto Mono',monospace", fontSize: 11,
                                      fontWeight: 700, color: "#008688", marginTop: 6 }}>US$ 9,999</div>
                      </div>
                      <div style={{ height: 8, background: i % 2 === 0
                        ? "linear-gradient(123deg,#F4AC59,#ED8936)" : "linear-gradient(to bottom,#00DAE0,#00A8AB)" }} />
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Footer — vault opaco */}
          <footer style={{ background: "#2E0F70", padding: "32px 32px 0" }}>
            <div style={{ display: "flex", gap: 40, paddingBottom: 24 }}>
              <div style={{ maxWidth: 180 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", marginBottom: 8 }}>
                  VMC<span style={{ color: "#F4AC59" }}>SUBASTAS</span>
                </div>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,.6)", lineHeight: "20px", margin: 0 }}>
                  Ecosistema digital de subastas de autos basado en comunidad y tecnología.
                </p>
              </div>
              {["Plataforma", "Legal & Compliance", "Contacto"].map(function col(c) {
                return (
                  <div key={c} style={{ flex: 1 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: "#fff",
                                 marginBottom: 12, marginTop: 0 }}>{c}</h4>
                    {["SubasCars", "SubasBlog", "¿Quiénes somos?"].map(function link(l) {
                      return <div key={l} style={{ fontSize: 12, color: "rgba(255,255,255,.6)", marginBottom: 8 }}>{l}</div>;
                    })}
                  </div>
                );
              })}
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,.6)", padding: "16px 0",
                          textAlign: "center", fontSize: 12, color: "rgba(255,255,255,.6)", fontWeight: 700 }}>
              © VMC Subastas es una marca registrada de Subastop S.A.C. · Todos los derechos reservados 2026
            </div>
          </footer>
        </div>
      </div>

      {/* Badge */}
      <div style={{
        position: "fixed", top: 12, right: 12, zIndex: 100,
        background: "rgba(34,0,92,0.85)", backdropFilter: "blur(12px)",
        borderRadius: 8, padding: "6px 12px",
        border: "1px solid rgba(237,137,54,0.35)",
        fontFamily: F, fontSize: 9, fontWeight: 700,
        textTransform: "uppercase", letterSpacing: "0.08em",
        color: "#ED8936",
      }}>
        BG Preview · {params.geometry} · op {params.patternOpacity.toFixed(2)}
      </div>
    </div>
  );
}

/* Defaults para cuando no hay URL params — BroadcastChannel actualiza live */
const PREVIEW_DEFAULTS: Params = {
  geometry: "arrowpulse", speed: 0.25, density: 8,
  curlFrequency: 0.004, displacementAmount: 80,
  patternOpacity: 0.10, accentOpacity: 0.04,
  strokeWeight: 1.2, scaleX: 7, scaleY: 5,
  twistAmount: 2.5, lightZ: 700,
  ambientLight: 0.30, lightIntensity: 0.70,
  glowAmount: 1.2,
};

function PreviewLoader(): JSX.Element {
  const searchParams = useSearchParams();
  let params: Params = PREVIEW_DEFAULTS;
  try {
    const raw = searchParams.get("p");
    if (raw) { params = JSON.parse(atob(decodeURIComponent(raw))) as Params; }
  } catch { params = PREVIEW_DEFAULTS; }
  return <PreviewInner params={params} />;
}

export default function PreviewPage(): JSX.Element {
  return (
    <Suspense fallback={
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center",
                    height: "100vh", background: "#2E0F70", color: "#fff",
                    fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14 }}>
        Cargando…
      </div>
    }>
      <PreviewLoader />
    </Suspense>
  );
}
