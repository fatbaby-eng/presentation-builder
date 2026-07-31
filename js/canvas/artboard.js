/**
 * Artboard sizes — landscape, portrait, square, and custom.
 * Plain language: "Board size". Content reflows when the board changes.
 */

function clamp(n, lo, hi) {
  n = Number(n);
  if (!isFinite(n)) return lo;
  return Math.max(lo, Math.min(hi, n));
}

/** Standard boards (logical px). Groups help the UI. */
export const ARTBOARD_PRESETS = [
  { id: "16:9", label: "Widescreen 16:9", group: "landscape", w: 1920, h: 1080 },
  { id: "16:10", label: "Laptop 16:10", group: "landscape", w: 1920, h: 1200 },
  { id: "4:3", label: "Classic 4:3", group: "landscape", w: 1600, h: 1200 },
  { id: "21:9", label: "Ultrawide 21:9", group: "landscape", w: 2560, h: 1080 },
  { id: "9:16", label: "Phone 9:16", group: "portrait", w: 1080, h: 1920 },
  { id: "4:5", label: "Social 4:5", group: "portrait", w: 1080, h: 1350 },
  { id: "2:3", label: "Portrait 2:3", group: "portrait", w: 1080, h: 1620 },
  { id: "3:4", label: "Portrait 3:4", group: "portrait", w: 1080, h: 1440 },
  { id: "1:1", label: "Square 1:1", group: "square", w: 1080, h: 1080 },
  { id: "custom", label: "Custom size…", group: "custom", w: 1920, h: 1080 }
];

export function defaultArtboard() {
  return { id: "16:9", w: 1920, h: 1080 };
}

export function sanitizeArtboard(raw) {
  raw = raw || {};
  const preset = ARTBOARD_PRESETS.find(p => p.id === raw.id);
  let id = preset ? preset.id : "custom";
  let w, h;
  if (id !== "custom" && preset) {
    w = preset.w;
    h = preset.h;
  } else {
    id = "custom";
    w = clamp(raw.w == null ? 1920 : raw.w, 320, 7680);
    h = clamp(raw.h == null ? 1080 : raw.h, 320, 7680);
  }
  return { id, w: Math.round(w), h: Math.round(h) };
}

export function artboardAspect(ab) {
  ab = sanitizeArtboard(ab);
  return ab.w / Math.max(1, ab.h);
}

export function artboardLabel(ab) {
  ab = sanitizeArtboard(ab);
  const p = ARTBOARD_PRESETS.find(x => x.id === ab.id && ab.id !== "custom");
  if (p) return p.label;
  return "Custom " + ab.w + "×" + ab.h;
}

/** CSS aspect-ratio value e.g. "16 / 9". */
export function artboardAspectCss(ab) {
  ab = sanitizeArtboard(ab);
  return ab.w + " / " + ab.h;
}

/**
 * Editor display width (px) so portrait boards stay usable on screen.
 */
export function editorBoardWidth(ab, maxWide) {
  ab = sanitizeArtboard(ab);
  maxWide = maxWide || 760;
  const aspect = artboardAspect(ab);
  if (aspect < 1) {
    // Portrait — limit height instead of width
    const maxH = 640;
    return Math.min(maxWide, Math.round(maxH * aspect));
  }
  return maxWide;
}

/**
 * When the board size changes, scale type and fit shapes/overlays so layout
 * stays readable (uniform fit into the new board).
 */
export function reflowProjectForArtboard(project, fromAb, toAb) {
  fromAb = sanitizeArtboard(fromAb);
  toAb = sanitizeArtboard(toAb);
  if (fromAb.w === toAb.w && fromAb.h === toAb.h) return project;

  const fontScale = toAb.h / Math.max(1, fromAb.h);
  const aspectDelta = Math.abs(artboardAspect(fromAb) - artboardAspect(toAb));

  function scaleType(obj) {
    if (!obj || typeof obj !== "object") return;
    if (obj.fontSize != null) obj.fontSize = clamp(Math.round(obj.fontSize * fontScale), 8, 120);
    if (obj.strokeWidth != null && obj.type !== "arrow") {
      obj.strokeWidth = clamp(Math.round(obj.strokeWidth * Math.sqrt(fontScale)), 0, 40);
    }
    if (obj.type === "arrow" && obj.strokeWidth != null) {
      obj.strokeWidth = clamp(Math.round(obj.strokeWidth * fontScale), 1, 40);
    }
    if (obj.radius != null) obj.radius = clamp(Math.round(obj.radius * fontScale), 0, 200);
  }

  (project.steps || []).forEach(step => {
    (step.shapes || []).forEach(scaleType);
    (step.hotspots || []).forEach(h => {
      if (h.size != null) h.size = clamp(Math.round(h.size * fontScale), 14, 80);
    });
    if (aspectDelta > 0.08) {
      fitItemsToBoard(step.shapes || [], fromAb, toAb);
      fitItemsToBoard(step.overlays || [], fromAb, toAb, true);
      fitItemsToBoard(step.redactions || [], fromAb, toAb, true);
    }
  });

  const styles = project.brand && project.brand.textStyles;
  if (styles) {
    Object.keys(styles).forEach(id => {
      const st = styles[id];
      if (st && st.size != null) st.size = clamp(Math.round(st.size * fontScale), 8, 120);
    });
  }
  return project;
}

/**
 * Uniformly fit a list of {x,y,w,h} %-boxes into the new artboard,
 * preserving their relative layout and pixel aspect.
 */
function fitItemsToBoard(items, fromAb, toAb, allowMissingH) {
  if (!items || !items.length) return;
  const ow = fromAb.w, oh = fromAb.h, nw = toAb.w, nh = toAb.h;
  const boxes = [];
  items.forEach(it => {
    if (it == null || it.x == null || it.y == null || it.w == null) return;
    const h = it.h == null ? (allowMissingH ? it.w * (ow / oh) : 0) : it.h;
    if (!h) return;
    boxes.push({
      it,
      x: (it.x / 100) * ow,
      y: (it.y / 100) * oh,
      w: (it.w / 100) * ow,
      h: (h / 100) * oh,
      hadH: it.h != null
    });
  });
  if (!boxes.length) return;

  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  boxes.forEach(b => {
    x0 = Math.min(x0, b.x); y0 = Math.min(y0, b.y);
    x1 = Math.max(x1, b.x + b.w); y1 = Math.max(y1, b.y + b.h);
  });
  const cw = x1 - x0, ch = y1 - y0;
  if (cw < 1 || ch < 1) return;

  const margin = 0.06;
  const availW = nw * (1 - 2 * margin);
  const availH = nh * (1 - 2 * margin);
  const s = Math.min(availW / cw, availH / ch);
  const ox = (nw - cw * s) / 2;
  const oy = (nh - ch * s) / 2;

  boxes.forEach(b => {
    b.it.x = clamp(((b.x - x0) * s + ox) / nw * 100, -20, 120);
    b.it.y = clamp(((b.y - y0) * s + oy) / nh * 100, -20, 120);
    b.it.w = clamp((b.w * s) / nw * 100, 0.5, 200);
    if (b.hadH || !allowMissingH) b.it.h = clamp((b.h * s) / nh * 100, 0.5, 200);
  });
}
