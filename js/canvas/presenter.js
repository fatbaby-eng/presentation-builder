/**
 * Presenter helpers — speaker notes, timings, and viewer chrome for Present mode.
 * Plain language in the UI: "Notes for you", "Present", "Print / PDF".
 */

export function sanitizeNotes(raw) {
  return String(raw == null ? "" : raw).slice(0, 4000);
}

export function sanitizeTimingMs(raw) {
  const n = Number(raw);
  if (!isFinite(n) || n <= 0) return 0;
  return Math.min(Math.round(n), 30 * 60 * 1000);
}

/** Plain-text dump of speaker notes for download. */
export function notesTextFile(project) {
  const title = (project && project.title) || "Presentation";
  const steps = (project && project.steps) || [];
  const lines = [title, "=".repeat(Math.min(60, title.length)), ""];
  steps.forEach((s, i) => {
    const name = (s && s.name) || ("Slide " + (i + 1));
    lines.push((i + 1) + ". " + name);
    lines.push("-".repeat(40));
    const notes = sanitizeNotes(s && s.notes).trim();
    lines.push(notes || "(No notes)");
    lines.push("");
  });
  return lines.join("\n");
}

/** CSS for Present mode (side panel + annotation overlay). */
export function presenterStylesheet() {
  return `
.pv-shell { flex: 1; display: flex; min-height: 0; width: 100%; }
.pv-main { flex: 1; display: flex; flex-direction: column; min-width: 0; min-height: 0; position: relative; }
.pv-main .stage { flex: 1; }
body.pv-mode { flex-direction: row; }
body.pv-mode .bar, body.pv-mode .progress, body.pv-mode .nav { display: none !important; }
body.pv-mode .pv-shell { flex: 1; display: flex; min-height: 0; width: 100%; }
body.pv-mode .pv-main { flex: 1; display: flex; flex-direction: column; min-width: 0; position: relative; }
body.pv-mode .stage { flex: 1; padding: 1rem; }
.pv-side { width: min(340px, 34vw); background: #12151e; border-left: 1px solid rgba(255,255,255,.08);
  display: flex; flex-direction: column; gap: .75rem; padding: .85rem; overflow: auto; flex: none; }
.pv-side .pv-label { font-size: .68rem; text-transform: uppercase; letter-spacing: .06em; color: #8b92a3; font-weight: 700; }
.pv-clock { font-size: 1.6rem; font-weight: 700; font-variant-numeric: tabular-nums; }
.pv-clock small { display: block; font-size: .72rem; font-weight: 600; color: #8b92a3; margin-top: .15rem; }
.pv-next { font-size: .85rem; line-height: 1.4; color: #c8cdd8; min-height: 2.4em; }
.pv-notes { flex: 1; background: #1a1e2a; border-radius: 10px; padding: .75rem; font-size: .92rem;
  line-height: 1.55; white-space: pre-wrap; color: #e8eaef; overflow: auto; min-height: 120px; }
.pv-notes.empty { color: #6b7280; font-style: italic; }
.pv-thumbs { display: flex; flex-wrap: wrap; gap: .35rem; }
.pv-thumbs button { border: 1px solid rgba(255,255,255,.14); background: rgba(255,255,255,.06); color: #fff;
  border-radius: 6px; padding: .3rem .45rem; font-size: .68rem; cursor: pointer; font-family: inherit; }
.pv-thumbs button.on { border-color: var(--accent); background: rgba(108,92,231,.35); }
.pv-help { font-size: .68rem; color: #6b7280; line-height: 1.45; }
.pv-tools { display: flex; flex-wrap: wrap; gap: .35rem; }
.pv-tools button { border: 1px solid rgba(255,255,255,.14); background: rgba(255,255,255,.08); color: #fff;
  border-radius: 7px; padding: .35rem .55rem; font-size: .72rem; cursor: pointer; font-family: inherit; font-weight: 600; }
.pv-tools button.on { border-color: var(--accent); background: rgba(108,92,231,.4); }
.pv-annot { position: absolute; inset: 0; pointer-events: none; z-index: 20; }
.pv-annot.active { pointer-events: auto; cursor: crosshair; }
.pv-blank { position: absolute; inset: 0; z-index: 30; display: none; }
.pv-blank.on { display: block; }
.pv-blank.black { background: #000; }
.pv-blank.white { background: #fff; }
.notes-panel { display: none; position: fixed; right: 1rem; bottom: 4.5rem; width: min(320px, 90vw);
  max-height: 40vh; overflow: auto; background: rgba(20,22,30,.94); color: #e8eaef; border-radius: 12px;
  padding: .85rem 1rem; box-shadow: 0 12px 40px rgba(0,0,0,.45); z-index: 40; font-size: .88rem; line-height: 1.5;
  white-space: pre-wrap; border: 1px solid rgba(255,255,255,.1); }
.notes-panel.open { display: block; }
.notes-panel .cap { font-size: .68rem; text-transform: uppercase; letter-spacing: .05em; color: #8b92a3;
  font-weight: 700; margin-bottom: .4rem; }
body.print-mode { background: #fff; color: #111; display: block; height: auto; }
body.print-mode .bar, body.print-mode .progress, body.print-mode .nav, body.print-mode .notes-panel { display: none !important; }
body.print-mode .stage { display: block; padding: 0; overflow: visible; position: static; height: auto; }
body.print-mode .stage-pane { position: relative; inset: auto; width: 100%; height: auto; min-height: 70vh; }
body.print-mode .print-page { page-break-after: always; break-after: page; min-height: 100vh; display: flex;
  flex-direction: column; align-items: center; justify-content: center; padding: 1.5rem; position: relative; }
body.print-mode .print-page:last-child { page-break-after: auto; }
body.print-mode .print-notes { position: absolute; left: 1.5rem; right: 1.5rem; bottom: 1rem; font-size: .8rem;
  color: #444; border-top: 1px solid #ddd; padding-top: .5rem; white-space: pre-wrap; }
@media print {
  body.print-mode .print-page { min-height: 0; height: 100vh; }
}
`.replace(/\n\s+/g, "\n").trim();
}

export function formatClock(ms) {
  ms = Math.max(0, Math.round(ms / 1000));
  const m = Math.floor(ms / 60);
  const s = ms % 60;
  return m + ":" + String(s).padStart(2, "0");
}
