/**
 * Shape fill gradients + visual effects (shadow, glow, blur, blend).
 * Applied in editor and baked into exported HTML via inline styles.
 */

import { safeHex, hexToRgba, resolveColorVar, COLOR_VARS } from "./color.js";

export const FILL_MODES = ["solid", "linear", "radial", "conic", "diamond"];
export const BLEND_MODES = [
  "normal", "multiply", "screen", "overlay", "soft-light", "hard-light",
  "color-burn", "color-dodge", "difference", "exclusion", "hue", "saturation", "color", "luminosity"
];

export const GRADIENT_PRESETS = [
  { label: "Sunset", mode: "linear", angle: 135, stops: [{ o: 0, c: "#f97316" }, { o: 1, c: "#db2777" }] },
  { label: "Ocean", mode: "linear", angle: 160, stops: [{ o: 0, c: "#0ea5e9" }, { o: 1, c: "#0369a1" }] },
  { label: "Forest", mode: "linear", angle: 145, stops: [{ o: 0, c: "#22c55e" }, { o: 1, c: "#14532d" }] },
  { label: "Lavender", mode: "linear", angle: 120, stops: [{ o: 0, c: "#a78bfa" }, { o: 1, c: "#6c5ce7" }] },
  { label: "Ember", mode: "radial", angle: 0, stops: [{ o: 0, c: "#fde68a" }, { o: 1, c: "#b91c1c" }] },
  { label: "Mint", mode: "radial", angle: 0, stops: [{ o: 0, c: "#a7f3d0" }, { o: 1, c: "#0f766e" }] },
  { label: "Midnight", mode: "linear", angle: 180, stops: [{ o: 0, c: "#0f172a" }, { o: 1, c: "#312e81" }] },
  { label: "Candy", mode: "conic", angle: 0, stops: [{ o: 0, c: "#f472b6" }, { o: 0.5, c: "#38bdf8" }, { o: 1, c: "#f472b6" }] },
  { label: "Gold", mode: "linear", angle: 90, stops: [{ o: 0, c: "#fef3c7" }, { o: 1, c: "#b45309" }] },
  { label: "Slate", mode: "linear", angle: 135, stops: [{ o: 0, c: "#e2e8f0" }, { o: 1, c: "#475569" }] },
  { label: "Rose", mode: "diamond", angle: 0, stops: [{ o: 0, c: "#ffe4e6" }, { o: 1, c: "#be123c" }] },
  { label: "Aurora", mode: "linear", angle: 200, stops: [{ o: 0, c: "#22d3ee" }, { o: 0.5, c: "#a78bfa" }, { o: 1, c: "#f472b6" }] }
];

function clamp(n, lo, hi) {
  n = Number(n);
  if (!isFinite(n)) return lo;
  return Math.max(lo, Math.min(hi, n));
}

export function defaultEffects() {
  return {
    fillMode: "solid",
    fillStops: [{ o: 0, c: "#6c5ce7" }, { o: 1, c: "#0ea5e9" }],
    fillAngle: 135,
    fillVar: null,
    strokeVar: null,
    objOpacity: 1,
    shadowOn: false, shadowX: 0, shadowY: 4, shadowBlur: 12, shadowSpread: 0,
    shadowColor: "#000000", shadowOpacity: 0.35, shadowInset: false,
    glowOn: false, glowColor: "#6c5ce7", glowBlur: 16, glowSpread: 0, glowOpacity: 0.55,
    blur: 0,
    backdropBlur: 0,
    blendMode: "normal",
    radiiLinked: true,
    radiusTL: 6, radiusTR: 6, radiusBR: 6, radiusBL: 6
  };
}

export function sanitizeStops(raw, fallbackFill) {
  const fb = safeHex(fallbackFill, "#6c5ce7");
  if (!Array.isArray(raw) || !raw.length) {
    return [{ o: 0, c: fb }, { o: 1, c: safeHex(null, "#0ea5e9") }];
  }
  return raw.slice(0, 8).map((s, i) => ({
    o: clamp(s && s.o != null ? s.o : (i / Math.max(1, raw.length - 1)), 0, 1),
    c: safeHex(s && (s.c || s.color), fb)
  })).sort((a, b) => a.o - b.o);
}

export function sanitizeEffects(sh) {
  const d = defaultEffects();
  sh = sh || {};
  const mode = FILL_MODES.includes(sh.fillMode) ? sh.fillMode : "solid";
  const blend = BLEND_MODES.includes(sh.blendMode) ? sh.blendMode : "normal";
  const linked = sh.radiiLinked == null ? true : !!sh.radiiLinked;
  const baseR = clamp(sh.radius == null ? 6 : sh.radius, 0, 200);
  return {
    fillMode: mode,
    fillStops: sanitizeStops(sh.fillStops, sh.fill),
    fillAngle: clamp(sh.fillAngle == null ? 135 : sh.fillAngle, 0, 360),
    fillVar: COLOR_VARS.includes(sh.fillVar) ? sh.fillVar : null,
    strokeVar: COLOR_VARS.includes(sh.strokeVar) ? sh.strokeVar : null,
    objOpacity: clamp(sh.objOpacity == null ? 1 : sh.objOpacity, 0, 1),
    shadowOn: !!sh.shadowOn,
    shadowX: clamp(sh.shadowX == null ? 0 : sh.shadowX, -50, 50),
    shadowY: clamp(sh.shadowY == null ? 4 : sh.shadowY, -50, 50),
    shadowBlur: clamp(sh.shadowBlur == null ? 12 : sh.shadowBlur, 0, 80),
    shadowSpread: clamp(sh.shadowSpread == null ? 0 : sh.shadowSpread, -20, 40),
    shadowColor: safeHex(sh.shadowColor, "#000000"),
    shadowOpacity: clamp(sh.shadowOpacity == null ? 0.35 : sh.shadowOpacity, 0, 1),
    shadowInset: !!sh.shadowInset,
    glowOn: !!sh.glowOn,
    glowColor: safeHex(sh.glowColor, "#6c5ce7"),
    glowBlur: clamp(sh.glowBlur == null ? 16 : sh.glowBlur, 0, 80),
    glowSpread: clamp(sh.glowSpread == null ? 0 : sh.glowSpread, 0, 40),
    glowOpacity: clamp(sh.glowOpacity == null ? 0.55 : sh.glowOpacity, 0, 1),
    blur: clamp(sh.blur == null ? 0 : sh.blur, 0, 40),
    backdropBlur: clamp(sh.backdropBlur == null ? 0 : sh.backdropBlur, 0, 40),
    blendMode: blend,
    radiiLinked: linked,
    radiusTL: clamp(sh.radiusTL == null ? baseR : sh.radiusTL, 0, 200),
    radiusTR: clamp(sh.radiusTR == null ? baseR : sh.radiusTR, 0, 200),
    radiusBR: clamp(sh.radiusBR == null ? baseR : sh.radiusBR, 0, 200),
    radiusBL: clamp(sh.radiusBL == null ? baseR : sh.radiusBL, 0, 200)
  };
}

function stopsCss(stops) {
  return stops.map(s => s.c + " " + Math.round(s.o * 100) + "%").join(", ");
}

/** Build CSS background for fill (solid or gradient). */
export function fillBackgroundCss(sh, brand) {
  const solid = resolveShapeColor(sh, "fill", brand);
  const mode = FILL_MODES.includes(sh.fillMode) ? sh.fillMode : "solid";
  if (mode === "solid") return solid;
  const stops = sanitizeStops(sh.fillStops, solid);
  const ang = sh.fillAngle == null ? 135 : sh.fillAngle;
  if (mode === "linear") return "linear-gradient(" + ang + "deg, " + stopsCss(stops) + ")";
  if (mode === "radial") return "radial-gradient(circle at center, " + stopsCss(stops) + ")";
  if (mode === "conic") return "conic-gradient(from " + ang + "deg at center, " + stopsCss(stops) + ")";
  if (mode === "diamond") return "radial-gradient(closest-side at center, " + stopsCss(stops) + ")";
  return solid;
}

export function resolveShapeColor(sh, which, brand) {
  const key = which === "stroke" ? sh.strokeVar : sh.fillVar;
  const fallback = which === "stroke" ? sh.stroke : sh.fill;
  if (key) return resolveColorVar(brand, key, fallback);
  return safeHex(fallback, "#6c5ce7");
}

export function cornerRadiusCss(sh) {
  if (sh.type === "ellipse") return "50%";
  const fx = sanitizeEffects(sh);
  if (fx.radiiLinked) {
    const r = sh.radius != null ? sh.radius : fx.radiusTL;
    return r + "px";
  }
  return fx.radiusTL + "px " + fx.radiusTR + "px " + fx.radiusBR + "px " + fx.radiusBL + "px";
}

export function effectsBoxShadow(sh) {
  const fx = sanitizeEffects(sh);
  const parts = [];
  if (fx.shadowOn) {
    parts.push(
      (fx.shadowInset ? "inset " : "") +
      fx.shadowX + "px " + fx.shadowY + "px " + fx.shadowBlur + "px " + fx.shadowSpread + "px " +
      hexToRgba(fx.shadowColor, fx.shadowOpacity)
    );
  }
  if (fx.glowOn) {
    parts.push("0 0 " + fx.glowBlur + "px " + fx.glowSpread + "px " + hexToRgba(fx.glowColor, fx.glowOpacity));
  }
  return parts.join(", ");
}

export function effectsFilter(sh) {
  const fx = sanitizeEffects(sh);
  if (!fx.blur) return "";
  return "blur(" + fx.blur + "px)";
}

export function effectsBackdrop(sh) {
  const fx = sanitizeEffects(sh);
  if (!fx.backdropBlur) return "";
  return "blur(" + fx.backdropBlur + "px)";
}

/**
 * Apply fill + effects styles onto a shape DOM element.
 * @param {HTMLElement} el
 * @param {object} sh
 * @param {object} brand
 * @param {(hex:string,a:number)=>string} hexA - existing project helper for solid fills with opacity
 */
export function applyShapePaint(el, sh, brand, hexA) {
  const fx = sanitizeEffects(Object.assign({}, sh));
  // Sync linked radii back onto radius for simple consumers
  if (fx.radiiLinked) {
    /* keep sh.radius as source of truth when linked */
  }
  const mode = fx.fillMode;
  const fillOp = clamp(sh.opacity == null ? 1 : sh.opacity, 0, 1);

  if (sh.type === "arrow") {
    // stroke-only; paint handled by SVG
  } else if (sh.type === "frame") {
    // frame image handled elsewhere; still allow effects
    if (mode === "solid" || !sh.image) {
      el.style.background = hexA(resolveShapeColor(sh, "fill", brand), fillOp);
    }
  } else if (mode === "solid") {
    el.style.background = hexA(resolveShapeColor(sh, "fill", brand), fillOp);
    el.style.backgroundImage = "";
  } else {
    el.style.backgroundImage = fillBackgroundCss(Object.assign({}, sh, fx), brand);
    el.style.backgroundColor = "transparent";
    el.style.opacity = String(fillOp); // gradient can't use rgba stops easily with fill opacity
  }

  if (sh.type !== "arrow") {
    const stroke = resolveShapeColor(sh, "stroke", brand);
    el.style.border = sh.strokeWidth > 0 ? sh.strokeWidth + "px solid " + stroke : "none";
    el.style.borderRadius = cornerRadiusCss(Object.assign({}, sh, fx));
  }

  const boxShadow = effectsBoxShadow(Object.assign({}, sh, fx));
  if (boxShadow) el.style.boxShadow = boxShadow;
  else el.style.boxShadow = "";

  const filter = effectsFilter(Object.assign({}, sh, fx));
  el.style.filter = filter || "";

  const bd = effectsBackdrop(Object.assign({}, sh, fx));
  el.style.backdropFilter = bd || "";
  el.style.webkitBackdropFilter = bd || "";

  if (fx.blendMode && fx.blendMode !== "normal") el.style.mixBlendMode = fx.blendMode;
  else if (sh.type === "highlight") el.style.mixBlendMode = "multiply";
  else el.style.mixBlendMode = "";

  if (fx.objOpacity < 0.999 && mode === "solid") {
    el.style.opacity = String(fx.objOpacity);
  } else if (mode !== "solid") {
    // already set fillOp above for gradients
  } else {
    el.style.opacity = "";
  }
}

/** Merge effect fields into a shape object for sanitize. */
export function mergeEffectFields(target, sh) {
  const fx = sanitizeEffects(sh);
  Object.assign(target, fx);
  if (fx.radiiLinked) target.radius = clamp(sh.radius == null ? fx.radiusTL : sh.radius, 0, 200);
  return target;
}
