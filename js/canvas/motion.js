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
  if (el._pbMotTimer) { clearTimeout(el._pbMotTimer); el._pbMotTimer = null; }
  const kill = [];
  el.classList.forEach(c => { if (c.indexOf("pb-") === 0) kill.push(c); });
  kill.forEach(c => el.classList.remove(c));
  el.style.animationDuration = "";
  el.style.animationDelay = "";
  el.style.animationTimingFunction = "";
  el.style.animationName = "";
  if (el._pbMotScrubbing) {
    if (el._pbMotBaseFilter != null) el.style.filter = el._pbMotBaseFilter;
    if (el._pbMotBaseTransform != null) el.style.transform = el._pbMotBaseTransform;
    if (el._pbMotBaseOpacity != null) el.style.opacity = el._pbMotBaseOpacity;
    else el.style.opacity = "";
  } else {
    el.style.opacity = "";
  }
  el._pbMotBaseFilter = null;
  el._pbMotBaseTransform = null;
  el._pbMotBaseOpacity = null;
  el._pbMotScrubbing = false;
}

/** Frames-per-second used for the scrubber frame readout. */
export const MOTION_FPS = 30;

/** Attention loop length (seconds) — matches CSS preset durations × iterations. */
const ATTN_CYCLE = {
  pulse: 0.7,
  shake: 0.35,
  wiggle: 0.4,
  glow: 0.7,
  heartbeat: 0.8
};
const ATTN_ITERS = {
  pulse: 3,
  shake: 4,
  wiggle: 4,
  glow: 3,
  heartbeat: 3
};

export function formatMotionTime(sec) {
  const t = Math.max(0, Number(sec) || 0);
  const whole = Math.floor(t);
  const tenths = Math.round((t - whole) * 10) % 10;
  return whole + "." + tenths + "s";
}

export function formatMotionFrame(sec, fps) {
  const f = Math.max(1, fps || MOTION_FPS);
  return Math.round(Math.max(0, Number(sec) || 0) * f) + "f";
}

function easeProgress(p, easing) {
  p = clamp(p, 0, 1);
  switch (easing) {
    case "linear": return p;
    case "ease-in": return p * p;
    case "ease-out": return 1 - (1 - p) * (1 - p);
    case "ease-in-out": return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    case "ease":
    default: {
      // Approximate CSS `ease` (cubic-bezier .25,.1,.25,1)
      const t = p;
      return t * t * (3 - 2 * t);
    }
  }
}

function lerp(a, b, t) { return a + (b - a) * t; }

/** Sample a multi-stop keyframe list at local progress 0–1 (pre-eased). */
function sampleStops(stops, p) {
  if (!stops.length) return {};
  if (p <= stops[0].t) return Object.assign({}, stops[0]);
  if (p >= stops[stops.length - 1].t) return Object.assign({}, stops[stops.length - 1]);
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i], b = stops[i + 1];
    if (p >= a.t && p <= b.t) {
      const u = (p - a.t) / (b.t - a.t || 1);
      const out = { t: p };
      const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
      keys.forEach(k => {
        if (k === "t") return;
        if (typeof a[k] === "number" && typeof b[k] === "number") out[k] = lerp(a[k], b[k], u);
        else out[k] = u < 1 ? (a[k] != null ? a[k] : b[k]) : b[k];
      });
      return out;
    }
  }
  return Object.assign({}, stops[stops.length - 1]);
}

function appearStops(id) {
  switch (id) {
    case "fade":
      return [{ t: 0, opacity: 0, tx: 0, ty: 0, scale: 1, rot: 0 }, { t: 1, opacity: 1, tx: 0, ty: 0, scale: 1, rot: 0 }];
    case "fly-up":
      return [{ t: 0, opacity: 0, tx: 0, ty: 28, scale: 1, rot: 0 }, { t: 1, opacity: 1, tx: 0, ty: 0, scale: 1, rot: 0 }];
    case "fly-down":
      return [{ t: 0, opacity: 0, tx: 0, ty: -28, scale: 1, rot: 0 }, { t: 1, opacity: 1, tx: 0, ty: 0, scale: 1, rot: 0 }];
    case "fly-left":
      return [{ t: 0, opacity: 0, tx: -36, ty: 0, scale: 1, rot: 0 }, { t: 1, opacity: 1, tx: 0, ty: 0, scale: 1, rot: 0 }];
    case "fly-right":
      return [{ t: 0, opacity: 0, tx: 36, ty: 0, scale: 1, rot: 0 }, { t: 1, opacity: 1, tx: 0, ty: 0, scale: 1, rot: 0 }];
    case "zoom":
      return [{ t: 0, opacity: 0, tx: 0, ty: 0, scale: 0.72, rot: 0 }, { t: 1, opacity: 1, tx: 0, ty: 0, scale: 1, rot: 0 }];
    case "bounce":
      return [
        { t: 0, opacity: 0, tx: 0, ty: 0, scale: 0.5, rot: 0 },
        { t: 0.6, opacity: 1, tx: 0, ty: 0, scale: 1.08, rot: 0 },
        { t: 1, opacity: 1, tx: 0, ty: 0, scale: 1, rot: 0 }
      ];
    case "pop":
      return [
        { t: 0, opacity: 0, tx: 0, ty: 0, scale: 0.4, rot: 0 },
        { t: 0.8, opacity: 1, tx: 0, ty: 0, scale: 1.06, rot: 0 },
        { t: 1, opacity: 1, tx: 0, ty: 0, scale: 1, rot: 0 }
      ];
    default:
      return [{ t: 0, opacity: 1, tx: 0, ty: 0, scale: 1, rot: 0 }, { t: 1, opacity: 1, tx: 0, ty: 0, scale: 1, rot: 0 }];
  }
}

function disappearStops(id) {
  switch (id) {
    case "fade":
      return [{ t: 0, opacity: 1, tx: 0, ty: 0, scale: 1, rot: 0 }, { t: 1, opacity: 0, tx: 0, ty: 0, scale: 1, rot: 0 }];
    case "fly-up":
      return [{ t: 0, opacity: 1, tx: 0, ty: 0, scale: 1, rot: 0 }, { t: 1, opacity: 0, tx: 0, ty: -28, scale: 1, rot: 0 }];
    case "fly-down":
      return [{ t: 0, opacity: 1, tx: 0, ty: 0, scale: 1, rot: 0 }, { t: 1, opacity: 0, tx: 0, ty: 28, scale: 1, rot: 0 }];
    case "zoom":
      return [{ t: 0, opacity: 1, tx: 0, ty: 0, scale: 1, rot: 0 }, { t: 1, opacity: 0, tx: 0, ty: 0, scale: 0.72, rot: 0 }];
    default:
      return [{ t: 0, opacity: 1, tx: 0, ty: 0, scale: 1, rot: 0 }, { t: 1, opacity: 1, tx: 0, ty: 0, scale: 1, rot: 0 }];
  }
}

function attentionSample(id, localT) {
  // localT in [0,1] within one cycle
  const p = clamp(localT, 0, 1);
  switch (id) {
    case "pulse": {
      const s = p < 0.5 ? lerp(1, 1.06, p * 2) : lerp(1.06, 1, (p - 0.5) * 2);
      return { opacity: 1, tx: 0, ty: 0, scale: s, rot: 0, glow: 0 };
    }
    case "shake": {
      let x = 0;
      if (p < 0.25) x = lerp(0, -5, p / 0.25);
      else if (p < 0.75) x = lerp(-5, 5, (p - 0.25) / 0.5);
      else x = lerp(5, 0, (p - 0.75) / 0.25);
      return { opacity: 1, tx: x, ty: 0, scale: 1, rot: 0, glow: 0 };
    }
    case "wiggle": {
      let r = 0;
      if (p < 0.25) r = lerp(0, -3, p / 0.25);
      else if (p < 0.75) r = lerp(-3, 3, (p - 0.25) / 0.5);
      else r = lerp(3, 0, (p - 0.75) / 0.25);
      return { opacity: 1, tx: 0, ty: 0, scale: 1, rot: r, glow: 0 };
    }
    case "glow": {
      const g = p < 0.5 ? lerp(0, 1, p * 2) : lerp(1, 0, (p - 0.5) * 2);
      return { opacity: 1, tx: 0, ty: 0, scale: 1, rot: 0, glow: g };
    }
    case "heartbeat": {
      let s = 1;
      if (p < 0.15) s = lerp(1, 1.12, p / 0.15);
      else if (p < 0.3) s = lerp(1.12, 1, (p - 0.15) / 0.15);
      else if (p < 0.45) s = lerp(1, 1.1, (p - 0.3) / 0.15);
      else if (p < 0.6) s = lerp(1.1, 1, (p - 0.45) / 0.15);
      return { opacity: 1, tx: 0, ty: 0, scale: s, rot: 0, glow: 0 };
    }
    default:
      return { opacity: 1, tx: 0, ty: 0, scale: 1, rot: 0, glow: 0 };
  }
}

function poseToCss(pose, baseTransform) {
  const parts = [];
  if (pose.tx) parts.push("translateX(" + pose.tx + "px)");
  if (pose.ty) parts.push("translateY(" + pose.ty + "px)");
  if (pose.scale != null && Math.abs(pose.scale - 1) > 0.001) parts.push("scale(" + pose.scale + ")");
  if (pose.rot) parts.push("rotate(" + pose.rot + "deg)");
  const motionTx = parts.length ? parts.join(" ") : "";
  const base = baseTransform || "";
  let transform = "";
  if (motionTx && base) transform = motionTx + " " + base;
  else transform = motionTx || base || "";
  const filter = pose.glow
    ? "drop-shadow(0 0 " + (pose.glow * 10).toFixed(1) + "px rgba(255,220,80," + (0.85 * pose.glow).toFixed(2) + "))"
    : "";
  return {
    opacity: pose.opacity == null ? "" : String(pose.opacity),
    transform,
    filter
  };
}

/**
 * Compute visual pose for one object's motion at absolute timeline time `timeSec`.
 * Uses the same delay/duration fields as the timeline bars.
 */
export function sampleMotionAtTime(motion, timeSec) {
  const m = sanitizeMotion(motion);
  const t = Math.max(0, Number(timeSec) || 0);
  let pose = { opacity: 1, tx: 0, ty: 0, scale: 1, rot: 0, glow: 0 };

  if (m.appear !== "none") {
    const a0 = m.appearDelay;
    const a1 = m.appearDelay + m.appearDuration;
    if (t < a0) {
      pose = sampleStops(appearStops(m.appear), 0);
    } else if (t < a1) {
      const raw = (t - a0) / (m.appearDuration || 0.001);
      // Multi-stop bounce/pop already encode easing; apply CSS easing for simple 2-stop presets
      const stops = appearStops(m.appear);
      const p = stops.length > 2 ? clamp(raw, 0, 1) : easeProgress(raw, m.easing);
      pose = sampleStops(stops, p);
    } else {
      pose = sampleStops(appearStops(m.appear), 1);
    }
  }

  if (m.attention !== "none") {
    const cycle = ATTN_CYCLE[m.attention] || 0.7;
    const iters = ATTN_ITERS[m.attention] || 3;
    const attnStart = m.attentionDelay;
    const attnEnd = attnStart + cycle * iters;
    if (t >= attnStart && t < attnEnd) {
      const local = ((t - attnStart) % cycle) / cycle;
      const attn = attentionSample(m.attention, local);
      // Attention overlays transform; keep appear opacity
      pose = {
        opacity: pose.opacity,
        tx: (pose.tx || 0) + (attn.tx || 0),
        ty: (pose.ty || 0) + (attn.ty || 0),
        scale: (pose.scale == null ? 1 : pose.scale) * (attn.scale == null ? 1 : attn.scale),
        rot: (pose.rot || 0) + (attn.rot || 0),
        glow: attn.glow || 0
      };
    }
  }

  if (m.disappear !== "none") {
    const d0 = m.disappearDelay;
    const d1 = m.disappearDelay + m.disappearDuration;
    if (t >= d0) {
      const raw = t >= d1 ? 1 : (t - d0) / (m.disappearDuration || 0.001);
      const p = easeProgress(raw, m.easing);
      pose = sampleStops(disappearStops(m.disappear), p);
    }
  }

  return pose;
}

function rememberBaseStyles(el) {
  if (!el || el._pbMotScrubbing) return;
  el._pbMotBaseTransform = el.style.transform || "";
  el._pbMotBaseOpacity = el.style.opacity || "";
  el._pbMotBaseFilter = el.style.filter || "";
  el._pbMotScrubbing = true;
}

function stripMotionAnimation(el) {
  if (!el) return;
  if (el._pbMotTimer) { clearTimeout(el._pbMotTimer); el._pbMotTimer = null; }
  const kill = [];
  el.classList.forEach(c => { if (c.indexOf("pb-") === 0) kill.push(c); });
  kill.forEach(c => el.classList.remove(c));
  el.style.animationDuration = "";
  el.style.animationDelay = "";
  el.style.animationTimingFunction = "";
  el.style.animationName = "";
}

/**
 * Freeze an element at motion time `timeSec` (seconds) for realtime scrubbing.
 * Clears any running CSS playback first.
 */
export function scrubMotionOnElement(el, motion, timeSec) {
  if (!el) return;
  stripMotionAnimation(el);
  rememberBaseStyles(el);
  const pose = sampleMotionAtTime(motion, timeSec);
  const css = poseToCss(pose, el._pbMotBaseTransform || "");
  el.style.opacity = css.opacity;
  el.style.transform = css.transform;
  if (css.filter) el.style.filter = css.filter;
  else el.style.filter = el._pbMotBaseFilter || "";
}

/**
 * Scrub every motion item on a stage to the same absolute time.
 * @param {Element} stage
 * @param {{ id:string, obj:object }[]} items from buildMotionItems
 * @param {number} timeSec
 */
export function scrubSlideAtTime(stage, items, timeSec) {
  if (!stage) return;
  (items || []).forEach(it => {
    const m = readMotion(it.obj);
    if (m.appear === "none" && m.attention === "none" && m.disappear === "none") return;
    const el = stage.querySelector('[data-pb-mot="' + it.id + '"]');
    if (!el) return;
    scrubMotionOnElement(el, m, timeSec);
  });
}

/** Restore edit pose for all motion nodes on a stage. */
export function clearSlideMotion(stage, items) {
  if (!stage) return;
  (items || []).forEach(it => {
    const el = stage.querySelector('[data-pb-mot="' + it.id + '"]');
    if (el) clearMotionPlayback(el);
  });
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
