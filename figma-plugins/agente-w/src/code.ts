/// <reference path="../node_modules/@figma/plugin-typings/index.d.ts" />

/* ══════════════════════════════════════════════════════════════════
   AGENTE W — Auditor de Accesibilidad · VMC Subastas
   WCAG 2.2 (SC 1.4.3, 1.4.11) + APCA (WCAG 3.0 draft)
   ══════════════════════════════════════════════════════════════════ */

/* ── Types ──────────────────────────────────────────────────────── */

interface ColorRGB { r: number; g: number; b: number; }

interface VarInfo {
  id:    string;
  name:  string;
  color: ColorRGB;
}

interface AuditIssue {
  nodeId:           string;
  nodeName:         string;
  parentName:       string;
  fgColor:          ColorRGB;
  bgColor:          ColorRGB;
  fgVarId:          string | undefined;
  fgVarName:        string | undefined;
  wcagRatio:        number;
  wcagAA:           boolean;
  wcagAAA:          boolean;
  apcaLc:           number;
  apcaMin:          number;
  apcaPass:         boolean;
  fontSize:         number;
  fontWeight:       number;
  pass:             boolean;
  /* ── Fix polaridad: el fix puede apuntar al texto o al fondo ── */
  fixTarget:        'fg' | 'bg';
  fixNodeId:        string;        // texto o frame padre
  suggestedVarId:   string | undefined;
  suggestedVarName: string | undefined;
  suggestedColor:   ColorRGB | undefined;
}

type PluginMsg =
  | { type: 'scan-selection' }
  | { type: 'scan-page' }
  | { type: 'apply-fix'; fixNodeId: string; varId: string; fixTarget: 'fg' | 'bg' };

/* ── WCAG 2.x — Luminancia relativa + ratio ─────────────────────── */

function toLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance(c: ColorRGB): number {
  return 0.2126 * toLinear(c.r) + 0.7152 * toLinear(c.g) + 0.0722 * toLinear(c.b);
}

function contrastRatio(c1: ColorRGB, c2: ColorRGB): number {
  const hi = Math.max(relativeLuminance(c1), relativeLuminance(c2));
  const lo = Math.min(relativeLuminance(c1), relativeLuminance(c2));
  return (hi + 0.05) / (lo + 0.05);
}

function wcagThresholds(fontSize: number, fontWeight: number): { aa: number; aaa: number } {
  const isLarge = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);
  return { aa: isLarge ? 3.0 : 4.5, aaa: isLarge ? 4.5 : 7.0 };
}

/* ── APCA — algoritmo SA98G (inlined de apca-w3) ────────────────── */

function sRGBtoY(c: ColorRGB): number {
  return 0.2126729 * Math.pow(c.r, 2.4)
       + 0.7151522 * Math.pow(c.g, 2.4)
       + 0.0721750 * Math.pow(c.b, 2.4);
}

function calcApcaLc(fg: ColorRGB, bg: ColorRGB): number {
  const blkThrs = 0.022, blkClmp = 1.414, loClip = 0.1, deltaYmin = 0.0005;
  const normBG = 0.56, normTXT = 0.57, revTXT = 0.62, revBG = 0.65;
  const scaleBoW = 1.14, scaleWoB = 1.14;
  const loOff = 0.027;

  const txtY = sRGBtoY(fg);
  const bgY  = sRGBtoY(bg);

  if (Math.abs(bgY - txtY) < deltaYmin) return 0;

  const txtYc = txtY > blkThrs ? txtY : txtY + Math.pow(blkThrs - txtY, blkClmp);
  const bgYc  = bgY  > blkThrs ? bgY  : bgY  + Math.pow(blkThrs - bgY,  blkClmp);

  let Sapc: number;
  if (bgYc > txtYc) {
    Sapc = (Math.pow(bgYc, normBG) - Math.pow(txtYc, normTXT)) * scaleBoW;
    if (Sapc < loClip) return 0;
    return Sapc < loOff ? Sapc - Sapc * loOff * loOff : Sapc - loOff;
  } else {
    Sapc = (Math.pow(bgYc, revBG) - Math.pow(txtYc, revTXT)) * scaleWoB;
    if (Sapc > -loClip) return 0;
    return Sapc > -loOff ? Sapc - Sapc * loOff * loOff : Sapc + loOff;
  }
}

function apcaMinLc(fontSize: number, fontWeight: number): number {
  if (fontWeight >= 700) {
    if (fontSize >= 24) return 45;
    if (fontSize >= 16) return 60;
    if (fontSize >= 14) return 75;
    return 90;
  }
  if (fontSize >= 36) return 45;
  if (fontSize >= 24) return 60;
  if (fontSize >= 18) return 75;
  return 90;
}

/* ── Figma Variables API ─────────────────────────────────────────── */

function getCollectionFirstModeMap(): { [collId: string]: string } {
  const map: { [collId: string]: string } = {};
  for (const col of figma.variables.getLocalVariableCollections()) {
    map[col.id] = col.modes[0].modeId;
  }
  return map;
}

function resolveVarColor(varId: string, modeMap: { [k: string]: string }): ColorRGB | null {
  const v = figma.variables.getVariableById(varId);
  if (!v || v.resolvedType !== 'COLOR') return null;
  const modeId = modeMap[v.variableCollectionId];
  if (!modeId) return null;
  const val = v.valuesByMode[modeId];
  if (!val || typeof val !== 'object' || !('r' in val)) return null;
  const rgba = val as RGBA;
  return { r: rgba.r, g: rgba.g, b: rgba.b };
}

function getAllColorVars(): VarInfo[] {
  const modeMap = getCollectionFirstModeMap();
  const result: VarInfo[] = [];
  for (const v of figma.variables.getLocalVariables('COLOR')) {
    const color = resolveVarColor(v.id, modeMap);
    if (color) result.push({ id: v.id, name: v.name, color });
  }
  return result;
}

function resolveSolidPaint(
  paint: SolidPaint,
  modeMap: { [k: string]: string }
): { color: ColorRGB; varId: string | undefined } {
  const varId = paint.boundVariables?.color?.id;
  if (varId) {
    const color = resolveVarColor(varId, modeMap);
    if (color) return { color, varId };
  }
  return { color: paint.color, varId: undefined };
}

/* ── Background detection ────────────────────────────────────────── */

function compositeOver(fg: ColorRGB, alpha: number, bg: ColorRGB): ColorRGB {
  if (alpha >= 1) return fg;
  return {
    r: fg.r * alpha + bg.r * (1 - alpha),
    g: fg.g * alpha + bg.g * (1 - alpha),
    b: fg.b * alpha + bg.b * (1 - alpha),
  };
}

function gradientAvgColor(fill: GradientPaint): ColorRGB {
  const stops = fill.gradientStops;
  if (stops.length === 0) return { r: 1, g: 1, b: 1 };
  const r = stops.reduce((s, t) => s + t.color.r, 0) / stops.length;
  const g = stops.reduce((s, t) => s + t.color.g, 0) / stops.length;
  const b = stops.reduce((s, t) => s + t.color.b, 0) / stops.length;
  return { r, g, b };
}

function getParentBackground(
  node: SceneNode,
  modeMap: { [k: string]: string }
): ColorRGB {
  let current = node.parent;
  while (current) {
    if (current.type === 'PAGE' || current.type === 'DOCUMENT') break;
    const scene = current as SceneNode;
    if ('fills' in scene) {
      const fills = scene.fills;
      if (Array.isArray(fills)) {
        for (const fill of fills as Paint[]) {
          if (!(fill.visible ?? true)) continue;
          const opacity = fill.opacity ?? 1;
          if (opacity < 0.5) continue;

          if (fill.type === 'SOLID') {
            return compositeOver(
              resolveSolidPaint(fill as SolidPaint, modeMap).color,
              opacity,
              { r: 1, g: 1, b: 1 }
            );
          }

          if (
            fill.type === 'GRADIENT_LINEAR' ||
            fill.type === 'GRADIENT_RADIAL' ||
            fill.type === 'GRADIENT_ANGULAR' ||
            fill.type === 'GRADIENT_DIAMOND'
          ) {
            return gradientAvgColor(fill as GradientPaint);
          }
        }
      }
    }
    current = scene.parent;
  }
  return { r: 1, g: 1, b: 1 }; // default blanco
}

/* ── Sugerencia de variable DS ───────────────────────────────────
   mode 'fg': busca variable para reemplazar el texto (fondo fijo)
   mode 'bg': busca variable para reemplazar el fondo (texto fijo)
   En ambos casos devuelve la variable DS más cercana visualmente
   que supere minRatio y minLc.
─────────────────────────────────────────────────────────────── */

function suggestVar(
  fixedColor:   ColorRGB,
  variedColor:  ColorRGB,
  minRatio:     number,
  minLc:        number,
  allVars:      VarInfo[],
  currentVarId: string | undefined,
  mode:         'fg' | 'bg'
): VarInfo | undefined {
  let best: VarInfo | undefined;
  let bestDist = Infinity;

  for (const v of allVars) {
    if (v.id === currentVarId) continue;

    let ratio: number;
    let lc: number;

    if (mode === 'fg') {
      // v juega como texto sobre fixedColor (fondo)
      ratio = contrastRatio(v.color, fixedColor);
      lc    = Math.abs(calcApcaLc(v.color, fixedColor));
    } else {
      // v juega como fondo debajo de fixedColor (texto)
      ratio = contrastRatio(fixedColor, v.color);
      lc    = Math.abs(calcApcaLc(fixedColor, v.color));
    }

    if (ratio < minRatio - 0.05 && lc < minLc - 2) continue;

    const dist = Math.sqrt(
      Math.pow(v.color.r - variedColor.r, 2) +
      Math.pow(v.color.g - variedColor.g, 2) +
      Math.pow(v.color.b - variedColor.b, 2)
    );
    if (dist < bestDist) { bestDist = dist; best = v; }
  }
  return best;
}

/* ── Auditar un TextNode ─────────────────────────────────────────── */

function auditTextNode(
  node: TextNode,
  allVars: VarInfo[],
  modeMap: { [k: string]: string }
): AuditIssue | null {
  if (!node.visible) return null;

  const fills = node.fills;
  if (!Array.isArray(fills) || fills.length === 0) return null;

  const solidFill = (fills as Paint[]).find(
    (f): f is SolidPaint => f.type === 'SOLID' && (f.visible ?? true)
  );
  if (!solidFill) return null;

  const { color: rawFg, varId: fgVarId } = resolveSolidPaint(solidFill, modeMap);
  const fgAlpha = solidFill.opacity ?? 1;

  const bgColor = getParentBackground(node, modeMap);
  const fgColor = compositeOver(rawFg, fgAlpha, bgColor);

  const fontSize   = typeof node.fontSize   === 'number' ? node.fontSize   : 14;
  const fontWeight = typeof node.fontWeight === 'number' ? node.fontWeight : 400;

  const ratio = contrastRatio(fgColor, bgColor);
  const { aa, aaa } = wcagThresholds(fontSize, fontWeight);
  const wcagAA  = ratio >= aa  - 0.001;
  const wcagAAA = ratio >= aaa - 0.001;

  const lc     = Math.abs(calcApcaLc(fgColor, bgColor));
  const lcMin  = apcaMinLc(fontSize, fontWeight);
  const apcaPass = lc >= lcMin - 0.1;

  const pass = wcagAA && apcaPass;

  /* ── Polaridad: texto más claro que fondo → fix apunta al fondo ── */
  const fgLum = relativeLuminance(fgColor);
  const bgLum = relativeLuminance(bgColor);
  const fixTarget: 'fg' | 'bg' = fgLum > bgLum ? 'bg' : 'fg';

  let suggestedVarId:   string | undefined;
  let suggestedVarName: string | undefined;
  let suggestedColor:   ColorRGB | undefined;
  let fixNodeId = node.id;

  if (!pass) {
    if (fixTarget === 'bg') {
      // Texto claro (ej. blanco) sobre fondo insuficiente → buscar fondo más oscuro
      const parentScene = node.parent;
      if (parentScene && parentScene.type !== 'PAGE' && parentScene.type !== 'DOCUMENT') {
        fixNodeId = parentScene.id;
      }
      const fix = suggestVar(fgColor, bgColor, aa, lcMin, allVars, undefined, 'bg');
      if (fix) {
        suggestedVarId   = fix.id;
        suggestedVarName = fix.name;
        suggestedColor   = fix.color;
      }
    } else {
      // Texto oscuro sobre fondo claro → buscar texto más oscuro
      const fix = suggestVar(bgColor, fgColor, aa, lcMin, allVars, fgVarId, 'fg');
      if (fix) {
        suggestedVarId   = fix.id;
        suggestedVarName = fix.name;
        suggestedColor   = fix.color;
      }
    }
  }

  let fgVarName: string | undefined;
  if (fgVarId) {
    const v = figma.variables.getVariableById(fgVarId);
    if (v) fgVarName = v.name;
  }

  const parent = node.parent as SceneNode | null;

  return {
    nodeId:     node.id,
    nodeName:   node.name || '(text)',
    parentName: parent?.name ?? '',
    fgColor,
    bgColor,
    fgVarId,
    fgVarName,
    wcagRatio: +ratio.toFixed(2),
    wcagAA,
    wcagAAA,
    apcaLc: +lc.toFixed(1),
    apcaMin: lcMin,
    apcaPass,
    fontSize,
    fontWeight,
    pass,
    fixTarget,
    fixNodeId,
    suggestedVarId,
    suggestedVarName,
    suggestedColor,
  };
}

/* ── Traversal ───────────────────────────────────────────────────── */

function collectTextNodes(roots: readonly SceneNode[]): TextNode[] {
  const results: TextNode[] = [];
  function walk(node: SceneNode): void {
    if (!node.visible) return;
    if (node.type === 'TEXT') {
      results.push(node);
    } else if ('children' in node) {
      for (const child of (node as ChildrenMixin).children) {
        walk(child as SceneNode);
      }
    }
  }
  for (const n of roots) walk(n);
  return results;
}

function scanNodes(roots: readonly SceneNode[]): AuditIssue[] {
  const allVars  = getAllColorVars();
  const modeMap  = getCollectionFirstModeMap();
  const textNodes = collectTextNodes(roots).slice(0, 500); // límite de seguridad

  const issues: AuditIssue[] = [];
  for (const node of textNodes) {
    const result = auditTextNode(node, allVars, modeMap);
    if (result) issues.push(result);
  }

  // Fallos primero, luego pasen
  issues.sort((a, b) => {
    if (a.pass !== b.pass) return a.pass ? 1 : -1;
    return a.wcagRatio - b.wcagRatio; // peor ratio primero dentro de cada grupo
  });

  return issues;
}

/* ── Aplicar fix ─────────────────────────────────────────────────── */

function applyFix(fixNodeId: string, varId: string, fixTarget: 'fg' | 'bg'): void {
  const node = figma.getNodeById(fixNodeId);
  if (!node) return;

  const variable = figma.variables.getVariableById(varId);
  if (!variable) return;

  if (fixTarget === 'fg') {
    // Cambiar fill del texto
    if (node.type !== 'TEXT') return;
    const fills = node.fills;
    if (!Array.isArray(fills)) return;
    node.fills = (fills as Paint[]).map(fill => {
      if (fill.type !== 'SOLID') return fill;
      return figma.variables.setBoundVariableForPaint(fill as SolidPaint, 'color', variable);
    });
  } else {
    // Cambiar fill del frame/contenedor padre
    const scene = node as SceneNode;
    if (!('fills' in scene)) return;
    const fills = scene.fills;
    if (!Array.isArray(fills)) return;

    // Reemplaza el primer fill visible (sólido o gradiente) con la variable sólida
    let replaced = false;
    const newFills = (fills as Paint[]).map(fill => {
      if (replaced) return fill;
      if (!(fill.visible ?? true)) return fill;
      if (fill.type === 'SOLID') {
        replaced = true;
        return figma.variables.setBoundVariableForPaint(fill as SolidPaint, 'color', variable);
      }
      if (
        fill.type === 'GRADIENT_LINEAR' ||
        fill.type === 'GRADIENT_RADIAL' ||
        fill.type === 'GRADIENT_ANGULAR' ||
        fill.type === 'GRADIENT_DIAMOND'
      ) {
        // Reemplaza el gradiente por un sólido con la variable sugerida
        replaced = true;
        const varColor = variable.valuesByMode[Object.keys(variable.valuesByMode)[0]] as RGBA;
        const solid: SolidPaint = { type: 'SOLID', color: { r: varColor.r, g: varColor.g, b: varColor.b } };
        return figma.variables.setBoundVariableForPaint(solid, 'color', variable);
      }
      return fill;
    });

    (scene as FrameNode).fills = newFills;
    figma.notify(`✓ Fondo → "${variable.name}" (gradiente reemplazado por sólido)`, { timeout: 3000 });
    return;
  }

  figma.notify(`✓ Variable "${variable.name}" aplicada`, { timeout: 2000 });
}

/* ── Main ────────────────────────────────────────────────────────── */

figma.showUI(__html__, { width: 340, height: 520, title: 'Agente W' });

figma.ui.onmessage = (msg: PluginMsg): void => {
  if (msg.type === 'scan-selection') {
    try {
      const issues = scanNodes(figma.currentPage.selection);
      figma.ui.postMessage({ type: 'results', issues });
    } catch (e) {
      figma.ui.postMessage({ type: 'error', message: String(e) });
    }
    return;
  }

  if (msg.type === 'scan-page') {
    try {
      const issues = scanNodes(figma.currentPage.children as SceneNode[]);
      figma.ui.postMessage({ type: 'results', issues });
    } catch (e) {
      figma.ui.postMessage({ type: 'error', message: String(e) });
    }
    return;
  }

  if (msg.type === 'apply-fix') {
    try {
      applyFix(msg.fixNodeId, msg.varId, msg.fixTarget);
      figma.ui.postMessage({ type: 'fix-applied', nodeId: msg.fixNodeId });
    } catch (e) {
      figma.ui.postMessage({ type: 'error', message: String(e) });
    }
  }
};
