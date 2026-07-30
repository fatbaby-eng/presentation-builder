/**
 * Slide motion — appear / attention / disappear presets.
 * Plain-language names; CSS animations for editor preview + offline export.
 */

export const APPEAR_PRESETS = [
  { id: "none", label: "Already there" },
  { id: "fade", label: "Fade in" },
  { id: "fly-up", label: "Fly up" },
  { id: "fly-down", label: "Fly down" },
  { id: "fly-left", label: "Fly from left" },
  { id: "fly-right", label: "Fly from right" },
  { id: "zoom", label: "Zoom in" },
  { id: "bounce", label: "Bounce in" },
  { id: "pop", label: "Pop" }
];

export const ATTENTION_PRESETS = [
  { id: "none", label: "None" },
  { id: "pulse", label: "Pulse" },
  { id: "shake", label: "Shake" },
  { id: "wiggle", label: "Wiggle" },
  { id: "glow", label: "Glow" },
  { id: "heartbeat", label: "Heartbeat" }
];

export const DISAPPEAR_PRESETS = [
  { id: "none", label: "Stay" },
  { id: "fade", label: "Fade out" },
  { id: "fly-up", label: "Fly up & out" },
  { id: "fly-down", label: "Fly down & out" },
  { id: "zoom", label: "Zoom out" }
];

export const EASINGS = [
  { id: "ease", label: "Smooth" },
  { id: "ease-in", label: "Slow start" },
  { id: "ease-out", label: "Slow end" },
  { id: "ease-in-out", label: "Slow both ends" },
  { id: "linear", label: "Steady" }
];

function clamp(n, lo, hi) {
  n = Number(n);
  if (!isFinite(n)) return lo;
  return Math.max(lo, Math.min(hi, n));
}

function hasId(list, id) {
  return list.some(p => p.id === id);
}

export function defaultMotion() {
  return {
    appear: "none",
    appearDelay: 0,
    appearDuration: 0.55,
    attention: "none",
    attentionDelay: 0.6,
    disappear: "none",
    disappearDelay: 2.5,
    disappearDuration: 0.45,
    easing: "ease-out"
  };
}

export function sanitizeMotion(raw) {
  const d = defaultMotion();
  raw = raw || {};
  return {
    appear: hasId(APPEAR_PRESETS, raw.appear) ? raw.appear : "none",
    appearDelay: clamp(raw.appearDelay == null ? d.appearDelay : raw.appearDelay, 0, 12),
    appearDuration: clamp(raw.appearDuration == null ? d.appearDuration : raw.appearDuration, 0.1, 5),
    attention: hasId(ATTENTION_PRESETS, raw.attention) ? raw.attention : "none",
    attentionDelay: clamp(raw.attentionDelay == null ? d.attentionDelay : raw.attentionDelay, 0, 12),
    disappear: hasId(DISAPPEAR_PRESETS, raw.disappear) ? raw.disappear : "none",
    disappearDelay: clamp(raw.disappearDelay == null ? d.disappearDelay : raw.disappearDelay, 0, 20),
    disappearDuration: clamp(raw.disappearDuration == null ? d.disappearDuration : raw.disappearDuration, 0.1, 5),
    easing: hasId(EASINGS, raw.easing) ? raw.easing : "ease-out"
  };
}

export function mergeMotionFields(target, src) {
  target.motion = sanitizeMotion(src && src.motion ? src.motion : src);
  return target;
}

export function readMotion(obj) {
  if (!obj) return defaultMotion();
  if (obj.motion) return sanitizeMotion(obj.motion);
  // Flat fields (after sanitize merge)
  return sanitizeMotion(obj);
}

/** Total time (s) needed to finish all motion on a list of objects. */
export function timelineDuration(items) {
  let max = 1.2;
  (items || []).forEach(it => {
    const m = readMotion(it.obj);
    if (m.appear !== "none") max = Math.max(max, m.appearDelay + m.appearDuration + 0.05);
    if (m.attention !== "none") max = Math.max(max, m.attentionDelay + 2.5);
    if (m.disappear !== "none") max = Math.max(max, m.disappearDelay + m.disappearDuration + 0.05);
  });
  return max;
}

/**
 * Build timeline rows for the current slide.
 * @returns {{ kind:string, index:number, id:string, label:string, obj:object }[]}
 */
export function buildMotionItems(step) {
  const rows = [];
  if (!step) return rows;
  (step.shapes || []).forEach((sh, i) => {
    if (sh.parentId) return; // children follow parent visually; animate the parent / top-level only
    const label = sh.type === "message" ? (sh.text || "Message").slice(0, 28)
      : sh.type === "symbol" ? "Saved piece"
      : (sh.type || "Shape");
    rows.push({ kind: "shape", index: i, id: sh.id, label: label.charAt(0).toUpperCase() + label.slice(1), obj: sh });
  });
  (step.overlays || []).forEach((o, i) => {
    rows.push({ kind: "overlay", index: i, id: o.id, label: "Image", obj: o });
  });
  return rows;
}

/** CSS @keyframes + utility classes for editor + export (inject once). */
export function motionStylesheet() {
  return `
.pb-mot { animation-fill-mode: both; }
@keyframes pbFadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes pbFadeOut { from { opacity: 1; } to { opacity: 0; } }
@keyframes pbFlyUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
@keyframes pbFlyDown { from { opacity: 0; transform: translateY(-28px); } to { opacity: 1; transform: none; } }
@keyframes pbFlyLeft { from { opacity: 0; transform: translateX(-36px); } to { opacity: 1; transform: none; } }
@keyframes pbFlyRight { from { opacity: 0; transform: translateX(36px); } to { opacity: 1; transform: none; } }
@keyframes pbZoomIn { from { opacity: 0; transform: scale(.72); } to { opacity: 1; transform: none; } }
@keyframes pbZoomOut { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(.72); } }
@keyframes pbBounceIn { 0% { opacity: 0; transform: scale(.5); } 60% { opacity: 1; transform: scale(1.08); } 100% { transform: none; } }
@keyframes pbPop { 0% { opacity: 0; transform: scale(.4); } 80% { transform: scale(1.06); } 100% { opacity: 1; transform: none; } }
@keyframes pbFlyOutUp { to { opacity: 0; transform: translateY(-28px); } }
@keyframes pbFlyOutDown { to { opacity: 0; transform: translateY(28px); } }
@keyframes pbPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.06); } }
@keyframes pbShake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
@keyframes pbWiggle { 0%,100% { transform: rotate(0); } 25% { transform: rotate(-3deg); } 75% { transform: rotate(3deg); } }
@keyframes pbGlow { 0%,100% { filter: drop-shadow(0 0 0 transparent); } 50% { filter: drop-shadow(0 0 10px rgba(255,220,80,.85)); } }
@keyframes pbHeart { 0%,100% { transform: scale(1); } 15% { transform: scale(1.12); } 30% { transform: scale(1); } 45% { transform: scale(1.1); } }
.pb-appear-fade { animation-name: pbFadeIn; }
.pb-appear-fly-up { animation-name: pbFlyUp; }
.pb-appear-fly-down { animation-name: pbFlyDown; }
.pb-appear-fly-left { animation-name: pbFlyLeft; }
.pb-appear-fly-right { animation-name: pbFlyRight; }
.pb-appear-zoom { animation-name: pbZoomIn; }
.pb-appear-bounce { animation-name: pbBounceIn; }
.pb-appear-pop { animation-name: pbPop; }
.pb-attn-pulse { animation-name: pbPulse; animation-iteration-count: 3; }
.pb-attn-shake { animation-name: pbShake; animation-iteration-count: 4; animation-duration: .35s !important; }
.pb-attn-wiggle { animation-name: pbWiggle; animation-iteration-count: 4; animation-duration: .4s !important; }
.pb-attn-glow { animation-name: pbGlow; animation-iteration-count: 3; }
.pb-attn-heartbeat { animation-name: pbHeart; animation-iteration-count: 3; animation-duration: .8s !important; }
.pb-disappear-fade { animation-name: pbFadeOut; }
.pb-disappear-fly-up { animation-name: pbFlyOutUp; }
.pb-disappear-fly-down { animation-name: pbFlyOutDown; }
.pb-disappear-zoom { animation-name: pbZoomOut; }
`.replace(/\n\s+/g, "\n").trim();
}

/**
 * Apply appear/attention/disappear as sequenced CSS animations on an element.
 * Uses Web Animations when available for cleaner sequencing; falls back to classes.
 */
export function playMotionOnElement(el, motion, opts) {
  const m = sanitizeMotion(motion);
  const preview = !!(opts && opts.preview);
  if (!el) return 0;
  clearMotionPlayback(el);

  if (m.appear !== "none") {
    el.style.opacity = "0";
  }

  const run = () => {
    const easing = m.easing || "ease-out";
    let chain = Promise.resolve();

    if (m.appear !== "none") {
      chain = chain.then(() => animateCss(el, "pb-appear-" + m.appear, m.appearDuration, m.appearDelay, easing, preview));
    }
    if (m.attention !== "none") {
      chain = chain.then(() => {
        const wait = Math.max(0, m.attentionDelay - (m.appear !== "none" ? m.appearDelay + m.appearDuration : 0));
        return delay(wait).then(() =>
          animateCss(el, "pb-attn-" + m.attention, 0.7, 0, "ease-in-out", preview)
        );
      });
    }
    if (m.disappear !== "none") {
      chain = chain.then(() => {
        const base = m.appear !== "none" ? m.appearDelay + m.appearDuration : 0;
        const wait = Math.max(0, m.disappearDelay - base);
        return delay(wait).then(() =>
          animateCss(el, "pb-disappear-" + m.disappear, m.disappearDuration, 0, easing, preview)
        );
      });
    }
    return chain;
  };

  // Start after a frame so opacity:0 is painted
  requestAnimationFrame(() => { run(); });
  return timelineDuration([{ obj: { motion: m } }]);
}

function delay(sec) {
  return new Promise(r => setTimeout(r, Math.max(0, sec) * 1000));
}

function animateCss(el, className, duration, delaySec, easing, preview) {
  return new Promise(resolve => {
    el.classList.add("pb-mot", className);
    el.style.animationDuration = duration + "s";
    el.style.animationDelay = delaySec + "s";
    el.style.animationTimingFunction = easing;
    el.style.opacity = "";
    const total = (duration + delaySec) * 1000 + 40;
    const t = setTimeout(() => {
      el.classList.remove(className);
      if (!preview || className.indexOf("disappear") < 0) {
        el.style.animationDuration = "";
        el.style.animationDelay = "";
        el.style.animationTimingFunction = "";
      }
      resolve();
    }, total);
    el._pbMotTimer = t;
  });
}

export function clearMotionPlayback(el) {
  if (!el) return;
  if (el._pbMotTimer) clearTimeout(el._pbMotTimer);
  const kill = [];
  el.classList.forEach(c => { if (c.indexOf("pb-") === 0) kill.push(c); });
  kill.forEach(c => el.classList.remove(c));
  el.style.animationDuration = "";
  el.style.animationDelay = "";
  el.style.animationTimingFunction = "";
  el.style.opacity = "";
}

/**
 * For export: set inline animation styles so objects play when the slide is shown.
 * Appear only (attention optional as infinite/3x); disappear skipped in auto-play export
 * unless delay is set — we still encode appear for demos.
 */
export function applyExportMotion(el, motion) {
  const m = sanitizeMotion(motion);
  if (m.appear === "none" && m.attention === "none") return;
  el.classList.add("pb-mot");
  if (m.appear !== "none") {
    el.classList.add("pb-appear-" + m.appear);
    el.style.animationDuration = m.appearDuration + "s";
    el.style.animationDelay = m.appearDelay + "s";
    el.style.animationTimingFunction = m.easing || "ease-out";
    el.style.opacity = "0"; // filled by animation
    // After appear, optionally chain attention via animationend — keep export simple:
    if (m.attention !== "none") {
      el.dataset.pbAttn = m.attention;
      el.dataset.pbAttnDelay = String(m.attentionDelay);
    }
  } else if (m.attention !== "none") {
    el.classList.add("pb-attn-" + m.attention);
    el.style.animationDuration = "0.7s";
    el.style.animationDelay = m.attentionDelay + "s";
  }
}
