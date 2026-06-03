// @ts-nocheck
"use client";

import { useState, useEffect, useRef, type JSX, type ChangeEvent } from "react";
import { useBgStore, DEFAULTS, type BgParams, type GeometryType, type SavedPreset } from "./store";
import { drawAll } from "./draw";

const F  = "var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif)";
const VAULT = "#2E0F70";

/* ── DS color values (Canvas no soporta CSS vars) ── */
const C = {
  orange500: "oklch(0.72 0.16 55)",
  orange600: "oklch(0.65 0.18 55)",
  vault500:  "oklch(0.45 0.22 285)",
  vault700:  "oklch(0.30 0.20 285)",
  cyan500:   "oklch(0.78 0.14 195)",
  lavender:  "oklch(0.84 0.09 300)",
  white:     "oklch(1 0 0)",
};

/* ── Noise helpers ── */
function fract(x: number): number { return x - Math.floor(x); }
function hash2(x: number, y: number): number {
  return fract(Math.sin(x * 127.1 + y * 311.7) * 43758.5453);
}
function smoothNoise(x: number, y: number): number {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix, fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy);
  return hash2(ix,iy) + (hash2(ix+1,iy)-hash2(ix,iy))*ux
       + (hash2(ix,iy+1)-hash2(ix,iy))*uy
       + (hash2(ix,iy)-hash2(ix+1,iy)-hash2(ix,iy+1)+hash2(ix+1,iy+1))*ux*uy;
}
function fbm(x: number, y: number, oct: number): number {
  let v = 0, a = 0.5, f = 1;
  for (let o = 0; o < oct; o++) { v += a * smoothNoise(x*f, y*f); a *= 0.5; f *= 2; }
  return v;
}
function curlXY(x: number, y: number, t: number, freq: number) {
  const eps = 0.01;
  const psi = (px: number, py: number) => fbm(px*freq + t*0.3, py*freq + t*0.2, 2);
  return { vx: (psi(x, y+eps) - psi(x, y-eps))/(2*eps), vy: -(psi(x+eps, y) - psi(x-eps, y))/(2*eps) };
}

/* ── Glow ── */
function glow(ctx: CanvasRenderingContext2D, color: string, blur: number): void {
  ctx.shadowColor = color; ctx.shadowBlur = blur;
}
function noGlow(ctx: CanvasRenderingContext2D): void {
  ctx.shadowColor = "transparent"; ctx.shadowBlur = 0;
}

/* ══════════════════════════════════════════════════════════════
   GEOMETRÍAS
══════════════════════════════════════════════════════════════ */

/* 1 — RIBBONS: bandas con stroke naranja brillante */
function drawRibbons(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: BgParams): void {
  const rows = Math.max(3, Math.round(p.density));
  const cols = 80;
  const cx = W/2, cy = H/2;
  type V = {x:number;y:number;z:number};
  const verts: V[][] = [];
  for (let row = 0; row <= rows; row++) {
    const arr: V[] = [];
    for (let col = 0; col <= cols; col++) {
      const nu = col/cols, nt = row/rows;
      const bx = (nu-.5)*W*p.scaleX, by = (nt-.5)*H*p.scaleY;
      const {vx,vy} = curlXY(bx*.01, by*.01, t, p.curlFrequency*100);
      const z = (vx*.7+vy*.3)*p.displacementAmount;
      const ta = Math.sin(by*.006)*p.twistAmount*.3;
      const ct = Math.cos(ta), st = Math.sin(ta);
      arr.push({ x: cx+bx*ct-(by+z)*st, y: cy+bx*st+(by+z)*ct, z });
    }
    verts.push(arr);
  }
  for (let row = 0; row < rows; row++) {
    const top = verts[row], bot = verts[row+1];
    const isAccent = row % 3 === 0;
    /* Stroke superior del ribbon — naranja o lavanda */
    ctx.beginPath();
    ctx.moveTo(top[0].x, top[0].y);
    for (let c = 1; c <= cols; c++) { ctx.lineTo(top[c].x, top[c].y); }
    if (isAccent) {
      ctx.strokeStyle = `oklch(0.72 0.16 55 / ${p.patternOpacity * 3 + 0.05})`;
      glow(ctx, C.orange500, 20 * p.glowAmount);
      ctx.lineWidth = p.strokeWeight * 2;
    } else {
      ctx.strokeStyle = `oklch(0.72 0.10 285 / ${p.patternOpacity * 2})`;
      noGlow(ctx);
      ctx.lineWidth = p.strokeWeight;
    }
    ctx.stroke();
    noGlow(ctx);
    /* Fill sutil entre filas */
    ctx.beginPath();
    ctx.moveTo(top[0].x, top[0].y);
    for (let c = 1; c <= cols; c++) { ctx.lineTo(top[c].x, top[c].y); }
    for (let c = cols; c >= 0; c--) { ctx.lineTo(bot[c].x, bot[c].y); }
    ctx.closePath();
    ctx.fillStyle = isAccent
      ? `oklch(0.65 0.18 55 / ${p.accentOpacity + 0.02})`
      : `oklch(0.42 0.20 285 / ${p.patternOpacity * 0.8})`;
    ctx.fill();
  }
}

/* 2 — AURORA: bandas verticales sinusoidales con gradiente naranja→cyan */
function drawAurora(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: BgParams): void {
  const bands = Math.max(3, Math.round(p.density));
  const steps = 120;
  for (let b = 0; b < bands; b++) {
    const baseX = (b / bands) * W + (Math.sin(t * 0.4 + b) * W * 0.08);
    const width  = (W / bands) * (0.4 + p.strokeWeight * 0.3);
    const points: {x:number;y:number}[] = [];
    for (let i = 0; i <= steps; i++) {
      const y = (i / steps) * H;
      const wave = Math.sin(y * p.curlFrequency * 200 + t + b * 1.2) * p.displacementAmount * 0.6
                 + fbm(baseX * 0.003, y * 0.004, 2) * p.displacementAmount * 0.4;
      points.push({ x: baseX + wave, y });
    }
    /* Fill aurora con gradiente vertical naranja→cyan→vault */
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0,    `oklch(0.72 0.16 55 / ${p.patternOpacity * 1.5})`);
    grad.addColorStop(0.35, `oklch(0.78 0.14 195 / ${p.patternOpacity * 2})`);
    grad.addColorStop(0.7,  `oklch(0.45 0.22 285 / ${p.patternOpacity * 1.5})`);
    grad.addColorStop(1,    `oklch(0.30 0.20 285 / ${p.patternOpacity})`);
    ctx.beginPath();
    points.forEach(function drawPoint(pt, i) {
      if (i === 0) { ctx.moveTo(pt.x - width/2, pt.y); }
      else         { ctx.lineTo(pt.x - width/2, pt.y); }
    });
    for (let i = steps; i >= 0; i--) {
      ctx.lineTo(points[i].x + width/2, points[i].y);
    }
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
    /* Borde brillante */
    ctx.beginPath();
    points.forEach(function drawEdge(pt, i) {
      if (i === 0) { ctx.moveTo(pt.x, pt.y); }
      else         { ctx.lineTo(pt.x, pt.y); }
    });
    ctx.strokeStyle = b % 3 === 0
      ? `oklch(0.72 0.16 55 / ${p.accentOpacity + 0.06})`
      : `oklch(0.78 0.14 195 / ${p.patternOpacity * 2})`;
    ctx.lineWidth = p.strokeWeight * 1.2;
    if (b % 3 === 0) { glow(ctx, C.orange500, 18 * p.glowAmount); }
    ctx.stroke();
    noGlow(ctx);
  }
}

/* 3 — VORTEX: espirales desde el centro */
function drawVortex(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: BgParams): void {
  const arms  = Math.max(2, Math.round(p.density * 0.5));
  const steps = 200;
  const cx = W/2, cy = H/2;
  const maxR = Math.min(W, H) * 0.6;
  for (let arm = 0; arm < arms; arm++) {
    const armOffset = (arm / arms) * Math.PI * 2;
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const frac = i / steps;
      const r = frac * maxR * p.scaleX * 0.15;
      const angle = frac * Math.PI * 6 * p.curlFrequency * 300
                  + armOffset + t * p.speed;
      /* Deformación curl */
      const noise = fbm(r * 0.004 + t * 0.1, angle * 0.3, 2) * p.displacementAmount * 0.3;
      const rx = r + noise;
      const x = cx + rx * Math.cos(angle);
      const y = cy + (rx * Math.sin(angle) * p.scaleY / p.scaleX);
      if (i === 0) { ctx.moveTo(x, y); }
      else         { ctx.lineTo(x, y); }
    }
    const isAccent = arm % 2 === 0;
    ctx.strokeStyle = isAccent
      ? `oklch(0.72 0.16 55 / ${p.patternOpacity * 3 + 0.08})`
      : `oklch(0.78 0.14 195 / ${p.patternOpacity * 2})`;
    ctx.lineWidth = (p.strokeWeight * 1.5) * (1 - 0.3 * (arm / arms));
    if (isAccent) { glow(ctx, C.orange500, 22 * p.glowAmount); }
    else          { glow(ctx, C.cyan500, 14 * p.glowAmount * 0.6); }
    ctx.stroke();
    noGlow(ctx);
  }
}

/* 4 — STARFIELD: partículas con parallax y glow */
interface Star { x: number; y: number; z: number; px: number; py: number; }
const starPool: Star[] = [];
function initStars(W: number, H: number, count: number): void {
  starPool.length = 0;
  for (let i = 0; i < count; i++) {
    starPool.push({ x: (Math.random()-.5)*W*3, y: (Math.random()-.5)*H*3,
                    z: Math.random(), px: 0, py: 0 });
  }
}
function drawStarfield(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: BgParams): void {
  const count = Math.max(20, Math.round(p.density * 12));
  if (starPool.length !== count) { initStars(W, H, count); }
  const cx = W/2, cy = H/2;
  const spd = p.speed * 0.8;
  starPool.forEach(function drawStar(s) {
    s.z -= spd * 0.002;
    if (s.z <= 0) { s.x = (Math.random()-.5)*W*3; s.y = (Math.random()-.5)*H*3; s.z = 1; }
    const sx = cx + s.x / s.z;
    const sy = cy + s.y / s.z;
    const r = Math.max(0.3, (1-s.z) * p.strokeWeight * 2.5);
    const bright = (1-s.z);
    /* Trail */
    ctx.beginPath();
    ctx.moveTo(s.px || sx, s.py || sy);
    ctx.lineTo(sx, sy);
    const isAccent = hash2(s.x * 0.01, s.y * 0.01) > 0.88;
    ctx.strokeStyle = isAccent
      ? `oklch(0.72 0.16 55 / ${bright * (p.patternOpacity * 4 + 0.05)})`
      : `oklch(0.82 0.06 285 / ${bright * p.patternOpacity * 3})`;
    ctx.lineWidth = r * 0.5;
    if (isAccent && bright > 0.6) { glow(ctx, C.orange500, 12 * p.glowAmount); }
    ctx.stroke();
    noGlow(ctx);
    /* Core dot */
    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI*2);
    ctx.fillStyle = isAccent
      ? `oklch(0.90 0.12 55 / ${bright * (p.accentOpacity + 0.1)})`
      : `oklch(1 0 0 / ${bright * p.patternOpacity * 2.5})`;
    ctx.fill();
    s.px = sx; s.py = sy;
  });
}

/* 5 — PLASMA: SDF metaballs organicos */
function drawPlasma(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: BgParams): void {
  const numBlobs = Math.max(2, Math.round(p.density * 0.4));
  const blobs: {x:number;y:number;r:number}[] = [];
  for (let i = 0; i < numBlobs; i++) {
    const ang = (i / numBlobs) * Math.PI * 2 + t * 0.3 * (i % 2 === 0 ? 1 : -1);
    const dist = Math.min(W, H) * (0.15 + 0.1 * Math.sin(t * 0.5 + i));
    blobs.push({
      x: W/2 + dist * Math.cos(ang) * p.scaleX * 0.3,
      y: H/2 + dist * Math.sin(ang) * p.scaleY * 0.3,
      r: Math.min(W, H) * (0.12 + 0.08 * Math.sin(t * 0.7 + i * 1.3)) * p.displacementAmount * 0.01 + 60,
    });
  }
  blobs.forEach(function drawBlob(b, bi) {
    const isOrange = bi % 2 === 0;
    const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 1.5);
    if (isOrange) {
      grad.addColorStop(0,   `oklch(0.72 0.16 55 / ${p.patternOpacity * 4 + 0.08})`);
      grad.addColorStop(0.5, `oklch(0.65 0.18 55 / ${p.patternOpacity * 2})`);
      grad.addColorStop(1,   "transparent");
    } else {
      grad.addColorStop(0,   `oklch(0.78 0.14 195 / ${p.patternOpacity * 3 + 0.05})`);
      grad.addColorStop(0.5, `oklch(0.45 0.22 285 / ${p.patternOpacity * 2})`);
      grad.addColorStop(1,   "transparent");
    }
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    if (isOrange) { glow(ctx, C.orange500, 30 * p.glowAmount); }
    else          { glow(ctx, C.cyan500,   20 * p.glowAmount * 0.6); }
    ctx.fill();
    noGlow(ctx);
  });
}

/* 6 — CONSTELLATION: dots + lines como mapa estelar */
interface Node { x: number; y: number; vx: number; vy: number; }
const nodePool: Node[] = [];
function initNodes(W: number, H: number, count: number): void {
  nodePool.length = 0;
  for (let i = 0; i < count; i++) {
    nodePool.push({ x: Math.random()*W, y: Math.random()*H,
                    vx: (Math.random()-.5)*0.3, vy: (Math.random()-.5)*0.3 });
  }
}
function drawConstellation(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: BgParams): void {
  const count = Math.max(6, Math.round(p.density * 1.5));
  if (nodePool.length !== count) { initNodes(W, H, count); }
  const spd = p.speed * 0.5;
  nodePool.forEach(function moveNode(n) {
    n.x += n.vx * spd; n.y += n.vy * spd;
    if (n.x < 0 || n.x > W) { n.vx *= -1; }
    if (n.y < 0 || n.y > H) { n.vy *= -1; }
  });
  const maxDist = Math.min(W, H) * 0.3 * p.scaleX * 0.15;
  /* Lines */
  for (let i = 0; i < nodePool.length; i++) {
    for (let j = i+1; j < nodePool.length; j++) {
      const dx = nodePool[i].x - nodePool[j].x;
      const dy = nodePool[i].y - nodePool[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < maxDist) {
        const alpha = (1 - dist/maxDist) * p.patternOpacity * 2;
        const isAccent = (i + j) % 5 === 0;
        ctx.beginPath();
        ctx.moveTo(nodePool[i].x, nodePool[i].y);
        ctx.lineTo(nodePool[j].x, nodePool[j].y);
        ctx.strokeStyle = isAccent
          ? `oklch(0.72 0.16 55 / ${alpha + p.accentOpacity * 0.5})`
          : `oklch(0.72 0.10 285 / ${alpha})`;
        ctx.lineWidth = p.strokeWeight * 0.6;
        if (isAccent) { glow(ctx, C.orange500, 10 * p.glowAmount); }
        ctx.stroke();
        noGlow(ctx);
      }
    }
  }
  /* Dots */
  nodePool.forEach(function drawNode(n, i) {
    const r = p.strokeWeight * 1.5;
    const isAccent = i % 4 === 0;
    ctx.beginPath();
    ctx.arc(n.x, n.y, r, 0, Math.PI*2);
    ctx.fillStyle = isAccent
      ? `oklch(0.80 0.14 55 / ${p.accentOpacity + 0.12})`
      : `oklch(0.75 0.08 285 / ${p.patternOpacity * 3})`;
    if (isAccent) { glow(ctx, C.orange500, 14 * p.glowAmount); }
    ctx.fill();
    noGlow(ctx);
  });
}

/* ══════════════════════════════════════════════════════════════
   NUEVOS EFECTOS — investigación técnica aplicada
══════════════════════════════════════════════════════════════ */

/* MESH GRADIENT — blobs radiales con globalCompositeOperation:'screen'
   Técnica Stripe: movimiento trigonométrico + mezcla aditiva de luz */
interface MeshBlob { cx: number; cy: number; ax: number; ay: number; wx: number; wy: number; px: number; py: number; radius: number; color: string; }

function drawMeshGradient(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: BgParams): void {
  const blobs: MeshBlob[] = [
    /* Vault purple — el más grande, movimiento lento */
    { cx:.45, cy:.50, ax:.30, ay:.28, wx:.31, wy:.27, px: 0,    py:.70, radius: Math.max(W,H)*.75, color:`rgba(88,28,200,${0.28 + p.patternOpacity})` },
    /* Orange — acento naranja VMC */
    { cx:.70, cy:.30, ax:.22, ay:.20, wx:.41, wy:.38, px:.60,  py:.10, radius: Math.max(W,H)*.60, color:`rgba(237,115,22,${0.20 + p.accentOpacity})` },
    /* Cyan negociable */
    { cx:.20, cy:.70, ax:.18, ay:.22, wx:.53, wy:.47, px:1.20, py:.40, radius: Math.max(W,H)*.55, color:`rgba(0,202,206,${0.18 + p.patternOpacity * 0.5})` },
    /* Pink accent */
    { cx:.80, cy:.80, ax:.14, ay:.16, wx:.67, wy:.59, px:.80,  py:2.0, radius: Math.max(W,H)*.45, color:`rgba(167,80,210,${0.15 + p.patternOpacity * 0.3})` },
  ];

  /* Fondo ultra oscuro vault */
  ctx.fillStyle = "rgba(6,3,18,1)";
  ctx.fillRect(0, 0, W, H);

  /* Screen blend = mezcla aditiva, evita zonas grises entre complementarios */
  ctx.globalCompositeOperation = "screen";

  blobs.forEach(function drawBlob(b) {
    const x = (b.cx + Math.cos(b.wx * t + b.px) * b.ax) * W;
    const y = (b.cy + Math.sin(b.wy * t + b.py) * b.ay) * H;
    const r = b.radius * (0.85 + Math.sin(t * 0.3) * 0.15) * (p.scaleX * 0.12 + 0.5);
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0,    b.color);
    g.addColorStop(0.45, b.color.replace(/[\d.]+\)$/, `${parseFloat(b.color.match(/[\d.]+\)$/)![0]) * 0.35})`));
    g.addColorStop(1,    "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  });

  ctx.globalCompositeOperation = "source-over";

  /* Light sweep suave encima */
  const sweep = (Math.sin(t * p.speed * 0.4) + 1) * 0.5;
  const sw = W * 0.6;
  const sg = ctx.createLinearGradient(sweep * W * 1.4 - sw, 0, sweep * W * 1.4 + sw, H);
  sg.addColorStop(0,    "rgba(0,0,0,0)");
  sg.addColorStop(0.35, "rgba(0,0,0,0)");
  sg.addColorStop(0.50, `rgba(255,255,255,${p.glowAmount * 0.025})`);
  sg.addColorStop(0.65, "rgba(0,0,0,0)");
  sg.addColorStop(1,    "rgba(0,0,0,0)");
  ctx.fillStyle = sg;
  ctx.fillRect(0, 0, W, H);
}

/* LIGHT SWEEP — haz diagonal con smoothstep alpha (Linear style) */
function drawLightSweep(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: BgParams): void {
  /* Fondo mesh suave primero */
  drawMeshGradient(ctx, W, H, t * 0.3, { ...p, patternOpacity: p.patternOpacity * 0.6 });

  const angle  = Math.PI / 5 + p.twistAmount * 0.05;
  const speed  = p.speed * 0.0008;
  /* progress: -0.3 → 1.3 en ciclo */
  const prog   = ((t * speed) % 1.6) - 0.3;
  const width2 = W * (0.25 + p.strokeWeight * 0.04);
  const cos = Math.cos(angle), sin2 = Math.sin(angle);
  const cx = prog * W * 1.5;
  const cy = H * 0.5;

  const g = ctx.createLinearGradient(
    cx - cos * width2, cy - sin2 * width2,
    cx + cos * width2, cy + sin2 * width2
  );
  /* Smoothstep attenuation — sin bordes duros */
  const peak = `rgba(255,255,255,${Math.min(0.12, p.glowAmount * 0.055)})`;
  g.addColorStop(0,    "rgba(0,0,0,0)");
  g.addColorStop(0.30, "rgba(0,0,0,0)");
  g.addColorStop(0.50, peak);
  g.addColorStop(0.70, "rgba(0,0,0,0)");
  g.addColorStop(1,    "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  /* Orange accent glow at sweep center */
  if (p.accentOpacity > 0.01) {
    const ag = ctx.createRadialGradient(cx, cy, 0, cx, cy, width2 * 0.8);
    ag.addColorStop(0, `rgba(237,115,22,${p.accentOpacity * 0.5})`);
    ag.addColorStop(1, "rgba(0,0,0,0)");
    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = ag;
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = "source-over";
  }
}

/* HALFTONE NEBULA — sprite cache + grain pre-renderizado (research: O(N)→drawImage) */
const halftoneCache = { sprites: [] as OffscreenCanvas[], grain: [] as OffscreenCanvas[], built: false };

function buildHalftoneCache(): void {
  if (halftoneCache.built || typeof OffscreenCanvas === "undefined") { return; }
  const steps = 16, maxR = 5.5, minR = 0.3;
  const sz = (maxR * 2) + 4;
  for (let i = 0; i <= steps; i++) {
    const oc = new OffscreenCanvas(sz, sz);
    const oc2d = oc.getContext("2d")!;
    const r = minR + Math.pow(i / steps, 1.8) * (maxR - minR);
    oc2d.fillStyle = "rgba(255,255,255,0.45)";
    oc2d.beginPath();
    oc2d.arc(sz/2, sz/2, r, 0, Math.PI * 2);
    oc2d.fill();
    halftoneCache.sprites.push(oc);
  }
  /* 4 frames de grain TPDF */
  for (let f = 0; f < 4; f++) {
    const oc = new OffscreenCanvas(128, 128);
    const oc2d = oc.getContext("2d")!;
    const img = oc2d.createImageData(128, 128);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.max(0, Math.min(255, (Math.random() - Math.random()) * 18));
      img.data[i] = img.data[i+1] = img.data[i+2] = v;
      img.data[i+3] = 12;
    }
    oc2d.putImageData(img, 0, 0);
    halftoneCache.grain.push(oc);
  }
  halftoneCache.built = true;
}

function drawHalftone(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: BgParams): void {
  buildHalftoneCache();

  ctx.fillStyle = "rgba(5,4,12,1)";
  ctx.fillRect(0, 0, W, H);

  /* Nebula radial — vault purple + orange */
  const nx = W/2 + Math.cos(t * 0.4) * W * 0.12;
  const ny = H/2 + Math.sin(t * 0.3) * H * 0.10;
  const nr = Math.min(W,H) * (0.4 + p.displacementAmount * 0.001);

  ctx.globalCompositeOperation = "screen";
  const ng = ctx.createRadialGradient(nx, ny, 0, nx, ny, nr * 1.6);
  ng.addColorStop(0,   `rgba(100,40,200,${0.45 + p.patternOpacity})`);
  ng.addColorStop(0.4, `rgba(80,30,180,${0.18})`);
  ng.addColorStop(1,   "rgba(0,0,0,0)");
  ctx.fillStyle = ng; ctx.fillRect(0, 0, W, H);

  if (p.accentOpacity > 0.01) {
    const og = ctx.createRadialGradient(nx + W*0.15, ny - H*0.1, 0, nx + W*0.15, ny - H*0.1, nr);
    og.addColorStop(0,   `rgba(237,115,22,${p.accentOpacity + 0.1})`);
    og.addColorStop(0.5, `rgba(237,115,22,0.04)`);
    og.addColorStop(1,   "rgba(0,0,0,0)");
    ctx.fillStyle = og; ctx.fillRect(0, 0, W, H);
  }
  ctx.globalCompositeOperation = "source-over";

  /* Halftone grid — sprite cache (drawImage, no beginPath) */
  if (halftoneCache.built) {
    const grid = Math.max(12, Math.round(22 - p.density * 0.4));
    const half = halftoneCache.sprites.length - 1;
    const halfSz = 7;
    for (let x = grid/2; x < W; x += grid) {
      for (let y = grid/2; y < H; y += grid) {
        const dx = x - nx, dy = y - ny;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const intensity = Math.max(0, 1 - dist/nr);
        const idx = Math.round(intensity * half);
        ctx.drawImage(halftoneCache.sprites[idx], x - halfSz, y - halfSz);
      }
    }
    /* Grain TPDF cíclico */
    const gf = Math.floor(t * 10) % 4;
    const gp = ctx.createPattern(halftoneCache.grain[gf], "repeat");
    if (gp) { ctx.fillStyle = gp; ctx.fillRect(0, 0, W, H); }
  }
}

/* GLASS GRID — mesh canvas + cuadros glassmorphic (CSS hybrid) */
function drawGlassGrid(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: BgParams): void {
  /* Mismo mesh gradient como base */
  drawMeshGradient(ctx, W, H, t, p);
  /* Los cuadros glass se renderizan via DOM/CSS en el canvas wrapper */
}

/* 7 — HEX GRID scrolling */
function drawHexGrid(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: BgParams): void {
  const cols = Math.max(2, Math.round(p.density * 0.6));
  const size = W / cols / 1.8;
  const dx = size * Math.sqrt(3), dy = size * 1.5;
  const scrollY = (t * p.speed * 22) % dy;
  const waveX   = Math.sin(t * 0.5) * size * 0.6;
  for (let row = -2; row < Math.ceil(H/dy)+2; row++) {
    for (let col = -1; col < Math.ceil(W/dx)+1; col++) {
      const offset = row % 2 === 0 ? 0 : dx * 0.5;
      const cx = col * dx + offset + waveX;
      const cy = row * dy - scrollY;
      const animSize = size * (0.85 + Math.sin(t*1.1 + col*0.9 + row*0.6) * 0.15);
      const isAccent = hash2(col*1.7, row*3.1) > 0.92;
      const pulse = 0.5 + Math.abs(Math.sin(t*0.8 + col*0.5 + row*0.4)) * 0.8;
      ctx.beginPath();
      for (let k = 0; k < 6; k++) {
        const ang = (Math.PI/3)*k - Math.PI/6;
        const px = cx + animSize*Math.cos(ang), py = cy + animSize*Math.sin(ang);
        if (k === 0) { ctx.moveTo(px, py); } else { ctx.lineTo(px, py); }
      }
      ctx.closePath();
      ctx.strokeStyle = isAccent
        ? `oklch(0.72 0.16 55 / ${p.accentOpacity + 0.08})`
        : `oklch(0.72 0.10 285 / ${p.patternOpacity * pulse * 2})`;
      ctx.lineWidth = p.strokeWeight * 0.7;
      if (isAccent) { glow(ctx, C.orange500, 16 * p.glowAmount); }
      ctx.stroke();
      noGlow(ctx);
    }
  }
}

/* ══════════════════════════════════════════════════════════════
   CANVAS
══════════════════════════════════════════════════════════════ */
function BgCanvas(): JSX.Element {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const rafRef      = useRef<number>(0);
  const timeRef     = useRef<number>(0);
  /* Escribe params en localStorage en cada cambio — preview los lee */
  useEffect(function setupSync() {
    function writeToStorage(s: ReturnType<typeof useBgStore.getState>): void {
      const snap = {
        geometry: s.geometry, speed: s.speed, density: s.density,
        curlFrequency: s.curlFrequency, displacementAmount: s.displacementAmount,
        patternOpacity: s.patternOpacity, accentOpacity: s.accentOpacity,
        strokeWeight: s.strokeWeight, scaleX: s.scaleX, scaleY: s.scaleY,
        twistAmount: s.twistAmount, lightZ: s.lightZ,
        ambientLight: s.ambientLight, lightIntensity: s.lightIntensity,
        glowAmount: s.glowAmount,
      };
      localStorage.setItem("vmc-bg-live", JSON.stringify(snap));
    }
    /* Escribir estado inicial */
    writeToStorage(useBgStore.getState());
    /* Suscribir a cambios futuros */
    const unsub = useBgStore.subscribe(writeToStorage);
    return unsub;
  }, []);

  useEffect(function mount() {
    const canvas = canvasRef.current;
    if (!canvas) { return; }
    function scale(): void {
      const parent = canvas!.parentElement;
      if (!parent) { return; }
      const dpr = window.devicePixelRatio || 1;
      const w = parent.clientWidth, h = parent.clientHeight;
      canvas!.width = w*dpr; canvas!.height = h*dpr;
      canvas!.style.width = `${w}px`; canvas!.style.height = `${h}px`;
      canvas!.getContext("2d")!.scale(dpr, dpr);
    }
    scale();
    window.addEventListener("resize", scale);
    function render(): void {
      const c = canvasRef.current;
      if (!c) { return; }
      const ctx = c.getContext("2d")!;
      const dpr = window.devicePixelRatio || 1;
      const W = c.width/dpr, H = c.height/dpr;
      const p = useBgStore.getState();
      timeRef.current += p.speed * 0.006;
      const t = timeRef.current;
      ctx.fillStyle = VAULT;
      ctx.fillRect(0, 0, W, H);
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      drawAll(ctx, W, H, t, p);
      rafRef.current = requestAnimationFrame(render);
    }
    render();
    return function cleanup() { window.removeEventListener("resize", scale); cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <canvas ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
  );
}

/* ══════════════════════════════════════════════════════════════
   SIDEBAR — LIGHT
══════════════════════════════════════════════════════════════ */
interface SliderProps {
  label: string; sub?: string;
  value: number; min: number; max: number; step: number;
  paramKey: keyof BgParams;
}
function Slider({ label, sub, value, min, max, step, paramKey }: SliderProps): JSX.Element {
  const setParam = useBgStore(function s(st) { return st.setParam; });
  const pct = Math.max(0, Math.min(100, ((value-min)/(max-min))*100));
  function handleChange(e: ChangeEvent<HTMLInputElement>): void { setParam(paramKey, parseFloat(e.target.value)); }
  const dec = step < 0.01 ? 3 : step < 1 ? 2 : 0;
  return (
    <div style={{ marginBottom: 9 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={{ fontFamily: F, fontSize: 9, fontWeight: 600, textTransform: "uppercase",
                       letterSpacing: "0.06em", color: "oklch(0.28 0.18 285)" }}>
          {label}
          {sub && <span style={{ color: "oklch(0.55 0.05 285)", marginLeft: 4,
                                 fontWeight: 400, textTransform: "none" }}>{sub}</span>}
        </span>
        <span style={{ fontFamily: "monospace", fontSize: 9, color: "oklch(0.55 0.18 50)", fontWeight: 700 }}>
          {value.toFixed(dec)}
        </span>
      </div>
      <div style={{ position: "relative", height: 3, borderRadius: 9999, background: "oklch(0.22 0.18 285 / 0.10)" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${pct}%`, borderRadius: 9999,
                      background: "linear-gradient(to right, oklch(0.45 0.22 285), oklch(0.65 0.18 55))" }} />
        <input type="range" min={min} max={max} step={step} value={value} onChange={handleChange}
          style={{ position: "absolute", inset: 0, width: "100%", opacity: 0, cursor: "pointer", margin: 0, height: "100%" }} />
      </div>
    </div>
  );
}

function Sep({ label }: { label: string }): JSX.Element {
  return (
    <p style={{ fontFamily: F, fontSize: 8, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.12em", color: "oklch(0.60 0.16 55)",
                margin: "14px 0 7px", borderBottom: "1px solid oklch(0.22 0.18 285 / 0.10)",
                paddingBottom: 5 }}>{label}</p>
  );
}

const GEO_OPTIONS: { key: GeometryType; label: string; desc: string; badge?: string }[] = [
  { key: "arrowpulse",    label: "Arrow Pulse",   desc: "Convergen al centro · sello naranja", badge: "★" },
  { key: "arrowsignal",  label: "Arrow Signal",  desc: "Ola naranja recorre el campo",        badge: "★" },
  { key: "arroworbit",   label: "Arrow Orbit",   desc: "Órbitas kepleranas · flash al cruzar",badge: "★" },
  { key: "arrowbreathe", label: "Arrow Breathe", desc: "Respiración colectiva · despertares",  badge: "★" },
  { key: "vmcarrows",    label: "VMC Lock",      desc: "› ‹ se sellan · contrato cerrado",    badge: "VMC" },
  { key: "meshgradient",  label: "Mesh Gradient", desc: "Screen blend · Stripe style",    badge: "★" },
  { key: "lightsweep",    label: "Light Sweep",   desc: "Diagonal softlight · Linear",    badge: "★" },
  { key: "halftone",      label: "Halftone Neb.", desc: "Sprite cache + grain TPDF",      badge: "★" },
  { key: "glassgrid",     label: "Glass Grid",    desc: "Mesh base + glassmorphic",        badge: "★" },
  { key: "ribbons",       label: "Ribbons",       desc: "Bandas Curl Noise" },
  { key: "aurora",        label: "Aurora",        desc: "Bandas naranja→cyan" },
  { key: "vortex",        label: "Vortex",        desc: "Espirales desde centro" },
  { key: "starfield",     label: "Star Field",    desc: "Parallax 3D" },
  { key: "plasma",        label: "Plasma",        desc: "Blobs SDF radiales" },
  { key: "constellation", label: "Constellation", desc: "Nodos conectados" },
  { key: "hexgrid",       label: "Hex Grid",      desc: "Rejilla hexagonal" },
];

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default function BackgroundGenPage(): JSX.Element {
  const p = useBgStore();
  const [saveName, setSaveName]   = useState("");
  const [showSave, setShowSave]   = useState(false);
  const [presets, setPresets]     = useState<SavedPreset[]>([]);

  /* Cargar presets del localStorage en el cliente — evita SSR mismatch */
  useEffect(function loadPresets() {
    setPresets(p.listPresets());
  }, []);

  function handleGeo(g: GeometryType): void { p.setParam("geometry", g); }
  function handleSave(): void {
    if (!saveName.trim()) { return; }
    p.savePreset(saveName.trim());
    setPresets(p.listPresets());
    setSaveName(""); setShowSave(false);
  }
  function handleLoad(preset: SavedPreset): void { p.loadPreset(preset); }
  function handleDelete(name: string): void { p.deletePreset(name); setPresets(p.listPresets()); }
  function handleSaveNameChange(e: React.ChangeEvent<HTMLInputElement>): void { setSaveName(e.target.value); }
  function handleToggleSave(): void { setShowSave(!showSave); }

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: VAULT, fontFamily: F }}>

      {/* Sidebar light */}
      <aside style={{ width: 256, flexShrink: 0, overflowY: "auto",
                      background: "oklch(0.98 0.003 285)",
                      borderRight: "1px solid oklch(0.22 0.18 285 / 0.12)",
                      padding: "16px 14px" }}>

        <div style={{ marginBottom: 14 }}>
          <p style={{ fontFamily: F, fontSize: 10, fontWeight: 800, textTransform: "uppercase",
                      letterSpacing: "0.12em", color: "oklch(0.22 0.18 285)", margin: "0 0 2px" }}>
            BG Generator
          </p>
          <p style={{ fontFamily: F, fontSize: 7, color: "oklch(0.50 0.05 285)", margin: 0,
                      letterSpacing: "0.08em", textTransform: "uppercase" }}>
            VMC Subastas · Parametric
          </p>
        </div>

        <Sep label="Geometría" />
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {GEO_OPTIONS.map(function renderGeo(opt) {
            const active = opt.key === p.geometry;
            function handleClick(): void { handleGeo(opt.key); }
            return (
              <button key={opt.key} type="button" onClick={handleClick} style={{
                textAlign: "left", padding: "7px 10px", borderRadius: 7, cursor: "pointer",
                border: active ? "1px solid oklch(0.55 0.18 50 / 0.50)" : "1px solid oklch(0.22 0.18 285 / 0.10)",
                background: active ? "oklch(0.55 0.18 50 / 0.07)" : "transparent",
              }}>
                <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                              letterSpacing: "0.06em", marginBottom: 1, display: "flex", gap: 4, alignItems: "center",
                              color: active ? "oklch(0.55 0.18 50)" : "oklch(0.35 0.12 285)" }}>
                  {opt.label}
                  {opt.badge && <span style={{ fontSize: 8, color: "oklch(0.65 0.16 55)" }}>{opt.badge}</span>}
                </div>
                <div style={{ fontFamily: F, fontSize: 8, color: "oklch(0.55 0.05 285)" }}>{opt.desc}</div>
              </button>
            );
          })}
        </div>

        {/* ── Presets — input siempre visible ── */}
        <Sep label="Presets" />
        <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
          <input
            type="text" value={saveName} onChange={handleSaveNameChange}
            placeholder="Nombre → Enter para guardar"
            onKeyDown={function onKey(e) { if (e.key === "Enter") { handleSave(); } }}
            style={{ flex: 1, height: 28, borderRadius: 6, padding: "0 8px",
                     border: "1px solid oklch(0.22 0.18 285 / 0.20)",
                     background: "oklch(0.95 0.004 285)", fontFamily: F, fontSize: 9,
                     color: "oklch(0.22 0.18 285)", outline: "none" }}
          />
          <button type="button" onClick={handleSave} style={{
            width: 28, height: 28, borderRadius: 6, border: "none",
            background: "oklch(0.55 0.18 50)", color: "#fff",
            fontWeight: 700, fontSize: 12, cursor: "pointer",
          }}>+</button>
        </div>
        {/* Lista de presets guardados */}
        <div style={{ display: "flex", flexDirection: "column", gap: 3, maxHeight: 180, overflowY: "auto", marginBottom: 6 }}>
          {presets.length === 0 && (
            <p style={{ fontFamily: F, fontSize: 8, color: "oklch(0.55 0.05 285)", margin: 0, fontStyle: "italic", textAlign: "center", padding: "4px 0" }}>
              Aún no hay presets guardados
            </p>
          )}
          {presets.map(function renderPresetTop(preset) {
            function handleLoadClick(): void { handleLoad(preset); }
            function handleDeleteClick(): void { handleDelete(preset.name); }
            function handleCopyLink(): void {
              const encoded = encodeURIComponent(btoa(JSON.stringify(preset.params)));
              const url = `${window.location.origin}/preview/tools/background-gen/preview?p=${encoded}`;
              navigator.clipboard.writeText(url).catch(function noop() { return; });
            }
            return (
              <div key={preset.name} style={{
                background: "oklch(0.93 0.004 285)", borderRadius: 6,
                padding: "5px 8px", cursor: "pointer",
                border: "1px solid oklch(0.22 0.18 285 / 0.08)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <button type="button" onClick={handleLoadClick} style={{
                    flex: 1, textAlign: "left", background: "none", border: "none",
                    fontFamily: F, fontSize: 10, fontWeight: 700, color: "oklch(0.28 0.18 285)",
                    cursor: "pointer", padding: 0,
                  }}>{preset.name}</button>
                  <button type="button" onClick={handleCopyLink} title="Copiar link" style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: 11, padding: "0 2px", color: "oklch(0.55 0.18 50)", lineHeight: 1,
                  }}>⎘</button>
                  <button type="button" onClick={handleDeleteClick} style={{
                    background: "none", border: "none", color: "oklch(0.60 0.05 285)",
                    cursor: "pointer", fontSize: 13, padding: 0, lineHeight: 1,
                  }}>×</button>
                </div>
                <div style={{ fontFamily: F, fontSize: 7, color: "oklch(0.55 0.05 285)", marginTop: 2 }}>
                  {preset.params.geometry} · op {preset.params.patternOpacity.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>

        <Sep label="Movimiento" />
        <Slider label="Speed"        value={p.speed}              min={0}    max={2}   step={0.01} paramKey="speed" />
        <Slider label="Density"      value={p.density}            min={2}    max={30}  step={1}    paramKey="density" />
        <Slider label="Curl Freq"    value={p.curlFrequency}      min={0.001} max={0.015} step={0.001} paramKey="curlFrequency" />
        <Slider label="Displace"     value={p.displacementAmount} min={0}    max={200} step={5}    paramKey="displacementAmount" />
        <Slider label="Twist"        value={p.twistAmount}        min={0}    max={5}   step={0.05} paramKey="twistAmount" />

        <Sep label="Escala" />
        <Slider label="Scale X"      value={p.scaleX}             min={0.5}  max={12}  step={0.1}  paramKey="scaleX" />
        <Slider label="Scale Y"      value={p.scaleY}             min={0.5}  max={8}   step={0.1}  paramKey="scaleY" />

        <Sep label="Color · DS" />
        <Slider label="Opacidad"     value={p.patternOpacity}     min={0.01} max={0.30} step={0.01} paramKey="patternOpacity" />
        <Slider label="Naranja"      value={p.accentOpacity}      min={0}    max={0.25} step={0.005} paramKey="accentOpacity" />
        <Slider label="Stroke"       value={p.strokeWeight}       min={0.3}  max={5}   step={0.1}  paramKey="strokeWeight" />
        <Slider label="Glow"         value={p.glowAmount}         min={0}    max={3}   step={0.05} paramKey="glowAmount" />

        {/* Actions */}
        <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
          <button type="button" onClick={p.reset} style={{
            flex: 1, height: 28, borderRadius: 9999,
            border: "1px solid oklch(0.22 0.18 285 / 0.20)", background: "transparent",
            fontFamily: F, fontSize: 8, fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.08em", color: "oklch(0.40 0.12 285)", cursor: "pointer",
          }}>Reset</button>
          <button type="button" onClick={p.randomize} style={{
            flex: 1, height: 28, borderRadius: 9999,
            border: "1px solid oklch(0.55 0.18 50 / 0.40)", background: "oklch(0.55 0.18 50 / 0.07)",
            fontFamily: F, fontSize: 8, fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.06em", color: "oklch(0.55 0.18 50)", cursor: "pointer",
          }}>⟳ Random</button>
        </div>

        {/* Preview */}
        <button type="button" onClick={function openPreview() {
          /* localStorage ya tiene el estado actual — preview lo lee al montar */
          window.open("/preview/tools/background-gen/preview", "_blank");
        }} style={{
          marginTop: 8, width: "100%", height: 32, borderRadius: 9999, border: "none",
          background: "linear-gradient(135deg, oklch(0.45 0.22 285), oklch(0.65 0.18 55))",
          fontFamily: F, fontSize: 9, fontWeight: 700, textTransform: "uppercase",
          letterSpacing: "0.08em", color: "#fff", cursor: "pointer",
          boxShadow: "0 2px 10px oklch(0.65 0.18 55 / 0.28)",
        }}>→ Preview en Homepage</button>
      </aside>

      {/* Canvas */}
      <main style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <BgCanvas />
        <div style={{ position: "absolute", bottom: 14, right: 18,
                      fontFamily: F, fontSize: 8, fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: "0.10em",
                      color: "oklch(1 0 0 / 0.20)" }}>
          {p.geometry} · op {p.patternOpacity.toFixed(2)} · glow {p.glowAmount.toFixed(1)}
        </div>
      </main>
    </div>
  );
}
