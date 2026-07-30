/**
 * Percent-space geometry helpers for canvas objects.
 * Bounds are { left, top, right, bottom, cx, cy, w, h } in % of the stage.
 */

/** @param {DOMRect} stageRect @param {DOMRect} elRect */
export function boundsFromRects(stageRect, elRect) {
  const left = ((elRect.left - stageRect.left) / stageRect.width) * 100;
  const top = ((elRect.top - stageRect.top) / stageRect.height) * 100;
  const right = ((elRect.right - stageRect.left) / stageRect.width) * 100;
  const bottom = ((elRect.bottom - stageRect.top) / stageRect.height) * 100;
  return {
    left, top, right, bottom,
    cx: (left + right) / 2,
    cy: (top + bottom) / 2,
    w: right - left,
    h: bottom - top
  };
}

/** @param {Element} el @param {Element} stage */
export function boundsFromEl(el, stage) {
  return boundsFromRects(stage.getBoundingClientRect(), el.getBoundingClientRect());
}

/** Shape / overlay model bounds (overlays may omit h — pass measuredH). */
export function boundsFromModel(obj, measuredH) {
  const w = Number(obj.w) || 0;
  const h = measuredH != null ? measuredH : (Number(obj.h) || 0);
  const left = Number(obj.x) || 0;
  const top = Number(obj.y) || 0;
  return {
    left, top,
    right: left + w,
    bottom: top + h,
    cx: left + w / 2,
    cy: top + h / 2,
    w, h
  };
}

/** Hotspot as a small box around its center point. */
export function boundsFromHotspot(h, stageRect) {
  const sizePctX = ((h.size || 30) / stageRect.width) * 100;
  const sizePctY = ((h.size || 30) / stageRect.height) * 100;
  const cx = Number(h.x) || 0;
  const cy = Number(h.y) || 0;
  return {
    left: cx - sizePctX / 2,
    top: cy - sizePctY / 2,
    right: cx + sizePctX / 2,
    bottom: cy + sizePctY / 2,
    cx, cy,
    w: sizePctX,
    h: sizePctY
  };
}

export function slideBounds() {
  return { left: 0, top: 0, right: 100, bottom: 100, cx: 50, cy: 50, w: 100, h: 100, slide: true };
}

/**
 * Collect sibling bounds from live DOM (preferred during drag).
 * @param {Element} stage
 * @param {Element} excludeEl
 * @param {{guides?: Array<{axis:string,pos:number}>}} [opts]
 */
export function collectSiblingBounds(stage, excludeEl, opts) {
  const out = [slideBounds()];
  stage.querySelectorAll(".shape, .ov, .marker").forEach(el => {
    if (el === excludeEl || (excludeEl && el.contains(excludeEl))) return;
    if (excludeEl && excludeEl.contains && excludeEl.contains(el)) return;
    out.push(boundsFromEl(el, stage));
  });
  const guides = (opts && opts.guides) || [];
  guides.forEach(g => {
    if (g.axis === "x") out.push({ left: g.pos, right: g.pos, cx: g.pos, top: 0, bottom: 100, cy: 50, w: 0, h: 100, guide: true });
    else out.push({ top: g.pos, bottom: g.pos, cy: g.pos, left: 0, right: 100, cx: 50, w: 100, h: 0, guide: true });
  });
  return out;
}
