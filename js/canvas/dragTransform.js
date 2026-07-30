/**
 * Unified percent-space drag for canvas objects.
 * Integrates Smart Guides snap (hold Alt/Option to disable).
 */

import { boundsFromEl, collectSiblingBounds } from "./bounds.js";
import { snapElementMove, drawGuideLines, clearGuideLines } from "./smartGuides.js";

function clamp(n, lo, hi) {
  n = Number(n);
  if (!isFinite(n)) return lo;
  return Math.max(lo, Math.min(hi, n));
}

/**
 * Begin a pointer drag that updates obj.x / obj.y in % with smart guides.
 * @param {PointerEvent} e
 * @param {object} opts
 * @param {Element} opts.stage
 * @param {Element} opts.el
 * @param {object} opts.obj - model with x,y
 * @param {'corner'|'center'} [opts.anchor='corner']
 * @param {Array<{axis:string,pos:number}>} [opts.guides]
 * @param {(x:number,y:number)=>void} [opts.onMove]
 * @param {()=>void} [opts.onEnd]
 * @param {number} [opts.minX] @param {number} [opts.maxX]
 * @param {number} [opts.minY] @param {number} [opts.maxY]
 */
export function beginPercentDrag(e, opts) {
  const stage = opts.stage;
  const el = opts.el;
  const obj = opts.obj;
  const anchor = opts.anchor || "corner";
  const minX = opts.minX != null ? opts.minX : -50;
  const maxX = opts.maxX != null ? opts.maxX : 150;
  const minY = opts.minY != null ? opts.minY : -50;
  const maxY = opts.maxY != null ? opts.maxY : 150;

  const rect = stage.getBoundingClientRect();
  const sx = e.clientX, sy = e.clientY;
  const ox = Number(obj.x) || 0, oy = Number(obj.y) || 0;
  const originBounds = boundsFromEl(el, stage);
  const siblings = collectSiblingBounds(stage, el, { guides: opts.guides || [] });

  try { el.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }

  const move = (ev) => {
    const dxPct = ((ev.clientX - sx) / rect.width) * 100;
    const dyPct = ((ev.clientY - sy) / rect.height) * 100;
    const snapped = snapElementMove(el, stage, originBounds, dxPct, dyPct, siblings, ev.altKey);

    if (anchor === "center") {
      // Model x/y is the center; snapped.left/top is the box top-left after snap.
      const cx = snapped.left + originBounds.w / 2;
      const cy = snapped.top + originBounds.h / 2;
      obj.x = clamp(ev.altKey ? ox + dxPct : cx, minX === -50 ? 0 : minX, maxX === 150 ? 100 : maxX);
      obj.y = clamp(ev.altKey ? oy + dyPct : cy, minY === -50 ? 0 : minY, maxY === 150 ? 100 : maxY);
      el.style.left = obj.x + "%";
      el.style.top = obj.y + "%";
    } else {
      obj.x = clamp(ev.altKey ? ox + dxPct : snapped.left, minX, maxX);
      obj.y = clamp(ev.altKey ? oy + dyPct : snapped.top, minY, maxY);
      el.style.left = obj.x + "%";
      el.style.top = obj.y + "%";
    }

    drawGuideLines(stage, ev.altKey ? [] : snapped.guides);
    if (opts.onMove) opts.onMove(obj.x, obj.y);
  };

  const up = () => {
    el.removeEventListener("pointermove", move);
    el.removeEventListener("pointerup", up);
    el.removeEventListener("pointercancel", up);
    clearGuideLines(stage);
    if (opts.onEnd) opts.onEnd();
  };

  el.addEventListener("pointermove", move);
  el.addEventListener("pointerup", up);
  el.addEventListener("pointercancel", up);
}

export { clearGuideLines, drawGuideLines };
