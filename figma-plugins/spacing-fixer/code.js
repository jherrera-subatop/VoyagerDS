// Voyager Spacing Fixer — compiled output

const SCALE = [2, 4, 8, 12, 16, 24, 32, 48, 64, 80, 96];

const TOKEN_NAME = {
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

const TOLERANCE = 1;

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function snapToScale(value) {
  let best = SCALE[0];
  let minDelta = Math.abs(value - best);
  for (const s of SCALE) {
    const d = Math.abs(value - s);
    if (d < minDelta) { minDelta = d; best = s; }
  }
  return { suggested: best, token: TOKEN_NAME[best], delta: minDelta };
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

function scanAutoLayout(node) {
  const violations = [];
  const checks = [
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

function scanAbsoluteGaps(node) {
  const violations = [];
  const visible = node.children.filter(c => c.visible && c.rotation === 0);
  if (visible.length < 2) return violations;
  const sorted = [...visible].sort((a, b) => a.y - b.y);
  for (let i = 0; i < sorted.length - 1; i++) {
    const prev = sorted[i];
    const next = sorted[i + 1];
    const gap = round2(next.y - (prev.y + prev.height));
    if (gap <= 0) continue;
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

function scanNode(node) {
  const violations = [];
  const isContainer =
    node.type === 'FRAME' ||
    node.type === 'COMPONENT' ||
    node.type === 'INSTANCE';
  if (!isContainer) return violations;

  if (node.layoutMode !== 'NONE') {
    violations.push(...scanAutoLayout(node));
  } else if (node.type === 'FRAME') {
    violations.push(...scanAbsoluteGaps(node));
  }

  if ('children' in node) {
    for (const child of node.children) {
      violations.push(...scanNode(child));
    }
  }
  return violations;
}

function runScan() {
  const selection = figma.currentPage.selection;
  const targets = selection.length > 0 ? selection : figma.currentPage.children;
  const all = [];
  for (const node of targets) {
    all.push(...scanNode(node));
  }
  return all;
}

function applyFixes(violations) {
  let count = 0;
  for (const v of violations) {
    if (v.kind === 'auto-layout') {
      const node = figma.getNodeById(v.nodeId);
      if (!node || node.type === 'DOCUMENT' || node.type === 'PAGE') continue;
      const frame = node;
      if (frame.layoutMode === 'NONE') continue;
      if (v.property === 'gap')           frame.itemSpacing    = v.suggested;
      if (v.property === 'paddingTop')    frame.paddingTop     = v.suggested;
      if (v.property === 'paddingBottom') frame.paddingBottom  = v.suggested;
      if (v.property === 'paddingLeft')   frame.paddingLeft    = v.suggested;
      if (v.property === 'paddingRight')  frame.paddingRight   = v.suggested;
      count++;
    }
    if (v.kind === 'absolute') {
      const prev = figma.getNodeById(v.prevNodeId);
      const next = figma.getNodeById(v.nextNodeId);
      if (!prev || !next) continue;
      next.y = prev.y + prev.height + v.suggested;
      count++;
    }
  }
  return count;
}

figma.showUI(__html__, {
  width: 420,
  height: 560,
  title: 'Voyager Spacing Fixer',
});

figma.ui.onmessage = (msg) => {
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
