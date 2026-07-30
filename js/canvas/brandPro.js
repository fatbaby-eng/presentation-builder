/**
 * Brand kit pro helpers — colour harmonies + type scale from a base size.
 */

function clamp(n, lo, hi) {
  n = Number(n);
  if (!isFinite(n)) return lo;
  return Math.max(lo, Math.min(hi, n));
}

export function hexToHsl(hex) {
  hex = String(hex || "").replace("#", "");
  if (hex.length !== 6) return { h: 0, s: 0, l: 0.5 };
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s, l };
}

function hue2rgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

export function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360 / 360;
  s = clamp(s, 0, 1); l = clamp(l, 0, 1);
  let r, g, b;
  if (s === 0) r = g = b = l;
  else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const to = x => Math.round(clamp(x, 0, 1) * 255).toString(16).padStart(2, "0");
  return "#" + to(r) + to(g) + to(b);
}

function rotate(hex, deg) {
  const { h, s, l } = hexToHsl(hex);
  return hslToHex(h + deg, s, l);
}

/** Named harmony sets from a primary colour. */
export function colorHarmonies(primary) {
  const p = primary || "#6c5ce7";
  const { h, s, l } = hexToHsl(p);
  return {
    complementary: [p, rotate(p, 180), hslToHex(h, s * 0.7, clamp(l + 0.15, 0.1, 0.9))],
    analogous: [rotate(p, -30), p, rotate(p, 30)],
    triadic: [p, rotate(p, 120), rotate(p, 240)],
    split: [p, rotate(p, 150), rotate(p, 210)]
  };
}

export const TYPE_SCALE_RATIOS = [
  { id: "1.25", label: "Major third (1.25)", value: 1.25 },
  { id: "1.333", label: "Perfect fourth (1.333)", value: 1.333 },
  { id: "1.414", label: "Augmented fourth (1.414)", value: 1.414 },
  { id: "1.5", label: "Perfect fifth (1.5)", value: 1.5 },
  { id: "1.618", label: "Golden ratio (1.618)", value: 1.618 }
];

/**
 * Build brand textStyles from a body base size and ratio.
 */
export function buildTypeScale(baseSize, ratio) {
  baseSize = clamp(baseSize == null ? 16 : baseSize, 10, 28);
  ratio = clamp(ratio == null ? 1.25 : ratio, 1.1, 1.8);
  const body = Math.round(baseSize);
  const h2 = Math.round(body * ratio);
  const h1 = Math.round(body * ratio * ratio);
  const caption = Math.max(10, Math.round(body / ratio));
  const quote = Math.round(body * ratio * 0.95);
  const label = Math.max(10, Math.round(caption * 0.95));
  return {
    h1: { fontRole: "heading", size: h1, weight: 700, lineHeight: 1.15, letterSpacing: -0.5, paraSpacing: 8, align: "left", transform: "none", colorVar: "text" },
    h2: { fontRole: "heading", size: h2, weight: 700, lineHeight: 1.2, letterSpacing: -0.2, paraSpacing: 6, align: "left", transform: "none", colorVar: "text" },
    body: { fontRole: "body", size: body, weight: 400, lineHeight: 1.5, letterSpacing: 0, paraSpacing: 10, align: "left", transform: "none", colorVar: "text" },
    caption: { fontRole: "body", size: caption, weight: 400, lineHeight: 1.4, letterSpacing: 0.2, paraSpacing: 4, align: "left", transform: "none", colorVar: "text" },
    quote: { fontRole: "heading", size: quote, weight: 500, lineHeight: 1.35, letterSpacing: 0, paraSpacing: 12, align: "center", transform: "none", colorVar: "text" },
    label: { fontRole: "body", size: label, weight: 700, lineHeight: 1.3, letterSpacing: 1.2, paraSpacing: 2, align: "left", transform: "uppercase", colorVar: "primary" }
  };
}
