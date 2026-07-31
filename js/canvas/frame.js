/**
 * Image holder helpers (internal type id: "frame").
 * Masks images; nested children (parentId) and auto-layout are schema-ready.
 */

export const FRAME_LAYOUTS = ["none", "vstack", "hstack", "grid"];

export function newFrameShape(x, y, w, h) {
  return {
    id: "f" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    type: "frame",
    x, y, w, h,
    rot: 0, flipX: false, flipY: false,
    fill: "#ffffff", stroke: "#94a3b8", strokeWidth: 1, opacity: 1,
    radius: 8, text: "", textColor: "#1b1f2a",
    image: null,
    imageFit: "cover",
    layout: "none",
    padding: 4,
    parentId: null
  };
}

export function applyFrameVisual(el, sh) {
  el.style.overflow = "hidden";
  el.style.background = sh.fill || "#ffffff";
  el.style.border = (sh.strokeWidth > 0 ? sh.strokeWidth + "px solid " + (sh.stroke || "#94a3b8") : "1px dashed #94a3b8");
  el.style.borderRadius = (sh.radius || 0) + "px";
  el.style.opacity = sh.opacity == null ? 1 : sh.opacity;
  // Clear prior media / placeholder
  const prevImg = el.querySelector(":scope > .frame-img");
  if (prevImg) prevImg.remove();
  const prevPh = el.querySelector(":scope > .frame-ph");
  if (prevPh) prevPh.remove();
  if (sh.image) {
    const img = document.createElement("img");
    img.className = "frame-img";
    img.src = sh.image;
    img.alt = "";
    img.draggable = false;
    img.style.objectFit = sh.imageFit === "contain" ? "contain" : sh.imageFit === "fill" ? "fill" : "cover";
    el.appendChild(img);
  } else {
    const ph = document.createElement("div");
    ph.className = "frame-ph";
    ph.textContent = "Image holder";
    el.appendChild(ph);
  }
}

/** Reflow children inside a frame (vstack / hstack). Mutates child x/y/w/h. */
export function reflowFrameChildren(frame, children) {
  const layout = FRAME_LAYOUTS.includes(frame.layout) ? frame.layout : "none";
  if (layout === "none" || !children.length) return;
  const pad = Number(frame.padding) || 4;
  const innerW = Math.max(1, frame.w - pad * 2);
  const innerH = Math.max(1, frame.h - pad * 2);
  const n = children.length;
  const gap = 2;

  if (layout === "vstack") {
    const h = (innerH - gap * (n - 1)) / n;
    children.forEach((ch, i) => {
      ch.x = frame.x + pad;
      ch.y = frame.y + pad + i * (h + gap);
      ch.w = innerW;
      ch.h = Math.max(2, h);
    });
  } else if (layout === "hstack") {
    const w = (innerW - gap * (n - 1)) / n;
    children.forEach((ch, i) => {
      ch.x = frame.x + pad + i * (w + gap);
      ch.y = frame.y + pad;
      ch.w = Math.max(2, w);
      ch.h = innerH;
    });
  } else if (layout === "grid") {
    const cols = Math.ceil(Math.sqrt(n));
    const rows = Math.ceil(n / cols);
    const cw = (innerW - gap * (cols - 1)) / cols;
    const rh = (innerH - gap * (rows - 1)) / rows;
    children.forEach((ch, i) => {
      const c = i % cols, r = Math.floor(i / cols);
      ch.x = frame.x + pad + c * (cw + gap);
      ch.y = frame.y + pad + r * (rh + gap);
      ch.w = Math.max(2, cw);
      ch.h = Math.max(2, rh);
    });
  }
}
