/**
 * Per-slide design chrome: grid overlay, rulers, persistent guides.
 */

import { SNAP_TOLERANCE_PX } from "./smartGuides.js";

export const GRID_PRESETS = [
  { id: "12", label: "12 columns", cols: 12 },
  { id: "8", label: "8 columns", cols: 8 },
  { id: "4", label: "4 columns", cols: 4 }
];

/** @returns {{ showGrid:boolean, gridCols:number, showRulers:boolean, showSafe:boolean, guides:Array }} */
export function defaultSlideChrome() {
  return { showGrid: false, gridCols: 12, showRulers: false, showSafe: false, guides: [] };
}

export function sanitizeGuides(raw) {
  const out = [];
  if (!Array.isArray(raw)) return out;
  for (const g of raw) {
    if (!g || typeof g !== "object") continue;
    const axis = g.axis === "y" ? "y" : g.axis === "x" ? "x" : null;
    if (!axis) continue;
    const pos = Number(g.pos);
    if (!isFinite(pos)) continue;
    out.push({
      id: typeof g.id === "string" && g.id ? g.id.slice(0, 40) : ("g" + Math.random().toString(36).slice(2, 8)),
      axis,
      pos: Math.max(0, Math.min(100, pos))
    });
  }
  return out.slice(0, 40);
}

export function sanitizeSlideChrome(stepLike) {
  const d = defaultSlideChrome();
  if (!stepLike || typeof stepLike !== "object") return d;
  return {
    showGrid: !!stepLike.showGrid,
    gridCols: [4, 8, 12].includes(Number(stepLike.gridCols)) ? Number(stepLike.gridCols) : 12,
    showRulers: !!stepLike.showRulers,
    showSafe: !!stepLike.showSafe,
    guides: sanitizeGuides(stepLike.guides)
  };
}

/**
 * Render grid / safe-area / persistent guide overlays inside stage.
 * @param {Element} stage
 * @param {object} chrome - from sanitizeSlideChrome
 */
export function renderChromeOverlays(stage, chrome) {
  // Clear previous chrome (not smart-guides mid-drag)
  stage.querySelectorAll(":scope > .design-grid, :scope > .safe-area, :scope > .persist-guide").forEach(n => n.remove());

  if (chrome.showGrid) {
    const grid = document.createElement("div");
    grid.className = "design-grid";
    grid.setAttribute("aria-hidden", "true");
    grid.style.setProperty("--cols", String(chrome.gridCols || 12));
    // column lines
    const cols = chrome.gridCols || 12;
    for (let i = 1; i < cols; i++) {
      const line = document.createElement("div");
      line.className = "design-grid-line v";
      line.style.left = (i / cols * 100) + "%";
      grid.appendChild(line);
    }
    // baseline rows (~8)
    for (let i = 1; i < 8; i++) {
      const line = document.createElement("div");
      line.className = "design-grid-line h";
      line.style.top = (i / 8 * 100) + "%";
      grid.appendChild(line);
    }
    stage.appendChild(grid);
  }

  if (chrome.showSafe) {
    const safe = document.createElement("div");
    safe.className = "safe-area";
    safe.setAttribute("aria-hidden", "true");
    stage.appendChild(safe);
  }

  (chrome.guides || []).forEach(g => {
    const line = document.createElement("div");
    line.className = "persist-guide " + (g.axis === "x" ? "v" : "h");
    line.dataset.guideId = g.id;
    line.title = "Double-click to remove guide";
    if (g.axis === "x") line.style.left = g.pos + "%";
    else line.style.top = g.pos + "%";
    line.addEventListener("dblclick", e => {
      e.stopPropagation();
      const ev = new CustomEvent("pb-remove-guide", { detail: { id: g.id }, bubbles: true });
      stage.dispatchEvent(ev);
    });
    stage.appendChild(line);
  });
}

/**
 * Mount rulers around a stage wrapper. Returns controller { update, destroy }.
 * @param {HTMLElement} wrap - parent that will contain rulers + stage
 * @param {HTMLElement} stage
 * @param {object} api - { getChrome, setGuide, unit:'%' }
 */
export function mountRulers(wrap, stage, api) {
  wrap.classList.add("has-rulers");
  let hRuler = wrap.querySelector(":scope > .ruler.h");
  let vRuler = wrap.querySelector(":scope > .ruler.v");
  let corner = wrap.querySelector(":scope > .ruler-corner");
  if (!hRuler) {
    corner = document.createElement("div");
    corner.className = "ruler-corner";
    hRuler = document.createElement("div");
    hRuler.className = "ruler h";
    vRuler = document.createElement("div");
    vRuler.className = "ruler v";
    wrap.insertBefore(corner, wrap.firstChild);
    wrap.insertBefore(hRuler, wrap.firstChild);
    wrap.insertBefore(vRuler, wrap.firstChild);
  }

  const paint = (el, vertical) => {
    while (el.firstChild) el.removeChild(el.firstChild);
    for (let i = 0; i <= 10; i++) {
      const tick = document.createElement("div");
      tick.className = "ruler-tick" + (i % 5 === 0 ? " major" : "");
      const pct = i * 10;
      if (vertical) tick.style.top = pct + "%";
      else tick.style.left = pct + "%";
      if (i % 5 === 0) {
        const lab = document.createElement("span");
        lab.textContent = String(pct);
        tick.appendChild(lab);
      }
      el.appendChild(tick);
    }
  };
  paint(hRuler, false);
  paint(vRuler, true);

  const onDragGuide = (axis, e) => {
    e.preventDefault();
    const move = (ev) => {
      const r = stage.getBoundingClientRect();
      let pos;
      if (axis === "x") pos = ((ev.clientX - r.left) / r.width) * 100;
      else pos = ((ev.clientY - r.top) / r.height) * 100;
      pos = Math.max(0, Math.min(100, pos));
      // preview line
      let preview = stage.querySelector(":scope > .guide-preview");
      if (!preview) {
        preview = document.createElement("div");
        preview.className = "guide-preview " + (axis === "x" ? "v" : "h");
        stage.appendChild(preview);
      }
      preview.className = "guide-preview " + (axis === "x" ? "v" : "h");
      if (axis === "x") preview.style.left = pos + "%";
      else preview.style.top = pos + "%";
      preview._pos = pos;
      preview._axis = axis;
    };
    const up = (ev) => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      const preview = stage.querySelector(":scope > .guide-preview");
      if (preview && preview._pos != null && api.setGuide) {
        api.setGuide(preview._axis, preview._pos);
      }
      if (preview) preview.remove();
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    move(e);
  };

  hRuler.onpointerdown = e => onDragGuide("y", e); // horizontal ruler → horizontal guide (constant y)
  vRuler.onpointerdown = e => onDragGuide("x", e);

  return {
    update(visible) {
      wrap.classList.toggle("rulers-on", !!visible);
    },
    destroy() {
      wrap.classList.remove("has-rulers", "rulers-on");
      [hRuler, vRuler, corner].forEach(n => n && n.remove());
    }
  };
}

export { SNAP_TOLERANCE_PX };
