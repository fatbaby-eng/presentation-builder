/**
 * Smart Guides 2.0 — snap + alignment line computation.
 * Coordinates are in % of the stage. Pixel tolerance converts via stage size.
 */

import { boundsFromEl } from "./bounds.js";

export const SNAP_TOLERANCE_PX = 4;

/**
 * @typedef {{ axis:'x'|'y', pos:number, kind?:string }} GuideLine
 * @typedef {{ x:number, y:number, guides:GuideLine[] }} SnapResult
 */

function tolPct(stageRect, axis) {
  const px = SNAP_TOLERANCE_PX;
  return axis === "x" ? (px / stageRect.width) * 100 : (px / stageRect.height) * 100;
}

/**
 * Build candidate snap edges from a bounds box.
 * @returns {{ axis:'x'|'y', pos:number, edge:string }[]}
 */
function edgesOf(b) {
  return [
    { axis: "x", pos: b.left, edge: "left" },
    { axis: "x", pos: b.cx, edge: "center" },
    { axis: "x", pos: b.right, edge: "right" },
    { axis: "y", pos: b.top, edge: "top" },
    { axis: "y", pos: b.cy, edge: "middle" },
    { axis: "y", pos: b.bottom, edge: "bottom" }
  ];
}

/**
 * Equal-spacing snaps: when moving box sits between two others on an axis,
 * snap so gaps match.
 */
function equalSpacingDelta(moving, siblings, axis, tol) {
  const a0 = axis === "x" ? "left" : "top";
  const a1 = axis === "x" ? "right" : "bottom";
  const sorted = siblings
    .filter(s => !s.slide && !s.guide && s.w > 0.01 && s.h > 0.01)
    .slice()
    .sort((p, q) => p[a0] - q[a0]);
  if (sorted.length < 2) return null;

  let best = null;
  for (let i = 0; i < sorted.length; i++) {
    for (let j = i + 1; j < sorted.length; j++) {
      const A = sorted[i], B = sorted[j];
      if (B[a0] <= A[a1]) continue;
      const gap = B[a0] - A[a1];
      if (gap < 0.5) continue;
      // Place moving centered in the gap with equal padding on both sides
      const room = gap - (axis === "x" ? moving.w : moving.h);
      if (room < 0) continue;
      const targetStart = A[a1] + room / 2;
      const curStart = moving[a0];
      const d = targetStart - curStart;
      if (Math.abs(d) <= tol && (best == null || Math.abs(d) < Math.abs(best.delta))) {
        const mid = (A[a1] + B[a0]) / 2;
        best = {
          delta: d,
          guides: [
            { axis, pos: A[a1], kind: "spacing" },
            { axis, pos: mid, kind: "spacing" },
            { axis, pos: B[a0], kind: "spacing" }
          ]
        };
      }
    }
  }
  return best;
}

/**
 * Snap a proposed bounds position against siblings + slide.
 * @param {object} proposed - bounds after unconstrained move
 * @param {object[]} siblings
 * @param {DOMRect} stageRect
 * @param {boolean} disableSnap - Alt/Option held
 * @returns {SnapResult & { left:number, top:number }}
 */
export function snapBounds(proposed, siblings, stageRect, disableSnap) {
  if (disableSnap) {
    return { x: proposed.left, y: proposed.top, left: proposed.left, top: proposed.top, guides: [] };
  }
  const tx = tolPct(stageRect, "x");
  const ty = tolPct(stageRect, "y");
  let dx = 0, dy = 0;
  /** @type {GuideLine[]} */
  const guides = [];
  let bestX = null, bestY = null;

  const movingEdges = edgesOf(proposed);
  siblings.forEach(sib => {
    edgesOf(sib).forEach(se => {
      movingEdges.forEach(me => {
        if (me.axis !== se.axis) return;
        const d = se.pos - me.pos;
        const tol = me.axis === "x" ? tx : ty;
        if (Math.abs(d) > tol) return;
        if (me.axis === "x") {
          if (bestX == null || Math.abs(d) < Math.abs(bestX.d)) {
            bestX = { d, pos: se.pos };
          }
        } else {
          if (bestY == null || Math.abs(d) < Math.abs(bestY.d)) {
            bestY = { d, pos: se.pos };
          }
        }
      });
    });
  });

  if (bestX) {
    dx = bestX.d;
    guides.push({ axis: "x", pos: bestX.pos, kind: "align" });
  }
  if (bestY) {
    dy = bestY.d;
    guides.push({ axis: "y", pos: bestY.pos, kind: "align" });
  }

  const after = {
    left: proposed.left + dx,
    top: proposed.top + dy,
    right: proposed.right + dx,
    bottom: proposed.bottom + dy,
    cx: proposed.cx + dx,
    cy: proposed.cy + dy,
    w: proposed.w,
    h: proposed.h
  };

  // Equal spacing (may override dx/dy if closer)
  const sx = equalSpacingDelta(after, siblings, "x", tx);
  if (sx && (bestX == null || Math.abs(sx.delta) <= Math.abs(bestX.d))) {
    dx += sx.delta;
    after.left += sx.delta; after.right += sx.delta; after.cx += sx.delta;
    guides.push(...sx.guides);
  }
  const sy = equalSpacingDelta(after, siblings, "y", ty);
  if (sy && (bestY == null || Math.abs(sy.delta) <= Math.abs(bestY.d))) {
    dy += sy.delta;
    after.top += sy.delta; after.bottom += sy.delta; after.cy += sy.delta;
    guides.push(...sy.guides);
  }

  // Slide center crosshair when snapped to 50/50
  if (guides.some(g => g.axis === "x" && Math.abs(g.pos - 50) < 0.01)) {
    guides.push({ axis: "y", pos: 50, kind: "cross" });
  }
  if (guides.some(g => g.axis === "y" && Math.abs(g.pos - 50) < 0.01)) {
    guides.push({ axis: "x", pos: 50, kind: "cross" });
  }

  // Dedupe guide lines
  const seen = new Set();
  const uniq = [];
  guides.forEach(g => {
    const k = g.axis + ":" + g.pos.toFixed(2);
    if (seen.has(k)) return;
    seen.add(k);
    uniq.push(g);
  });

  return { x: after.left, y: after.top, left: after.left, top: after.top, guides: uniq };
}

/**
 * Live DOM helper: measure element, apply delta, snap, return new top-left % and guides.
 */
export function snapElementMove(el, stage, originBounds, dxPct, dyPct, siblings, altKey) {
  const stageRect = stage.getBoundingClientRect();
  const proposed = {
    left: originBounds.left + dxPct,
    top: originBounds.top + dyPct,
    right: originBounds.right + dxPct,
    bottom: originBounds.bottom + dyPct,
    cx: originBounds.cx + dxPct,
    cy: originBounds.cy + dyPct,
    w: originBounds.w,
    h: originBounds.h
  };
  return snapBounds(proposed, siblings, stageRect, !!altKey);
}

/** Draw / clear guide lines on a stage overlay layer. */
export function ensureGuideLayer(stage) {
  let layer = stage.querySelector(":scope > .smart-guides");
  if (!layer) {
    layer = document.createElement("div");
    layer.className = "smart-guides";
    layer.setAttribute("aria-hidden", "true");
    stage.appendChild(layer);
  }
  return layer;
}

/** @param {Element} stage @param {GuideLine[]} lines */
export function drawGuideLines(stage, lines) {
  const layer = ensureGuideLayer(stage);
  while (layer.firstChild) layer.removeChild(layer.firstChild);
  (lines || []).forEach(g => {
    const line = document.createElement("div");
    line.className = "smart-guide " + (g.axis === "x" ? "v" : "h") + (g.kind === "spacing" ? " spacing" : "") + (g.kind === "cross" ? " cross" : "");
    if (g.axis === "x") line.style.left = g.pos + "%";
    else line.style.top = g.pos + "%";
    layer.appendChild(line);
  });
}

export function clearGuideLines(stage) {
  const layer = stage.querySelector(":scope > .smart-guides");
  if (layer) while (layer.firstChild) layer.removeChild(layer.firstChild);
}

export { boundsFromEl };
