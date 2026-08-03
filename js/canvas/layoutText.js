/**
 * Layout text on content / plain-text slides (heading, subtitle, bullets, body).
 * These start as flow DOM, then get promoted to absolute % boxes so Select can
 * move and resize them like shapes — without turning them into free Type shapes.
 */

const ROLES = ["accent", "heading", "subhead", "bullets", "body"];

function clamp(n, lo, hi) {
  n = Number(n);
  if (!isFinite(n)) return lo;
  return Math.max(lo, Math.min(hi, n));
}

/** @returns {{x:number,y:number,w:number,h:number,rot:number}|null} */
export function sanitizeLayoutBox(raw) {
  if (!raw || typeof raw !== "object") return null;
  return {
    x: clamp(raw.x, -50, 150),
    y: clamp(raw.y, -50, 150),
    w: clamp(raw.w, 0.5, 200),
    h: clamp(raw.h, 0.5, 200),
    rot: raw.rot == null ? 0 : clamp(raw.rot, -180, 180)
  };
}

/** Sanitize step.layoutBoxes map. */
export function sanitizeLayoutBoxes(raw) {
  if (!raw || typeof raw !== "object") return {};
  const out = {};
  ROLES.forEach(role => {
    const box = sanitizeLayoutBox(raw[role]);
    if (box) out[role] = box;
  });
  return out;
}

/**
 * Map of layout-text elements currently in the stage.
 * @returns {Array<{role:string, el:Element}>}
 */
export function collectLayoutTextEls(stage, step) {
  if (!stage || !step) return [];
  const items = [];
  const accent = stage.querySelector(".accent-bar");
  if (accent) items.push({ role: "accent", el: accent });
  const h = stage.querySelector("h1");
  if (h && (step.heading != null || step.type === "text" || step.type === "content")) {
    items.push({ role: "heading", el: h });
  }
  const sub = stage.querySelector(".sub");
  if (sub) items.push({ role: "subhead", el: sub });
  const ul = stage.querySelector("ul");
  if (ul) items.push({ role: "bullets", el: ul });
  const body = stage.querySelector(".body") || (step.type === "text" ? stage.querySelector("p") : null);
  if (body) items.push({ role: "body", el: body });
  return items;
}

/** Roles the user can select / transform (not chrome like the accent bar). */
export function isSelectableLayoutRole(role) {
  return role === "heading" || role === "subhead" || role === "bullets" || role === "body";
}

/**
 * Measure flow-positioned elements into % boxes relative to stage.
 * Only fills missing roles — existing layoutBoxes win.
 */
export function measureMissingLayoutBoxes(stage, step) {
  if (!stage || !step) return;
  if (!step.layoutBoxes || typeof step.layoutBoxes !== "object") step.layoutBoxes = {};
  const stageRect = stage.getBoundingClientRect();
  if (stageRect.width < 2 || stageRect.height < 2) return;
  collectLayoutTextEls(stage, step).forEach(({ role, el }) => {
    if (step.layoutBoxes[role]) return;
    const r = el.getBoundingClientRect();
    if (r.width < 1 && r.height < 1) return;
    step.layoutBoxes[role] = {
      x: ((r.left - stageRect.left) / stageRect.width) * 100,
      y: ((r.top - stageRect.top) / stageRect.height) * 100,
      w: Math.max(0.5, (r.width / stageRect.width) * 100),
      h: Math.max(0.5, (r.height / stageRect.height) * 100),
      rot: 0
    };
  });
}

/** Apply a stored % box onto an element (absolute positioning). */
export function applyLayoutBoxStyle(el, box) {
  if (!el || !box) return;
  el.style.position = "absolute";
  el.style.left = box.x + "%";
  el.style.top = box.y + "%";
  el.style.width = box.w + "%";
  el.style.height = box.h + "%";
  el.style.margin = "0";
  el.style.maxWidth = "none";
  el.style.boxSizing = "border-box";
  el.style.overflow = "hidden";
  if (box.rot) el.style.transform = "rotate(" + box.rot + "deg)";
  else el.style.transform = "";
}

/**
 * Promote flow layout text to absolute boxes (measure if needed), mark stage layout-free.
 * Does not attach pointer handlers — caller does that for the editor.
 */
export function promoteLayoutText(stage, step) {
  if (!stage || !step) return [];
  measureMissingLayoutBoxes(stage, step);
  stage.classList.add("layout-free");
  const items = collectLayoutTextEls(stage, step);
  items.forEach(({ role, el }) => {
    const box = step.layoutBoxes && step.layoutBoxes[role];
    if (!box) return;
    applyLayoutBoxStyle(el, box);
    el.classList.add("layout-text");
    el.dataset.layoutRole = role;
    if (!isSelectableLayoutRole(role)) {
      el.classList.add("layout-chrome");
      el.style.pointerEvents = "none";
    }
  });
  return items.filter(i => isSelectableLayoutRole(i.role));
}

export { ROLES as LAYOUT_TEXT_ROLES };
