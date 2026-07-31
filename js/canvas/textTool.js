/**
 * Type tool helpers — free text on the slide (vs message boxes).
 * Supports arc text via SVG textPath. Plain language: "Type", "Bend text".
 */

import { resolveShapeTypography, applyTypography } from "./typography.js";

export function isTextualShape(sh) {
  return !!(sh && (sh.type === "text" || sh.type === "message"));
}

export function defaultTypeShape(brand) {
  const textColor = (brand && brand.text) || "#1b1f2a";
  return {
    type: "text",
    fill: "#ffffff",
    stroke: "#ffffff",
    strokeWidth: 0,
    opacity: 0,
    radius: 0,
    text: "Type here",
    textColor,
    textStyle: "h2",
    textArcOn: false,
    textArc: 35,
    textOpacity: 1
  };
}

export function sanitizeTextArc(sh) {
  sh = sh || {};
  let arc = Number(sh.textArc);
  if (!isFinite(arc)) arc = 35;
  arc = Math.max(-100, Math.min(100, arc));
  let top = Number(sh.textOpacity);
  if (!isFinite(top)) top = 1;
  top = Math.max(0, Math.min(1, top));
  return {
    textArcOn: !!sh.textArcOn,
    textArc: arc,
    textOpacity: top
  };
}

function hexA(hex, a) {
  const h = (typeof hex === "string" && /^#[0-9a-fA-F]{6}$/.test(hex)) ? hex : "#1b1f2a";
  const n = parseInt(h.slice(1), 16);
  a = Math.max(0, Math.min(1, Number(a)));
  if (!isFinite(a)) a = 1;
  return "rgba(" + ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + a + ")";
}

/**
 * Build an SVG arc text element filling the shape box (percent-based parent).
 * @param {string} text
 * @param {object} resolved - from resolveShapeTypography
 * @param {number} bend - -100..100
 * @param {number} textOpacity - 0..1
 */
export function buildArcTextSvg(text, resolved, bend, textOpacity) {
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 1000 400");
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  svg.style.cssText = "display:block;width:100%;height:100%;overflow:visible;pointer-events:none";

  const b = Math.max(-100, Math.min(100, Number(bend) || 0));
  // Control point Y: lower = arch up (smaller Y in SVG), higher = smile
  const midY = 200 - (b / 100) * 160;
  const path = document.createElementNS(NS, "path");
  const pid = "arc" + Math.random().toString(36).slice(2, 9);
  path.setAttribute("id", pid);
  path.setAttribute("d", "M 40 " + midY + " Q 500 " + (400 - midY) + " 960 " + midY);
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "none");
  const defs = document.createElementNS(NS, "defs");
  defs.appendChild(path);
  svg.appendChild(defs);

  const t = document.createElementNS(NS, "text");
  t.setAttribute("font-size", String(Math.max(18, Math.min(120, (resolved && resolved.size) || 28) * 2.2)));
  t.setAttribute("font-weight", String((resolved && resolved.weight) || 700));
  t.setAttribute("fill", hexA((resolved && resolved.color) || "#1b1f2a", textOpacity == null ? 1 : textOpacity));
  t.setAttribute("letter-spacing", String(((resolved && resolved.letterSpacing) || 0) * 2));
  if (resolved && resolved.fontFamily) t.setAttribute("font-family", resolved.fontFamily);

  const tp = document.createElementNS(NS, "textPath");
  tp.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#" + pid);
  tp.setAttribute("href", "#" + pid);
  tp.setAttribute("startOffset", "50%");
  tp.setAttribute("text-anchor", "middle");
  let str = String(text || "");
  if (resolved && resolved.transform === "uppercase") str = str.toUpperCase();
  else if (resolved && resolved.transform === "lowercase") str = str.toLowerCase();
  else if (resolved && resolved.transform === "capitalize") {
    str = str.replace(/\b\w/g, c => c.toUpperCase());
  }
  tp.textContent = str;
  t.appendChild(tp);
  svg.appendChild(t);
  return svg;
}

/**
 * Paint textual shape content into a container (editor or export).
 */
export function paintTextualContent(container, sh, brand, fonts, resolveColorVar) {
  if (!container || !sh) return;
  while (container.firstChild) container.removeChild(container.firstChild);

  const arc = sanitizeTextArc(sh);
  const resolved = resolveShapeTypography(sh, brand, resolveColorVar);
  const role = resolved.fontRole === "heading" ? "heading" : "body";
  const key = role === "heading"
    ? (brand && brand.fontHeading) || "system"
    : (brand && brand.fontBody) || "system";
  resolved.fontFamily = (fonts && fonts[key]) || (fonts && fonts.system) || "sans-serif";

  if (arc.textArcOn && Math.abs(arc.textArc) > 2) {
    container.appendChild(buildArcTextSvg(sh.text || "", resolved, arc.textArc, arc.textOpacity));
    return;
  }

  const t = document.createElement("div");
  t.className = "msg-text";
  t.textContent = sh.text || "";
  applyTypography(t, resolved, brand, fonts);
  if (sh.type === "text") {
    t.style.padding = ".15rem .25rem";
    t.style.background = "transparent";
  }
  // Text colour transparency
  if (arc.textOpacity < 0.999) {
    t.style.color = hexA(resolved.color, arc.textOpacity);
  }
  container.appendChild(t);
}
