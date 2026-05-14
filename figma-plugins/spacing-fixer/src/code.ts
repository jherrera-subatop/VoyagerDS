/// <reference types="@figma/plugin-typings" />

// ─── Voyager spacing scale (tokens.json PRIMITIVOS — space.*) ────────────────
const SCALE: readonly number[] = [2, 4, 8, 12, 16, 24, 32, 48, 64, 80, 96];

const TOKEN_NAME: Record<number, string> = {
  2:  'space.025',
  4:  'space.050',
  8:  'space.100',
  12: 'space.150',
  16: 'space.200',
  24: 'space.300',
  32: 'space.400',
  48: 'space.600',
  64: 'space.800',
  80: 'space.1000',
  96: 'space.1200',
};

// Values within ±TOLERANCE px of a token are considered valid (float precision)
const TOLERANCE = 1;

// ─── Types ───────────────────────────────────────────────────────────────────

interface AutoLayoutViolation {
  vid: string;
  kind: 'auto-layout';
  nodeId: string;
  nodeName: string;
  property: 'gap' | 'paddingTop' | 'paddingBottom' | 'paddingLeft' | 'paddingRight';
  current: number;
  suggested: number;
  token: string;
  delta: number;
}

interface AbsoluteGapViolation {
  vid: string;
  kind: 'absolute';
  parentId: string;
  parentName: string;
  prevNodeId: string;
  nextNodeId: string;
  label: string;
  current: number;
  suggested: number;
  token: string;
  delta: number;
}

type Violation = AutoLayoutViolation | AbsoluteGapViolation;

interface PluginMessage {
  type: 'scan' | 'fix' | 'close';
  fixes?: Violation[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

function snapToScale(value: number): { suggested: number; token: string; delta: number } {
  let best = SCALE[0];
  let minDelta = Math.abs(value - best);

  for (const s of SCALE) {
    const d = Math.abs(value - s);
    if (d < minDelta) {
      minDelta = d;
      best = s;
    }
  }

  return { suggested: best, token: TOKEN_NAME[best], delta: minDelta };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

// ─── Scan — Auto Layout frame ─────────────────────────────────────────────────

function scanAutoLayout(
  node: FrameNode | ComponentNode | InstanceNode,
): AutoLayoutViolation[] {
  const violations: AutoLayoutViolation[] = [];

  const checks: Array<[AutoLayoutViolation['property'], number]> = [
    ['gap',           node.itemSpacing],
    ['paddingTop',    node.paddingTop],
    ['paddingBottom', node.paddingBottom],
    ['paddingLeft',   node.paddingLeft],
    ['paddingRight',  node.paddingRight],
  ];

  for (const [prop, rawVal] of checks) {
    const val = round2(rawVal);
    if (val <= 0) continue;

    const snap = snapToScale(val);
    if (snap.delta > TOLERANCE) {
      violations.push({
        vid: uid(),
        kind: 'auto-layout',
        nodeId: node.id,
        nodeName: node.name,
        property: prop,
        current: val,
        suggested: snap.suggested,
        token: snap.token,
        delta: snap.delta,
      });
    }
  }

  return violations;
}

// ─── Scan — Absolute (free-form) frame ───────────────────────────────────────

function scanAbsoluteGaps(node: FrameNode): AbsoluteGapViolation[] {
  const violations: AbsoluteGapViolation[] = [];

  const visible = node.children.filter(c => c.visible && c.rotation === 0);
  if (visible.length < 2) return violations;

  // Sort by top edge
  const sorted = [...visible].sort((a, b) => a.y - b.y);

  for (let i = 0; i < sorted.length - 1; i++) {
    const prev = sorted[i];
    const next = sorted[i + 1];
    const gap = round2(next.y - (prev.y + prev.height));

    if (gap <= 0) continue; // overlapping or touching — skip

    const snap = snapToScale(gap);
    if (snap.delta > TOLERANCE) {
      violations.push({
        vid: uid(),
        kind: 'absolute',
        parentId: node.id,
        parentName: node.name,
        prevNodeId: prev.id,
        nextNodeId: next.id,
        label: `"${prev.name}" → "${next.name}"`,
        current: gap,
        suggested: snap.suggested,
        token: snap.token,
        delta: snap.delta,
      });
    }
  }

  return violations;
}

// ─── Recursive scan ───────────────────────────────────────────────────────────

function scanNode(node: SceneNode): Violation[] {
  const violations: Violation[] = [];

  const isContainer =
    node.type === 'FRAME' ||
    node.type === 'COMPONENT' ||
    node.type === 'INSTANCE';

  if (!isContainer) return violations;

  const container = node as FrameNode | ComponentNode | InstanceNode;

  if (container.layoutMode !== 'NONE') {
    violations.push(...scanAutoLayout(container));
  } else if (node.type === 'FRAME') {
    violations.push(...scanAbsoluteGaps(node as FrameNode));
  }

  if ('children' in container) {
    for (const child of container.children) {
      violations.push(...scanNode(child));
    }
  }

  return violations;
}

function runScan(): Violation[] {
  const selection = figma.currentPage.selection;
  const targets: readonly SceneNode[] =
    selection.length > 0 ? selection : figma.currentPage.children;

  const all: Violation[] = [];
  for (const node of targets) {
    all.push(...scanNode(node));
  }
  return all;
}

// ─── Fix ──────────────────────────────────────────────────────────────────────

function applyFixes(violations: Violation[]): number {
  let count = 0;

  for (const v of violations) {
    if (v.kind === 'auto-layout') {
      const node = figma.getNodeById(v.nodeId);
      if (!node || node.type === 'DOCUMENT' || node.type === 'PAGE') continue;

      const frame = node as FrameNode;
      if (frame.layoutMode === 'NONE') continue;

      if (v.property === 'gap')           frame.itemSpacing    = v.suggested;
      if (v.property === 'paddingTop')    frame.paddingTop     = v.suggested;
      if (v.property === 'paddingBottom') frame.paddingBottom  = v.suggested;
      if (v.property === 'paddingLeft')   frame.paddingLeft    = v.suggested;
      if (v.property === 'paddingRight')  frame.paddingRight   = v.suggested;
      count++;
    }

    if (v.kind === 'absolute') {
      const prev = figma.getNodeById(v.prevNodeId) as SceneNode | null;
      const next = figma.getNodeById(v.nextNodeId) as SceneNode | null;
      if (!prev || !next) continue;

      // Move next node so the gap matches the suggested token value
      next.y = prev.y + prev.height + v.suggested;
      count++;
    }
  }

  return count;
}

// ─── Plugin entry ─────────────────────────────────────────────────────────────

figma.showUI(__html__, {
  width: 420,
  height: 560,
  title: 'Voyager Spacing Fixer',
});

figma.ui.onmessage = (msg: PluginMessage) => {
  if (msg.type === 'scan') {
    const violations = runScan();
    figma.ui.postMessage({ type: 'result', violations });
  }

  if (msg.type === 'fix' && msg.fixes && msg.fixes.length > 0) {
    const fixed = applyFixes(msg.fixes);
    const remaining = runScan();
    figma.ui.postMessage({ type: 'result', violations: remaining, fixedCount: fixed });
  }

  if (msg.type === 'close') {
    figma.closePlugin();
  }
};
