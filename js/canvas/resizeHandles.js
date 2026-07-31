/**
 * Selection resize handles for canvas objects (shapes + overlays).
 * Geometry is percent of the stage; opposite corner stays anchored.
 * Hold Shift to lock aspect ratio (visual / pixel aspect).
 */

function clamp(n, lo, hi) {
  n = Number(n);
  if (!isFinite(n)) return lo;
  return Math.max(lo, Math.min(hi, n));
}

/** @type {Array<{id:string,x:number,y:number,cursor:string}>} */
export const RESIZE_HANDLES = [
  { id: "nw", x: 0, y: 0, cursor: "nwse-resize" },
  { id: "n",  x: 0.5, y: 0, cursor: "ns-resize" },
  { id: "ne", x: 1, y: 0, cursor: "nesw-resize" },
  { id: "e",  x: 1, y: 0.5, cursor: "ew-resize" },
  { id: "se", x: 1, y: 1, cursor: "nwse-resize" },
  { id: "s",  x: 0.5, y: 1, cursor: "ns-resize" },
  { id: "sw", x: 0, y: 1, cursor: "nesw-resize" },
  { id: "w",  x: 0, y: 0.5, cursor: "ew-resize" }
];

/**
 * Apply a local-space resize delta to a percent-box model.
 * @param {object} obj - mutable {x,y,w,h?}
 * @param {{x:number,y:number,w:number,h:number}} start
 * @param {string} handle - nw|n|ne|e|se|s|sw|w
 * @param {number} ldx - local delta X in % of stage width
 * @param {number} ldy - local delta Y in % of stage height
 * @param {object} [opts]
 * @param {boolean} [opts.lockAspect]
 * @param {number} [opts.stageW] - px (for visual aspect)
 * @param {number} [opts.stageH] - px
 * @param {boolean} [opts.widthOnly] - overlays: only mutate w
 * @param {number} [opts.minW=0.5]
 * @param {number} [opts.minH=0.5]
 * @param {number} [opts.maxW=200]
 * @param {number} [opts.maxH=200]
 */
export function applyLocalResize(obj, start, handle, ldx, ldy, opts) {
  opts = opts || {};
  const minW = opts.minW != null ? opts.minW : 0.5;
  const minH = opts.minH != null ? opts.minH : 0.5;
  const maxW = opts.maxW != null ? opts.maxW : 200;
  const maxH = opts.maxH != null ? opts.maxH : 200;
  const affectX = handle.includes("w") || handle.includes("e");
  const affectY = handle.includes("n") || handle.includes("s");
  const fromLeft = handle.includes("w");
  const fromTop = handle.includes("n");

  if (opts.widthOnly) {
    let dw = 0;
    if (handle.includes("e")) dw = ldx;
    else if (handle.includes("w")) dw = -ldx;
    else if (handle === "n" || handle === "s") dw = ldy; // vertical edges → still scale width
    let nw = clamp(start.w + dw, minW, maxW);
    if (fromLeft) obj.x = start.x + start.w - nw;
    obj.w = nw;
    return;
  }

  let nw = start.w;
  let nh = start.h;
  if (affectX) nw = fromLeft ? start.w - ldx : start.w + ldx;
  if (affectY) nh = fromTop ? start.h - ldy : start.h + ldy;

  if (opts.lockAspect && start.w > 0.01 && start.h > 0.01) {
    const stageW = opts.stageW || 1;
    const stageH = opts.stageH || 1;
    const aspect = (start.w * stageW) / (start.h * stageH); // visual w/h
    const isCorner = affectX && affectY;
    if (isCorner) {
      // Prefer the axis with larger absolute change in visual pixels
      const dVisW = Math.abs(nw - start.w) * stageW;
      const dVisH = Math.abs(nh - start.h) * stageH;
      if (dVisW >= dVisH) nh = (nw * stageW) / (aspect * stageH);
      else nw = (nh * stageH * aspect) / stageW;
    } else if (affectX) {
      nh = (nw * stageW) / (aspect * stageH);
    } else if (affectY) {
      nw = (nh * stageH * aspect) / stageW;
    }
  }

  nw = clamp(nw, minW, maxW);
  nh = clamp(nh, minH, maxH);

  // Re-apply aspect after clamp (edge handles grow the free axis)
  if (opts.lockAspect && start.w > 0.01 && start.h > 0.01) {
    const stageW = opts.stageW || 1;
    const stageH = opts.stageH || 1;
    const aspect = (start.w * stageW) / (start.h * stageH);
    if (affectX && !affectY) nh = clamp((nw * stageW) / (aspect * stageH), minH, maxH);
    else if (affectY && !affectX) nw = clamp((nh * stageH * aspect) / stageW, minW, maxW);
  }

  let nx = start.x;
  let ny = start.y;
  if (fromLeft) nx = start.x + start.w - nw;
  else if (opts.lockAspect && !affectX && (handle === "n" || handle === "s")) {
    nx = start.x + (start.w - nw) / 2;
  }
  if (fromTop) ny = start.y + start.h - nh;
  else if (opts.lockAspect && !affectY && (handle === "e" || handle === "w")) {
    ny = start.y + (start.h - nh) / 2;
  }

  obj.x = nx;
  obj.y = ny;
  obj.w = nw;
  obj.h = nh;
}

/**
 * Begin dragging a resize handle.
 * @param {PointerEvent} e
 * @param {object} opts
 * @param {Element} opts.stage
 * @param {Element} opts.el
 * @param {object} opts.obj
 * @param {string} opts.handle
 * @param {boolean} [opts.widthOnly]
 * @param {(obj:object)=>void} [opts.onMove]
 * @param {()=>void} [opts.onEnd]
 */
export function beginPercentResize(e, opts) {
  const stage = opts.stage;
  const el = opts.el;
  const obj = opts.obj;
  const handle = opts.handle;
  const rect = stage.getBoundingClientRect();
  const sx = e.clientX, sy = e.clientY;
  const start = {
    x: Number(obj.x) || 0,
    y: Number(obj.y) || 0,
    w: Number(obj.w) || 1,
    h: Number(obj.h) || 1
  };
  const rad = ((Number(obj.rot) || 0) * Math.PI) / 180;
  const cos = Math.cos(rad), sin = Math.sin(rad);
  const handleEl = e.currentTarget || e.target;

  try { handleEl.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }

  const move = (ev) => {
    const dx = ev.clientX - sx, dy = ev.clientY - sy;
    const ldx = (dx * cos + dy * sin) / rect.width * 100;
    const ldy = (-dx * sin + dy * cos) / rect.height * 100;
    applyLocalResize(obj, start, handle, ldx, ldy, {
      lockAspect: !!ev.shiftKey,
      stageW: rect.width,
      stageH: rect.height,
      widthOnly: !!opts.widthOnly,
      minW: opts.minW,
      minH: opts.minH,
      maxW: opts.maxW,
      maxH: opts.maxH
    });
    el.style.left = obj.x + "%";
    el.style.top = obj.y + "%";
    el.style.width = obj.w + "%";
    if (!opts.widthOnly && obj.h != null) el.style.height = obj.h + "%";
    if (opts.onMove) opts.onMove(obj);
  };

  const up = () => {
    handleEl.removeEventListener("pointermove", move);
    handleEl.removeEventListener("pointerup", up);
    handleEl.removeEventListener("pointercancel", up);
    if (opts.onEnd) opts.onEnd();
  };

  handleEl.addEventListener("pointermove", move);
  handleEl.addEventListener("pointerup", up);
  handleEl.addEventListener("pointercancel", up);
}

/**
 * Attach 8 (or fewer) resize handles to a selected element.
 * @param {Element} el
 * @param {object} opts - same as beginPercentResize plus optional filter
 * @param {string[]} [opts.handles] - subset of handle ids (default all 8)
 */
export function attachResizeHandles(el, opts) {
  const ids = opts.handles || RESIZE_HANDLES.map(h => h.id);
  RESIZE_HANDLES.forEach(def => {
    if (!ids.includes(def.id)) return;
    const h = document.createElement("div");
    h.className = "rh";
    h.dataset.handle = def.id;
    h.title = "Drag to resize · Shift locks proportions";
    h.style.left = (def.x * 100) + "%";
    h.style.top = (def.y * 100) + "%";
    h.style.cursor = def.cursor;
    h.addEventListener("pointerdown", e => {
      e.stopPropagation();
      e.preventDefault();
      beginPercentResize(e, Object.assign({}, opts, { handle: def.id, el }));
    });
    el.appendChild(h);
  });
}

/** True if the event target is a resize handle (or inside one). */
export function isResizeHandleTarget(target) {
  return !!(target && target.closest && target.closest(".rh, .sh, .oh"));
}
