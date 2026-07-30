/**
 * Symbol / Component system — reusable masters + slide instances with local overrides.
 * Masters live on project.symbols; instances are shapes with type "symbol".
 */

function clamp(n, lo, hi) {
  n = Number(n);
  if (!isFinite(n)) return lo;
  return Math.max(lo, Math.min(hi, n));
}

function str(v, max) {
  return (typeof v === "string" ? v : "").slice(0, max == null ? 120 : max);
}

function safeHex(c, fallback) {
  return (typeof c === "string" && /^#[0-9a-fA-F]{6}$/.test(c)) ? c.toLowerCase() : (fallback || null);
}

function safeImage(d) {
  return (typeof d === "string" && /^data:image\/[a-zA-Z0-9.+-]+;base64,/.test(d)) ? d : null;
}

function deepClone(o) {
  return JSON.parse(JSON.stringify(o));
}

export function uid(prefix) {
  return (prefix || "sym") + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

/** Bounding box of a set of shapes (slide %). */
export function shapesBounds(shapes) {
  if (!shapes || !shapes.length) return { x: 0, y: 0, w: 20, h: 20 };
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  shapes.forEach(sh => {
    const x2 = sh.x + (sh.w || 0), y2 = sh.y + (sh.h || 0);
    minX = Math.min(minX, sh.x); minY = Math.min(minY, sh.y);
    maxX = Math.max(maxX, x2); maxY = Math.max(maxY, y2);
  });
  return {
    x: minX, y: minY,
    w: Math.max(1, maxX - minX),
    h: Math.max(1, maxY - minY)
  };
}

/** Normalize shapes into 0–100% relative to a bounding box. */
export function toRelativeShapes(shapes, box) {
  const bw = Math.max(0.001, box.w), bh = Math.max(0.001, box.h);
  return shapes.map(sh => {
    const c = deepClone(sh);
    c.x = ((sh.x - box.x) / bw) * 100;
    c.y = ((sh.y - box.y) / bh) * 100;
    c.w = (sh.w / bw) * 100;
    c.h = (sh.h / bh) * 100;
    c.parentId = null; // flatten nesting inside master
    return c;
  });
}

/** Expand relative master shapes into slide % for a placed instance box. */
export function toAbsoluteShapes(relShapes, box) {
  return (relShapes || []).map(sh => {
    const c = deepClone(sh);
    c.id = uid("s");
    c.x = box.x + (sh.x / 100) * box.w;
    c.y = box.y + (sh.y / 100) * box.h;
    c.w = (sh.w / 100) * box.w;
    c.h = (sh.h / 100) * box.h;
    c.parentId = null;
    c._masterId = sh.id; // remember master child id for override mapping on detach
    return c;
  });
}

/** Auto-detect editable component properties from master shapes. */
export function deriveProps(shapes) {
  const props = [];
  (shapes || []).forEach(sh => {
    if (sh.type === "message") {
      props.push({ id: sh.id, kind: "text", label: "Text: " + str(sh.text || "Message", 24), field: "text" });
      props.push({ id: sh.id + ":fill", kind: "color", label: "Text box fill", field: "fill", shapeId: sh.id });
    } else if (sh.type === "frame") {
      props.push({ id: sh.id + ":image", kind: "image", label: "Frame image", field: "image", shapeId: sh.id });
      props.push({ id: sh.id + ":fill", kind: "color", label: "Frame fill", field: "fill", shapeId: sh.id });
    } else if (sh.type === "box" || sh.type === "ellipse" || sh.type === "highlight") {
      props.push({ id: sh.id + ":fill", kind: "color", label: (sh.type === "highlight" ? "Highlight" : "Fill"), field: "fill", shapeId: sh.id });
    } else if (sh.type === "arrow") {
      props.push({ id: sh.id + ":stroke", kind: "color", label: "Arrow colour", field: "stroke", shapeId: sh.id });
    }
  });
  return props.slice(0, 24);
}

export function sanitizeOverrides(raw) {
  const out = {};
  if (!raw || typeof raw !== "object") return out;
  Object.keys(raw).slice(0, 40).forEach(key => {
    const o = raw[key];
    if (!o || typeof o !== "object") return;
    const clean = {};
    if (typeof o.text === "string") clean.text = str(o.text, 300);
    if (safeHex(o.fill)) clean.fill = safeHex(o.fill);
    if (safeHex(o.stroke)) clean.stroke = safeHex(o.stroke);
    if (safeHex(o.textColor)) clean.textColor = safeHex(o.textColor);
    if (o.image === null) clean.image = null;
    else if (safeImage(o.image)) clean.image = safeImage(o.image);
    if (Object.keys(clean).length) out[str(key, 40)] = clean;
  });
  return out;
}

/**
 * Sanitize one symbol master. `sanitizeShapeFn(shapesArray)` should return cleaned shapes
 * (caller passes project sanitizeShapes so we don't duplicate the full schema).
 */
export function sanitizeSymbol(raw, sanitizeShapeFn) {
  if (!raw || typeof raw !== "object") return null;
  const shapesRaw = Array.isArray(raw.shapes) ? raw.shapes : [];
  // Temporarily ensure types are valid; strip symbol instances from masters
  const filtered = shapesRaw.filter(s => s && s.type && s.type !== "symbol").slice(0, 40);
  const shapes = typeof sanitizeShapeFn === "function" ? sanitizeShapeFn(filtered) : filtered;
  // Re-normalize ids preserved from master
  const named = shapes.map((sh, i) => {
    const id = str((filtered[i] && filtered[i].id) || sh.id, 40) || uid("m");
    return Object.assign({}, sh, { id, parentId: null });
  });
  return {
    id: str(raw.id, 40) || uid("sym"),
    name: str(raw.name, 80) || "Symbol",
    w: clamp(raw.w == null ? 28 : raw.w, 4, 100),
    h: clamp(raw.h == null ? 22 : raw.h, 4, 100),
    shapes: named,
    props: Array.isArray(raw.props) && raw.props.length ? raw.props.slice(0, 24).map(p => ({
      id: str(p.id, 48),
      kind: ["text", "color", "image"].includes(p.kind) ? p.kind : "text",
      label: str(p.label, 60) || "Property",
      field: str(p.field, 20) || "text",
      shapeId: str(p.shapeId, 40) || null
    })) : deriveProps(named)
  };
}

export function sanitizeSymbols(raw, sanitizeShapeFn) {
  const out = [];
  if (!Array.isArray(raw)) return out;
  for (const s of raw) {
    const clean = sanitizeSymbol(s, sanitizeShapeFn);
    if (clean && clean.shapes.length) out.push(clean);
  }
  return out.slice(0, 80);
}

export function newSymbolInstance(symbol, x, y) {
  return {
    id: uid("s"),
    type: "symbol",
    symbolId: symbol.id,
    x: x == null ? 36 : x,
    y: y == null ? 30 : y,
    w: symbol.w || 28,
    h: symbol.h || 22,
    rot: 0,
    flipX: false,
    flipY: false,
    parentId: null,
    overrides: {},
    // placeholders so generic paint code is safe if touched
    fill: "#ffffff", stroke: "#94a3b8", strokeWidth: 0, opacity: 1, radius: 0,
    text: "", textColor: "#1b1f2a"
  };
}

/**
 * Build the list of shapes to capture into a master from a selected shape + slide shapes.
 * Frame → frame + children; otherwise just the shape.
 */
export function collectForSymbol(selected, allShapes) {
  if (!selected) return null;
  if (selected.type === "symbol") return null;
  if (selected.type === "frame") {
    const kids = (allShapes || []).filter(s => s.parentId === selected.id && s.type !== "symbol");
    return [selected].concat(kids);
  }
  return [selected];
}

/**
 * Create a master from shapes on the slide and return { master, instance, removeIds }.
 */
export function createSymbolFromShapes(shapes, name) {
  if (!shapes || !shapes.length) return null;
  const box = shapesBounds(shapes);
  const rel = toRelativeShapes(shapes, box);
  // Preserve original ids in relative copies for stable props
  shapes.forEach((orig, i) => { rel[i].id = orig.id; });
  const master = {
    id: uid("sym"),
    name: str(name, 80) || "Symbol",
    w: clamp(box.w, 4, 100),
    h: clamp(box.h, 4, 100),
    shapes: rel,
    props: deriveProps(rel)
  };
  const instance = newSymbolInstance(master, box.x, box.y);
  instance.w = box.w;
  instance.h = box.h;
  return { master, instance, removeIds: shapes.map(s => s.id), box };
}

/** Apply instance overrides onto a cloned master child. */
export function applyOverrides(child, overrides) {
  if (!overrides || !child) return child;
  const byId = overrides[child.id];
  if (byId) Object.assign(child, byId);
  // Also support composite keys used for color props (id:fill)
  Object.keys(overrides).forEach(key => {
    if (!key.startsWith(child.id + ":")) return;
    const o = overrides[key];
    if (!o) return;
    if (o.fill) child.fill = o.fill;
    if (o.stroke) child.stroke = o.stroke;
    if (o.image !== undefined) child.image = o.image;
    if (o.text != null) child.text = o.text;
    if (o.textColor) child.textColor = o.textColor;
  });
  return child;
}

/** Resolve master children with overrides applied (still relative %). */
export function resolveInstanceChildren(master, instance) {
  if (!master || !master.shapes) return [];
  const ov = (instance && instance.overrides) || {};
  return master.shapes.map(sh => applyOverrides(deepClone(sh), ov));
}

/**
 * Detach: turn an instance into absolute shapes on the slide.
 * Returns { shapes, removeId }.
 */
export function detachInstance(master, instance) {
  if (!master || !instance) return null;
  const children = resolveInstanceChildren(master, instance);
  const abs = toAbsoluteShapes(children, {
    x: instance.x, y: instance.y, w: instance.w, h: instance.h
  });
  abs.forEach(sh => { delete sh._masterId; });
  return { shapes: abs, removeId: instance.id };
}

/** Find master by id. */
export function symbolById(symbols, id) {
  return (symbols || []).find(s => s.id === id) || null;
}

/**
 * Set an override value for a prop definition on an instance.
 */
export function setPropOverride(instance, prop, value) {
  if (!instance.overrides) instance.overrides = {};
  const shapeId = prop.shapeId || prop.id;
  const key = prop.kind === "text" && prop.field === "text" ? shapeId : (prop.id || shapeId + ":" + prop.field);
  if (!instance.overrides[key]) instance.overrides[key] = {};
  if (prop.kind === "text") instance.overrides[key].text = str(value, 300);
  else if (prop.kind === "color") instance.overrides[key][prop.field || "fill"] = safeHex(value, "#6c5ce7");
  else if (prop.kind === "image") instance.overrides[key].image = value ? safeImage(value) : null;
  return instance;
}

export function getPropOverrideValue(master, instance, prop) {
  const children = resolveInstanceChildren(master, instance);
  const shapeId = prop.shapeId || prop.id;
  const sh = children.find(c => c.id === shapeId);
  if (!sh) return "";
  if (prop.kind === "text") return sh.text || "";
  if (prop.kind === "color") return sh[prop.field || "fill"] || "#6c5ce7";
  if (prop.kind === "image") return sh.image || null;
  return "";
}
