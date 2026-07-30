/**
 * Pro typography — brand text styles + per-shape overrides.
 * Fonts stay web-safe stacks so exports remain offline.
 */

export const TEXT_STYLE_IDS = ["h1", "h2", "body", "caption", "quote", "label"];
export const TEXT_STYLE_LABELS = {
  h1: "Heading 1", h2: "Heading 2", body: "Body",
  caption: "Caption", quote: "Quote", label: "Label"
};
export const TEXT_ALIGNS = ["left", "center", "right", "justify"];
export const TEXT_TRANSFORMS = ["none", "uppercase", "lowercase", "capitalize", "small-caps"];
export const FONT_WEIGHTS = [300, 400, 500, 600, 700, 800];

function clamp(n, lo, hi) {
  n = Number(n);
  if (!isFinite(n)) return lo;
  return Math.max(lo, Math.min(hi, n));
}

function safeHex(c, fallback) {
  return (typeof c === "string" && /^#[0-9a-fA-F]{6}$/.test(c)) ? c.toLowerCase() : (fallback || "#1b1f2a");
}

/** Default brand type scale (px sizes relative to a 16:9 slide). */
export function defaultTextStyles() {
  return {
    h1:      { fontRole: "heading", size: 42, weight: 700, lineHeight: 1.15, letterSpacing: -0.5, paraSpacing: 8, align: "left", transform: "none", colorVar: "text" },
    h2:      { fontRole: "heading", size: 28, weight: 700, lineHeight: 1.2, letterSpacing: -0.2, paraSpacing: 6, align: "left", transform: "none", colorVar: "text" },
    body:    { fontRole: "body", size: 16, weight: 400, lineHeight: 1.5, letterSpacing: 0, paraSpacing: 10, align: "left", transform: "none", colorVar: "text" },
    caption: { fontRole: "body", size: 12, weight: 400, lineHeight: 1.4, letterSpacing: 0.2, paraSpacing: 4, align: "left", transform: "none", colorVar: "text" },
    quote:   { fontRole: "heading", size: 26, weight: 500, lineHeight: 1.35, letterSpacing: 0, paraSpacing: 12, align: "center", transform: "none", colorVar: "text" },
    label:   { fontRole: "body", size: 11, weight: 700, lineHeight: 1.3, letterSpacing: 1.2, paraSpacing: 2, align: "left", transform: "uppercase", colorVar: "primary" }
  };
}

export function sanitizeOneStyle(raw, fallback) {
  const d = fallback || defaultTextStyles().body;
  raw = raw || {};
  return {
    fontRole: raw.fontRole === "heading" ? "heading" : "body",
    size: clamp(raw.size == null ? d.size : raw.size, 8, 120),
    weight: FONT_WEIGHTS.includes(+raw.weight) ? +raw.weight : d.weight,
    lineHeight: clamp(raw.lineHeight == null ? d.lineHeight : raw.lineHeight, 0.8, 3),
    letterSpacing: clamp(raw.letterSpacing == null ? d.letterSpacing : raw.letterSpacing, -4, 20),
    paraSpacing: clamp(raw.paraSpacing == null ? d.paraSpacing : raw.paraSpacing, 0, 80),
    align: TEXT_ALIGNS.includes(raw.align) ? raw.align : d.align,
    transform: TEXT_TRANSFORMS.includes(raw.transform) ? raw.transform : d.transform,
    colorVar: typeof raw.colorVar === "string" ? raw.colorVar : d.colorVar
  };
}

export function sanitizeTextStyles(raw) {
  const base = defaultTextStyles();
  const out = {};
  TEXT_STYLE_IDS.forEach(id => {
    out[id] = sanitizeOneStyle(raw && raw[id], base[id]);
  });
  return out;
}

export function defaultShapeType() {
  return {
    textStyle: "body",
    fontSize: null,
    fontWeight: null,
    lineHeight: null,
    letterSpacing: null,
    paraSpacing: null,
    textAlign: null,
    textTransform: null,
    fontRole: null,
    textIndent: 0,
    columns: 1,
    columnGap: 16,
    textShadowOn: false,
    textShadowX: 0, textShadowY: 1, textShadowBlur: 2,
    textShadowColor: "#000000", textShadowOpacity: 0.35,
    textStrokeOn: false,
    textStrokeColor: "#000000", textStrokeWidth: 1,
    textHighlightOn: false,
    textHighlightColor: "#fef08a", textHighlightPad: 4, textHighlightRadius: 4
  };
}

export function sanitizeShapeType(sh) {
  const d = defaultShapeType();
  sh = sh || {};
  return {
    textStyle: TEXT_STYLE_IDS.includes(sh.textStyle) ? sh.textStyle : (sh.textStyle === null ? null : "body"),
    fontSize: sh.fontSize == null ? null : clamp(sh.fontSize, 8, 120),
    fontWeight: sh.fontWeight == null ? null : (FONT_WEIGHTS.includes(+sh.fontWeight) ? +sh.fontWeight : null),
    lineHeight: sh.lineHeight == null ? null : clamp(sh.lineHeight, 0.8, 3),
    letterSpacing: sh.letterSpacing == null ? null : clamp(sh.letterSpacing, -4, 20),
    paraSpacing: sh.paraSpacing == null ? null : clamp(sh.paraSpacing, 0, 80),
    textAlign: TEXT_ALIGNS.includes(sh.textAlign) ? sh.textAlign : null,
    textTransform: TEXT_TRANSFORMS.includes(sh.textTransform) ? sh.textTransform : null,
    fontRole: sh.fontRole === "heading" || sh.fontRole === "body" ? sh.fontRole : null,
    textIndent: clamp(sh.textIndent == null ? 0 : sh.textIndent, -40, 80),
    columns: clamp(sh.columns == null ? 1 : sh.columns, 1, 4),
    columnGap: clamp(sh.columnGap == null ? 16 : sh.columnGap, 4, 60),
    textShadowOn: !!sh.textShadowOn,
    textShadowX: clamp(sh.textShadowX == null ? 0 : sh.textShadowX, -20, 20),
    textShadowY: clamp(sh.textShadowY == null ? 1 : sh.textShadowY, -20, 20),
    textShadowBlur: clamp(sh.textShadowBlur == null ? 2 : sh.textShadowBlur, 0, 40),
    textShadowColor: safeHex(sh.textShadowColor, "#000000"),
    textShadowOpacity: clamp(sh.textShadowOpacity == null ? 0.35 : sh.textShadowOpacity, 0, 1),
    textStrokeOn: !!sh.textStrokeOn,
    textStrokeColor: safeHex(sh.textStrokeColor, "#000000"),
    textStrokeWidth: clamp(sh.textStrokeWidth == null ? 1 : sh.textStrokeWidth, 0, 8),
    textHighlightOn: !!sh.textHighlightOn,
    textHighlightColor: safeHex(sh.textHighlightColor, "#fef08a"),
    textHighlightPad: clamp(sh.textHighlightPad == null ? 4 : sh.textHighlightPad, 0, 24),
    textHighlightRadius: clamp(sh.textHighlightRadius == null ? 4 : sh.textHighlightRadius, 0, 24)
  };
}

export function mergeTypeFields(target, sh) {
  Object.assign(target, sanitizeShapeType(sh));
  return target;
}

/**
 * Resolve effective typography for a shape (brand style + local overrides).
 * @param {object} sh
 * @param {object} brand
 * @param {(brand:object, key:string, fb:string)=>string} [resolveColor]
 */
export function resolveShapeTypography(sh, brand, resolveColor) {
  const local = sanitizeShapeType(sh);
  const styles = sanitizeTextStyles(brand && brand.textStyles);
  const base = local.textStyle && styles[local.textStyle] ? styles[local.textStyle] : styles.body;
  const colorFb = (sh && sh.textColor) || (brand && brand.text) || "#1b1f2a";
  let color = colorFb;
  if (resolveColor && base.colorVar) {
    color = resolveColor(brand, base.colorVar, colorFb);
  } else if (base.colorVar === "primary" && brand && brand.primary) {
    color = brand.primary;
  } else if (brand && brand.text) {
    color = brand.text;
  }
  // Local textColor always wins when set on the shape
  if (sh && sh.textColor) color = safeHex(sh.textColor, color);

  return {
    fontRole: local.fontRole || base.fontRole,
    size: local.fontSize != null ? local.fontSize : base.size,
    weight: local.fontWeight != null ? local.fontWeight : base.weight,
    lineHeight: local.lineHeight != null ? local.lineHeight : base.lineHeight,
    letterSpacing: local.letterSpacing != null ? local.letterSpacing : base.letterSpacing,
    paraSpacing: local.paraSpacing != null ? local.paraSpacing : base.paraSpacing,
    align: local.textAlign || base.align,
    transform: local.textTransform || base.transform,
    color,
    textIndent: local.textIndent,
    columns: local.columns,
    columnGap: local.columnGap,
    textShadowOn: local.textShadowOn,
    textShadowX: local.textShadowX,
    textShadowY: local.textShadowY,
    textShadowBlur: local.textShadowBlur,
    textShadowColor: local.textShadowColor,
    textShadowOpacity: local.textShadowOpacity,
    textStrokeOn: local.textStrokeOn,
    textStrokeColor: local.textStrokeColor,
    textStrokeWidth: local.textStrokeWidth,
    textHighlightOn: local.textHighlightOn,
    textHighlightColor: local.textHighlightColor,
    textHighlightPad: local.textHighlightPad,
    textHighlightRadius: local.textHighlightRadius
  };
}

function hexA(hex, a) {
  const n = parseInt(String(safeHex(hex)).slice(1), 16);
  return "rgba(" + ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + clamp(a, 0, 1) + ")";
}

/**
 * Apply resolved typography onto a text DOM node (e.g. .msg-text).
 * @param {HTMLElement} el
 * @param {object} resolved - from resolveShapeTypography
 * @param {object} brand
 * @param {Record<string,string>} fonts - font key → CSS stack
 */
export function applyTypography(el, resolved, brand, fonts) {
  if (!el || !resolved) return;
  const role = resolved.fontRole === "heading" ? "heading" : "body";
  const key = role === "heading"
    ? (brand && brand.fontHeading) || "system"
    : (brand && brand.fontBody) || "system";
  const stack = (fonts && fonts[key]) || fonts.system || "sans-serif";
  el.style.fontFamily = stack;
  el.style.fontSize = resolved.size + "px";
  el.style.fontWeight = String(resolved.weight);
  el.style.lineHeight = String(resolved.lineHeight);
  el.style.letterSpacing = resolved.letterSpacing + "px";
  el.style.textAlign = resolved.align;
  el.style.color = resolved.color;
  el.style.margin = "0";
  el.style.padding = ".5rem .6rem";

  if (resolved.transform === "small-caps") {
    el.style.textTransform = "none";
    el.style.fontVariant = "small-caps";
  } else {
    el.style.fontVariant = "";
    el.style.textTransform = resolved.transform === "none" ? "" : resolved.transform;
  }

  el.style.textIndent = resolved.textIndent ? resolved.textIndent + "px" : "";
  if (resolved.columns > 1) {
    el.style.columnCount = String(resolved.columns);
    el.style.columnGap = resolved.columnGap + "px";
  } else {
    el.style.columnCount = "";
    el.style.columnGap = "";
  }

  if (resolved.textShadowOn) {
    el.style.textShadow = resolved.textShadowX + "px " + resolved.textShadowY + "px " +
      resolved.textShadowBlur + "px " + hexA(resolved.textShadowColor, resolved.textShadowOpacity);
  } else {
    el.style.textShadow = "";
  }

  if (resolved.textStrokeOn && resolved.textStrokeWidth > 0) {
    el.style.webkitTextStroke = resolved.textStrokeWidth + "px " + resolved.textStrokeColor;
    el.style.paintOrder = "stroke fill";
  } else {
    el.style.webkitTextStroke = "";
    el.style.paintOrder = "";
  }

  if (resolved.textHighlightOn) {
    el.style.backgroundColor = resolved.textHighlightColor;
    el.style.borderRadius = resolved.textHighlightRadius + "px";
    el.style.padding = resolved.textHighlightPad + "px " + (resolved.textHighlightPad + 2) + "px";
    el.style.display = "inline-block";
    el.style.width = "auto";
    el.style.maxWidth = "100%";
  } else {
    el.style.backgroundColor = "";
    el.style.borderRadius = "";
    el.style.display = "";
    el.style.width = "100%";
    el.style.maxWidth = "";
  }
}

/** Apply a named brand style to a shape (clears local type overrides). */
export function applyStylePreset(sh, styleId) {
  if (!TEXT_STYLE_IDS.includes(styleId)) return sh;
  const d = defaultShapeType();
  Object.assign(sh, d, { textStyle: styleId });
  return sh;
}

/** Map content-slide layout → default style roles. */
export function contentStyleMap(layout) {
  if (layout === "title") return { heading: "h1", subhead: "body", bullets: "body" };
  if (layout === "section") return { heading: "h2", subhead: "caption", bullets: "body" };
  if (layout === "statement") return { heading: "quote", subhead: "label", bullets: "body" };
  return { heading: "h2", subhead: "body", bullets: "body" };
}

/**
 * Apply brand text style onto a content-slide element (h1 / .sub / li).
 */
export function applyContentTypography(root, layout, brand, fonts, resolveColor) {
  if (!root || !brand) return;
  const map = contentStyleMap(layout);
  const styles = sanitizeTextStyles(brand.textStyles);
  const paint = (el, styleId) => {
    if (!el) return;
    const st = styles[styleId] || styles.body;
    const role = st.fontRole === "heading" ? "heading" : "body";
    const key = role === "heading" ? brand.fontHeading : brand.fontBody;
    el.style.fontFamily = (fonts && fonts[key]) || fonts.system;
    el.style.fontSize = "clamp(" + Math.round(st.size * 0.55) + "px, " + (st.size * 0.12) + "vw, " + st.size + "px)";
    el.style.fontWeight = String(st.weight);
    el.style.lineHeight = String(st.lineHeight);
    el.style.letterSpacing = st.letterSpacing + "px";
    if (st.transform === "small-caps") {
      el.style.fontVariant = "small-caps";
      el.style.textTransform = "none";
    } else if (st.transform !== "none") {
      el.style.textTransform = st.transform;
      el.style.fontVariant = "";
    }
    if (resolveColor && st.colorVar && st.colorVar !== "text") {
      el.style.color = resolveColor(brand, st.colorVar, brand.text);
    }
  };
  paint(root.querySelector("h1"), map.heading);
  paint(root.querySelector(".sub"), map.subhead);
  root.querySelectorAll("li").forEach(li => paint(li, map.bullets));
}
