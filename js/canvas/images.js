/**
 * Image helpers — shrink large uploads and apply look presets (CSS filters).
 * Keeps exports smaller and offline-friendly.
 */

export const LOOK_PRESETS = [
  { id: "none", label: "Original" },
  { id: "bw", label: "Black & white" },
  { id: "sepia", label: "Sepia" },
  { id: "warm", label: "Warm" },
  { id: "cool", label: "Cool" },
  { id: "vivid", label: "Vivid" },
  { id: "soft", label: "Soft" },
  { id: "drama", label: "Dramatic" },
  { id: "fade", label: "Faded" },
  { id: "sharp", label: "Crisp" }
];

function clamp(n, lo, hi) {
  n = Number(n);
  if (!isFinite(n)) return lo;
  return Math.max(lo, Math.min(hi, n));
}

export function defaultImageLook() {
  return {
    brightness: 100,
    contrast: 100,
    saturate: 100,
    warmth: 0,
    look: "none"
  };
}

export function sanitizeImageLook(raw) {
  const d = defaultImageLook();
  raw = raw || {};
  const look = LOOK_PRESETS.some(p => p.id === raw.look) ? raw.look : "none";
  return {
    brightness: clamp(raw.brightness == null ? d.brightness : raw.brightness, 40, 160),
    contrast: clamp(raw.contrast == null ? d.contrast : raw.contrast, 40, 160),
    saturate: clamp(raw.saturate == null ? d.saturate : raw.saturate, 0, 200),
    warmth: clamp(raw.warmth == null ? d.warmth : raw.warmth, -40, 40),
    look
  };
}

/** Build a CSS filter string from look settings. */
export function imageLookCss(look) {
  const L = sanitizeImageLook(look);
  const parts = [
    "brightness(" + (L.brightness / 100) + ")",
    "contrast(" + (L.contrast / 100) + ")",
    "saturate(" + (L.saturate / 100) + ")"
  ];
  if (L.warmth > 0) parts.push("sepia(" + (L.warmth / 100) + ")");
  if (L.warmth < 0) parts.push("hue-rotate(" + Math.round(L.warmth * 1.2) + "deg)");

  switch (L.look) {
    case "bw": parts.push("grayscale(1)"); break;
    case "sepia": parts.push("sepia(.85)"); break;
    case "warm": parts.push("sepia(.35)", "saturate(1.15)"); break;
    case "cool": parts.push("hue-rotate(195deg)", "saturate(1.05)"); break;
    case "vivid": parts.push("saturate(1.55)", "contrast(1.1)"); break;
    case "soft": parts.push("contrast(.9)", "brightness(1.05)"); break;
    case "drama": parts.push("contrast(1.35)", "saturate(1.2)"); break;
    case "fade": parts.push("contrast(.85)", "brightness(1.08)", "saturate(.85)"); break;
    case "sharp": parts.push("contrast(1.2)"); break;
    default: break;
  }
  return parts.join(" ");
}

/**
 * Shrink a data-URL image so exports stay manageable.
 * @param {string} dataUrl
 * @param {{ maxEdge?: number, quality?: number }} [opts]
 * @returns {Promise<string>}
 */
export function compressImageDataUrl(dataUrl, opts) {
  const maxEdge = (opts && opts.maxEdge) || 1600;
  const quality = (opts && opts.quality) || 0.82;
  return new Promise((resolve) => {
    if (typeof dataUrl !== "string" || dataUrl.indexOf("data:image/") !== 0) {
      resolve(dataUrl); return;
    }
    // Keep SVG / GIF as-is (animation / vectors)
    if (/^data:image\/(svg\+xml|gif)/i.test(dataUrl)) { resolve(dataUrl); return; }
    const img = new Image();
    img.onload = () => {
      let w = img.naturalWidth || img.width;
      let h = img.naturalHeight || img.height;
      if (!w || !h) { resolve(dataUrl); return; }
      const edge = Math.max(w, h);
      if (edge <= maxEdge && dataUrl.length < 900000) { resolve(dataUrl); return; }
      const scale = Math.min(1, maxEdge / edge);
      w = Math.max(1, Math.round(w * scale));
      h = Math.max(1, Math.round(h * scale));
      const cv = document.createElement("canvas");
      cv.width = w; cv.height = h;
      const ctx = cv.getContext("2d");
      if (!ctx) { resolve(dataUrl); return; }
      ctx.drawImage(img, 0, 0, w, h);
      let out;
      try {
        out = cv.toDataURL("image/jpeg", quality);
      } catch (e) {
        resolve(dataUrl); return;
      }
      // Prefer compressed only if smaller
      resolve(out && out.length < dataUrl.length ? out : dataUrl);
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

/** Human-readable size for a data URL. */
export function dataUrlSizeLabel(dataUrl) {
  if (typeof dataUrl !== "string") return "";
  const bytes = Math.round(dataUrl.length * 0.75);
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}
