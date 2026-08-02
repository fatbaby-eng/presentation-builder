/**
 * Shared shape / motion helpers for sample demo decks.
 * Keep timing conventions consistent: stagger appear → callouts → attention after appear.
 */

export function mot(appear, delay, duration, extra) {
  return Object.assign({
    appear: appear || "none",
    appearDelay: delay == null ? 0 : delay,
    appearDuration: duration == null ? 0.5 : duration,
    attention: "none",
    attentionDelay: 0.6,
    disappear: "none",
    disappearDelay: 2.5,
    disappearDuration: 0.45,
    easing: "ease-out",
    move: "none",
    moveDelay: 0,
    moveDuration: 0.8,
    moveFromX: 10,
    moveFromY: 40,
    moveToX: 40,
    moveToY: 40
  }, extra || {});
}

export function tx(type, duration) {
  return { type: type || "fade", duration: duration == null ? 0.45 : duration };
}

export function box(opts) {
  return Object.assign({
    type: "box", x: 0, y: 0, w: 20, h: 20, rot: 0, flipX: false, flipY: false,
    fill: "#ffffff", stroke: "#ffffff", strokeWidth: 0, opacity: 1, radius: 10,
    text: "", textColor: "#1b1f2a", parentId: null,
    fillMode: "solid", shadowOn: false, glowOn: false
  }, opts);
}

export function msg(opts) {
  return Object.assign({
    type: "message", x: 0, y: 0, w: 30, h: 12, rot: 0, flipX: false, flipY: false,
    fill: "#fffaf5", stroke: "#d6c7b5", strokeWidth: 1, opacity: 1, radius: 10,
    text: "", textColor: "#1a2332", parentId: null, textStyle: "body",
    fillMode: "solid", shadowOn: true, shadowY: 4, shadowBlur: 10, shadowOpacity: 0.2,
    glowOn: false
  }, opts);
}

export function highlight(opts) {
  return Object.assign({
    type: "highlight", x: 0, y: 0, w: 20, h: 8, rot: 0, flipX: false, flipY: false,
    fill: "#e0a84a", stroke: "#e0a84a", strokeWidth: 0, opacity: 0.35, radius: 4,
    text: "", textColor: "#1b1f2a", parentId: null,
    fillMode: "solid", shadowOn: false, glowOn: false
  }, opts);
}

export function ellipse(opts) {
  return Object.assign({
    type: "ellipse", x: 0, y: 0, w: 4, h: 7, rot: 0, flipX: false, flipY: false,
    fill: "#c9783f", stroke: "#c9783f", strokeWidth: 0, opacity: 1, radius: 0,
    text: "", textColor: "#1b1f2a", parentId: null,
    fillMode: "solid", shadowOn: false, glowOn: false
  }, opts);
}

export function frame(opts) {
  return Object.assign({
    type: "frame", x: 0, y: 0, w: 18, h: 32, rot: 0, flipX: false, flipY: false,
    fill: "#1a2418", stroke: "#3d4f3a", strokeWidth: 0, opacity: 1, radius: 999,
    text: "", textColor: "#1b1f2a", parentId: null,
    image: null, imageFit: "cover", layout: "none", padding: 0,
    fillMode: "solid", shadowOn: true, shadowY: 6, shadowBlur: 16, shadowOpacity: 0.35,
    glowOn: false
  }, opts);
}

export function arrow(opts) {
  return Object.assign({
    type: "arrow", x: 0, y: 0, w: 16, h: 12, rot: 0, flipX: false, flipY: false,
    fill: "#c9a66b", stroke: "#c9a66b", strokeWidth: 3, opacity: 1, radius: 0,
    text: "", textColor: "#1b1f2a", parentId: null, arrowStyle: "solid",
    fillMode: "solid", shadowOn: false, glowOn: false
  }, opts);
}

export function focus(opts) {
  const base = {
    type: "focus", x: 0, y: 0, w: 8, h: 14, rot: 0, flipX: false, flipY: false,
    fill: "#e23d4b", stroke: "#e23d4b", strokeWidth: 3, opacity: 0.08, radius: 0,
    text: "", textColor: "#1b1f2a", parentId: null,
    fillMode: "solid", shadowOn: false, glowOn: false,
    motion: mot("fade", 0.15, 0.35, { attention: "focus-rings", attentionDelay: 0.25 })
  };
  return Object.assign(base, opts || {});
}

export function typeText(opts) {
  return Object.assign({
    type: "text", x: 0, y: 0, w: 28, h: 10, rot: 0, flipX: false, flipY: false,
    fill: "#ffffff", stroke: "#ffffff", strokeWidth: 0, opacity: 0, radius: 0,
    text: "", textColor: "#f0ebe3", parentId: null, textStyle: "h2",
    textArcOn: false, textArc: 35, textOpacity: 1,
    fillMode: "solid", shadowOn: false, glowOn: false
  }, opts);
}

/** Round-looking dots on 9:16 (equal pixels ⇒ w% ≈ h% × 16/9). */
export function phoneDot(opts) {
  const h = opts.h == null ? 3.2 : opts.h;
  const w = opts.w == null ? Math.round(h * (16 / 9) * 10) / 10 : opts.w;
  return ellipse(Object.assign({}, opts, { w, h }));
}
