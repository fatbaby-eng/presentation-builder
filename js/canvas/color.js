/**
 * Color engine — HEX/RGB/HSL helpers, brand variables, recent colors, eyedropper.
 * OKLCH is approximated via conversion through sRGB for input/display.
 */

export const COLOR_VARS = ["primary", "secondary", "accent", "text", "bg", "success", "warning", "danger"];
export const COLOR_VAR_LABELS = {
  primary: "Primary", secondary: "Secondary", accent: "Accent", text: "Text",
  bg: "Background", success: "Success", warning: "Warning", danger: "Danger"
};

const RECENT_KEY = "presentationBuilder.recentColors.v1";
const MAX_RECENT = 12;

export function clamp01(n) {
  n = Number(n);
  if (!isFinite(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

export function safeHex(c, fallback) {
  return (typeof c === "string" && /^#[0-9a-fA-F]{6}$/.test(c)) ? c.toLowerCase() : (fallback || "#6c5ce7");
}

export function hexToRgb(hex) {
  const n = parseInt(String(hex).slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
}

export function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  let h = 0, s = 0; const l = (mx + mn) / 2;
  if (mx !== mn) {
    const d = mx - mn;
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    switch (mx) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
      case g: h = ((b - r) / d + 2); break;
      default: h = ((r - g) / d + 4); break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function hslToRgb(h, s, l) {
  h = ((Number(h) % 360) + 360) % 360; s = clamp01(s / 100); l = clamp01(l / 100);
  if (s === 0) {
    const v = Math.round(l * 255);
    return { r: v, g: v, b: v };
  }
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hk = h / 360;
  return {
    r: Math.round(hue2rgb(p, q, hk + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, hk) * 255),
    b: Math.round(hue2rgb(p, q, hk - 1 / 3) * 255)
  };
}

/** Approximate OKLCH display string from hex (not a full OKLab pipeline — good enough for UI). */
export function hexToOklchString(hex) {
  const { r, g, b } = hexToRgb(hex);
  const hsl = rgbToHsl(r, g, b);
  // Map HSL into an OKLCH-like readout for the format field
  const L = (hsl.l / 100).toFixed(3);
  const C = (hsl.s / 100 * 0.4).toFixed(3);
  const H = hsl.h.toFixed(1);
  return `oklch(${L} ${C} ${H})`;
}

export function parseColorInput(raw, fallback) {
  if (typeof raw !== "string") return safeHex(fallback);
  const v = raw.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(v)) return v.toLowerCase();
  if (/^#[0-9a-fA-F]{3}$/.test(v)) {
    return ("#" + v[1] + v[1] + v[2] + v[2] + v[3] + v[3]).toLowerCase();
  }
  let m = v.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (m) return rgbToHex(+m[1], +m[2], +m[3]);
  m = v.match(/^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%/i);
  if (m) {
    const rgb = hslToRgb(+m[1], +m[2], +m[3]);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  }
  m = v.match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/i);
  if (m) {
    // Treat as L C H ≈ map back through HSL approximation
    const L = clamp01(+m[1]) * 100;
    const C = Math.min(1, +m[2] / 0.4) * 100;
    const H = +m[3];
    const rgb = hslToRgb(H, C, L);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  }
  return safeHex(fallback);
}

/** Resolve a brand color variable against a brand object. */
export function resolveColorVar(brand, key, fallback) {
  if (!brand || !COLOR_VARS.includes(key)) return safeHex(fallback);
  if (key === "primary") return safeHex(brand.primary, fallback);
  if (key === "secondary") return safeHex(brand.secondary, fallback);
  if (key === "accent") return safeHex(brand.accent || brand.primary, fallback);
  if (key === "text") return safeHex(brand.text, fallback);
  if (key === "bg") return safeHex(brand.bg, fallback);
  if (key === "success") return safeHex(brand.success, "#16a34a");
  if (key === "warning") return safeHex(brand.warning, "#d97706");
  if (key === "danger") return safeHex(brand.danger, "#e23d4b");
  return safeHex(fallback);
}

export function getRecentColors() {
  try {
    const raw = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
    if (!Array.isArray(raw)) return [];
    return raw.map(c => safeHex(c, null)).filter(Boolean).slice(0, MAX_RECENT);
  } catch (e) { return []; }
}

export function pushRecentColor(hex) {
  const c = safeHex(hex, null);
  if (!c) return getRecentColors();
  const next = [c, ...getRecentColors().filter(x => x !== c)].slice(0, MAX_RECENT);
  try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)); } catch (e) { /* quota */ }
  return next;
}

/** EyeDropper API with graceful fallback (returns null if unavailable/cancelled). */
export async function pickScreenColor() {
  if (typeof window.EyeDropper !== "function") return null;
  try {
    const dropper = new window.EyeDropper();
    const result = await dropper.open();
    return parseColorInput(result.sRGBHex, null);
  } catch (e) {
    return null; // user cancelled or denied
  }
}

export function hexToRgba(hex, a) {
  const { r, g, b } = hexToRgb(safeHex(hex));
  return "rgba(" + r + "," + g + "," + b + "," + clamp01(a) + ")";
}
