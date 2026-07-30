/**
 * Slide transitions — how one slide becomes the next.
 * Plain-language labels; CSS for offline export.
 */

export const TRANSITION_PRESETS = [
  { id: "none", label: "Instant (no effect)" },
  { id: "fade", label: "Fade" },
  { id: "push-left", label: "Push left" },
  { id: "push-right", label: "Push right" },
  { id: "push-up", label: "Push up" },
  { id: "push-down", label: "Push down" },
  { id: "wipe-left", label: "Wipe left" },
  { id: "wipe-right", label: "Wipe right" },
  { id: "zoom", label: "Zoom in" },
  { id: "cover-left", label: "Cover from right" },
  { id: "uncover-left", label: "Uncover to left" }
];

function clamp(n, lo, hi) {
  n = Number(n);
  if (!isFinite(n)) return lo;
  return Math.max(lo, Math.min(hi, n));
}

export function defaultTransition() {
  return { type: "fade", duration: 0.45 };
}

export function sanitizeTransition(raw) {
  const d = defaultTransition();
  raw = raw || {};
  const type = TRANSITION_PRESETS.some(p => p.id === raw.type) ? raw.type : d.type;
  return {
    type,
    duration: clamp(raw.duration == null ? d.duration : raw.duration, 0.1, 2.5)
  };
}

/** Hotspot click behaviour. */
export const HOTSPOT_ACTIONS = [
  { id: "tip", label: "Show tip, then continue" },
  { id: "next", label: "Go to next slide" },
  { id: "goto", label: "Jump to a slide…" }
];

export function sanitizeHotspotAction(h) {
  h = h || {};
  let action = HOTSPOT_ACTIONS.some(a => a.id === h.action) ? h.action : null;
  // Back-compat: no action field → tip if text, else next
  if (!action) action = (h.text && String(h.text).trim()) ? "tip" : "next";
  return {
    action,
    goto: clamp(h.goto == null ? 0 : h.goto, 0, 500)
  };
}

/** CSS for stage panes + transitions (editor preview optional + export). */
export function transitionStylesheet() {
  return `
.stage { position: relative; overflow: hidden; }
.stage-pane { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; }
.stage-pane > .frame, .stage-pane > .content-slide, .stage-pane > .text-slide, .stage-pane > .end {
  max-height: 100%;
}
.tx-fade-out { animation: txFadeOut var(--tx-dur, .45s) ease both; }
.tx-fade-in { animation: txFadeIn var(--tx-dur, .45s) ease both; }
.tx-push-left-out { animation: txPushLOut var(--tx-dur, .45s) ease both; }
.tx-push-left-in { animation: txPushLIn var(--tx-dur, .45s) ease both; }
.tx-push-right-out { animation: txPushROut var(--tx-dur, .45s) ease both; }
.tx-push-right-in { animation: txPushRIn var(--tx-dur, .45s) ease both; }
.tx-push-up-out { animation: txPushUOut var(--tx-dur, .45s) ease both; }
.tx-push-up-in { animation: txPushUIn var(--tx-dur, .45s) ease both; }
.tx-push-down-out { animation: txPushDOut var(--tx-dur, .45s) ease both; }
.tx-push-down-in { animation: txPushDIn var(--tx-dur, .45s) ease both; }
.tx-wipe-left-in { animation: txWipeLIn var(--tx-dur, .45s) ease both; }
.tx-wipe-right-in { animation: txWipeRIn var(--tx-dur, .45s) ease both; }
.tx-zoom-in { animation: txZoomIn var(--tx-dur, .45s) ease both; }
.tx-cover-left-in { animation: txCoverLIn var(--tx-dur, .45s) ease both; z-index: 2; }
.tx-uncover-left-out { animation: txUncoverLOut var(--tx-dur, .45s) ease both; z-index: 2; }
@keyframes txFadeOut { to { opacity: 0; } }
@keyframes txFadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes txPushLOut { to { transform: translateX(-100%); } }
@keyframes txPushLIn { from { transform: translateX(100%); } to { transform: none; } }
@keyframes txPushROut { to { transform: translateX(100%); } }
@keyframes txPushRIn { from { transform: translateX(-100%); } to { transform: none; } }
@keyframes txPushUOut { to { transform: translateY(-100%); } }
@keyframes txPushUIn { from { transform: translateY(100%); } to { transform: none; } }
@keyframes txPushDOut { to { transform: translateY(100%); } }
@keyframes txPushDIn { from { transform: translateY(-100%); } to { transform: none; } }
@keyframes txWipeLIn { from { clip-path: inset(0 0 0 100%); } to { clip-path: inset(0); } }
@keyframes txWipeRIn { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0); } }
@keyframes txZoomIn { from { opacity: 0; transform: scale(.88); } to { opacity: 1; transform: none; } }
@keyframes txCoverLIn { from { transform: translateX(100%); } to { transform: none; } }
@keyframes txUncoverLOut { to { transform: translateX(-100%); } }
`.replace(/\n\s+/g, "\n").trim();
}

/**
 * Map transition type → { outClass, inClass }.
 */
export function transitionClasses(type) {
  switch (type) {
    case "none": return { out: "", in: "" };
    case "push-left": return { out: "tx-push-left-out", in: "tx-push-left-in" };
    case "push-right": return { out: "tx-push-right-out", in: "tx-push-right-in" };
    case "push-up": return { out: "tx-push-up-out", in: "tx-push-up-in" };
    case "push-down": return { out: "tx-push-down-out", in: "tx-push-down-in" };
    case "wipe-left": return { out: "tx-fade-out", in: "tx-wipe-left-in" };
    case "wipe-right": return { out: "tx-fade-out", in: "tx-wipe-right-in" };
    case "zoom": return { out: "tx-fade-out", in: "tx-zoom-in" };
    case "cover-left": return { out: "", in: "tx-cover-left-in" };
    case "uncover-left": return { out: "tx-uncover-left-out", in: "tx-fade-in" };
    case "fade":
    default: return { out: "tx-fade-out", in: "tx-fade-in" };
  }
}
